import "server-only";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin session handling for the admissions dashboard.
 *
 * The school sites use a cookie whose value is the fixed string
 * "authenticated" — anyone who reads that source can forge a session by
 * setting the cookie by hand. This view exposes applicants' Aadhaar numbers,
 * addresses and parents' details, so it uses a signed token instead: the
 * cookie carries an expiry and an HMAC over it, and is rejected unless the
 * signature verifies against a server-side secret.
 */

const COOKIE = "seedling_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // a working day

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (need 32+ chars)"
    );
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** `<expiry-epoch-seconds>.<hmac>` */
function mintToken(): string {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx <= 0) return false;

  const payload = token.slice(0, idx);
  const provided = token.slice(idx + 1);

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  if (provided.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(provided))) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires)) return false;
  return expires > Math.floor(Date.now() / 1000);
}

/** Constant-time password check, so a wrong guess leaks no timing signal. */
export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("[admin-auth] ADMIN_PASSWORD is not configured");
    return false;
  }
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  // Compare hashes so differing lengths don't short-circuit the comparison.
  const ha = createHmac("sha256", "cmp").update(a).digest();
  const hb = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, mintToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Guard for API routes. Returns a 401 Response when not signed in. */
export async function requireAdmin(): Promise<Response | null> {
  if (await isAdmin()) return null;
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

/** Convenience for generating a secret when provisioning. */
export function suggestSecret(): string {
  return randomBytes(32).toString("hex");
}

export const __test = { mintToken, verifyToken, sign };
