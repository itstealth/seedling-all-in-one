import "server-only";

/**
 * Small fixed-window rate limiter, in process memory.
 *
 * Scoped to what it's for: slowing brute-force against the receipt lookup,
 * which is guessable in principle (application numbers are sequential, so an
 * attacker only has to guess the mobile). It is deliberately not a distributed
 * limiter — there is a single Node process behind IIS here, so a shared store
 * would add a dependency for no benefit.
 *
 * Entries are swept lazily on write so the map cannot grow without bound.
 */

interface Window {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Window>();
let lastSweep = 0;

function sweep(now: number) {
  // At most once a minute, drop everything already expired.
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, window] of buckets) {
    if (window.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets, for a Retry-After header. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfter: 0 };
}

/**
 * Best-effort client address.
 *
 * The app sits behind IIS ARR, which forwards the original address in
 * `X-Forwarded-For`. Only the first hop is used, and it is treated purely as a
 * rate-limit bucket key — never as an identity or an authorisation input, since
 * the header is client-settable.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

/** Test seam — clears all windows. */
export function resetRateLimits() {
  buckets.clear();
  lastSweep = 0;
}
