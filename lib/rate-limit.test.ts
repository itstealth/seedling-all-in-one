import { afterEach, describe, expect, it, vi } from "vitest";
import { clientKey, rateLimit, resetRateLimits } from "./rate-limit";

afterEach(() => {
  resetRateLimits();
  vi.useRealTimers();
});

describe("rateLimit", () => {
  it("allows up to the limit then refuses", () => {
    for (let i = 0; i < 3; i++) {
      expect(rateLimit("a", 3, 60_000).allowed).toBe(true);
    }
    expect(rateLimit("a", 3, 60_000).allowed).toBe(false);
  });

  it("keeps separate counts per key", () => {
    rateLimit("a", 1, 60_000);
    expect(rateLimit("a", 1, 60_000).allowed).toBe(false);
    expect(rateLimit("b", 1, 60_000).allowed).toBe(true);
  });

  it("reports how long to wait", () => {
    rateLimit("a", 1, 60_000);
    const blocked = rateLimit("a", 1, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(blocked.retryAfter).toBeLessThanOrEqual(60);
  });

  it("lets requests through again once the window passes", () => {
    vi.useFakeTimers();
    rateLimit("a", 1, 1_000);
    expect(rateLimit("a", 1, 1_000).allowed).toBe(false);
    vi.advanceTimersByTime(1_100);
    expect(rateLimit("a", 1, 1_000).allowed).toBe(true);
  });
});

describe("clientKey", () => {
  const req = (headers: Record<string, string>) =>
    new Request("https://example.com", { headers });

  it("uses the first hop of x-forwarded-for", () => {
    expect(clientKey(req({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }))).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    expect(clientKey(req({ "x-real-ip": "5.6.7.8" }))).toBe("5.6.7.8");
  });

  it("returns a stable placeholder when neither header is present", () => {
    expect(clientKey(req({}))).toBe("unknown");
  });
});
