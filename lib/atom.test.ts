import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  buildRedirectUrl,
  isSuccess,
  requestSignature,
  verifyResponse,
  type AtomRequest,
  type AtomResponse,
} from "./atom";

const req: AtomRequest = {
  login: "533755",
  password: "secret-pass",
  requestHashKey: "req-key",
  productId: "SCHOOL",
  amount: "1050",
  transactionId: "SDL42ABCDEF0123",
  clientCode: "105957",
  returnUrl: "https://seedlingschools.com/api/payment/callback/jawahar",
  customerName: "Test Student",
  customerEmail: "parent@example.com",
  customerMobile: "9876543210",
  customerAddress: "12 Jawahar Nagar, Jaipur",
  customerAccount: "123456789",
};

describe("requestSignature", () => {
  it("hashes the exact positional payload the legacy PHP used", () => {
    // login + password + "NBFundTransfer" + prodid + txnid + amount + "INR"
    const expected = createHmac("sha512", "req-key")
      .update("533755secret-passNBFundTransferSCHOOLSDL42ABCDEF01231050INR")
      .digest("hex");
    expect(requestSignature(req)).toBe(expected);
  });

  it("changes when the amount changes", () => {
    const tampered = requestSignature({ ...req, amount: "1" });
    expect(tampered).not.toBe(requestSignature(req));
  });
});

describe("buildRedirectUrl", () => {
  it("defaults to the UAT endpoint so an unset mode cannot move real money", () => {
    expect(buildRedirectUrl(req, "test")).toContain("paynetzuat.atomtech.in");
  });

  it("uses the live endpoint only when explicitly asked", () => {
    expect(buildRedirectUrl(req, "live")).toContain(
      "payment.atomtech.in/paynetz/epi/fts"
    );
  });

  it("carries the server-resolved amount, not anything client-supplied", () => {
    const url = buildRedirectUrl(req, "test");
    expect(url).toContain("amt=1050");
    expect(url).toContain("txnscamt=1050");
  });

  it("base64s the client code the way the gateway expects", () => {
    const url = buildRedirectUrl(req, "test");
    expect(url).toContain(`clientcode=${encodeURIComponent(btoa("105957"))}`);
  });

  it("includes a signature", () => {
    expect(buildRedirectUrl(req, "test")).toContain(
      `signature=${requestSignature(req)}`
    );
  });
});

describe("verifyResponse", () => {
  const key = "res-key";

  function signed(overrides: Partial<AtomResponse> = {}): AtomResponse {
    const base: AtomResponse = {
      mmp_txn: "MMP1",
      mer_txn: "SDL42ABCDEF0123",
      f_code: "Ok",
      prod: "SCHOOL",
      discriminator: "D",
      amt: "1050",
      bank_txn: "BANK1",
      ...overrides,
    };
    const payload =
      (base.mmp_txn ?? "") +
      (base.mer_txn ?? "") +
      (base.f_code ?? "") +
      (base.prod ?? "") +
      (base.discriminator ?? "") +
      (base.amt ?? "") +
      (base.bank_txn ?? "");
    base.signature = createHmac("sha512", key).update(payload).digest("hex");
    return base;
  }

  it("accepts a correctly signed response", () => {
    expect(verifyResponse(signed(), key)).toBe(true);
  });

  it("rejects a response signed with the wrong key", () => {
    expect(verifyResponse(signed(), "other-key")).toBe(false);
  });

  it("rejects a tampered amount", () => {
    const res = signed();
    res.amt = "1";
    expect(verifyResponse(res, key)).toBe(false);
  });

  it("rejects a forged success code", () => {
    const res = signed({ f_code: "F" });
    res.f_code = "Ok";
    expect(verifyResponse(res, key)).toBe(false);
  });

  it("rejects a missing signature", () => {
    const res = signed();
    delete res.signature;
    expect(verifyResponse(res, key)).toBe(false);
  });

  it("rejects a truncated signature without throwing", () => {
    const res = signed();
    res.signature = "abc";
    expect(verifyResponse(res, key)).toBe(false);
  });
});

describe("isSuccess", () => {
  it("only treats f_code Ok as success", () => {
    expect(isSuccess({ f_code: "Ok" })).toBe(true);
    expect(isSuccess({ f_code: "ok" })).toBe(true);
    expect(isSuccess({ f_code: "F" })).toBe(false);
    expect(isSuccess({})).toBe(false);
  });
});
