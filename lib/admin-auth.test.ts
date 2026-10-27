import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { __test, passwordMatches } from "./admin-auth";

const SECRET = "x".repeat(48);

beforeEach(() => {
  process.env.ADMIN_SESSION_SECRET = SECRET;
  process.env.ADMIN_PASSWORD = "correct-horse-battery";
});
afterEach(() => {
  delete process.env.ADMIN_SESSION_SECRET;
  delete process.env.ADMIN_PASSWORD;
});

describe("session tokens", () => {
  it("accepts a token it just minted", () => {
    expect(__test.verifyToken(__test.mintToken())).toBe(true);
  });

  it("rejects the static value the school sites use", () => {
    // Their cookie is literally "authenticated", so anyone can forge it.
    expect(__test.verifyToken("authenticated")).toBe(false);
  });

  it("rejects a token with a tampered expiry", () => {
    const token = __test.mintToken();
    const [, sig] = token.split(".");
    const far = String(Math.floor(Date.now() / 1000) + 999999);
    expect(__test.verifyToken(`${far}.${sig}`)).toBe(false);
  });

  it("rejects a signature made with a different secret", () => {
    const payload = String(Math.floor(Date.now() / 1000) + 600);
    const good = __test.sign(payload);
    process.env.ADMIN_SESSION_SECRET = "y".repeat(48);
    expect(__test.verifyToken(`${payload}.${good}`)).toBe(false);
  });

  it("rejects an expired token even when correctly signed", () => {
    const past = String(Math.floor(Date.now() / 1000) - 10);
    expect(__test.verifyToken(`${past}.${__test.sign(past)}`)).toBe(false);
  });

  it("rejects malformed and empty tokens without throwing", () => {
    for (const t of ["", "abc", ".", "a.b.c", undefined]) {
      expect(__test.verifyToken(t as string | undefined)).toBe(false);
    }
  });

  it("refuses to mint when the secret is too weak", () => {
    process.env.ADMIN_SESSION_SECRET = "short";
    expect(() => __test.mintToken()).toThrow(/32\+/);
  });
});

describe("passwordMatches", () => {
  it("accepts the configured password", () => {
    expect(passwordMatches("correct-horse-battery")).toBe(true);
  });

  it("rejects a wrong password, including prefixes", () => {
    expect(passwordMatches("wrong")).toBe(false);
    expect(passwordMatches("correct-horse")).toBe(false);
    expect(passwordMatches("")).toBe(false);
  });

  it("fails closed when no password is configured", () => {
    delete process.env.ADMIN_PASSWORD;
    expect(passwordMatches("anything")).toBe(false);
    expect(passwordMatches("")).toBe(false);
  });
});
