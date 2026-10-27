import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Atom Paynetz integration.
 *
 * The request/response signature formats below are transcribed from the legacy
 * `Atompay.php` and must stay byte-identical to it — the hash is computed over
 * a positional concatenation with no separators, so any reordering silently
 * produces a signature the gateway rejects.
 */

const LIVE_URL = "https://payment.atomtech.in/paynetz/epi/fts";
const UAT_URL = "https://paynetzuat.atomtech.in/paynetz/epi/fts";

export type AtomMode = "live" | "test";

/** Which endpoint to hit. Defaults to UAT so an unset env can't move real money. */
export function atomMode(): AtomMode {
  return process.env.ATOM_MODE === "live" ? "live" : "test";
}

export function atomEndpoint(mode: AtomMode = atomMode()): string {
  return mode === "live" ? LIVE_URL : UAT_URL;
}

export interface AtomRequest {
  login: string;
  password: string;
  requestHashKey: string;
  productId: string;
  /** Whole rupees, as a string with no separators, e.g. "1050". */
  amount: string;
  transactionId: string;
  clientCode: string;
  returnUrl: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  customerAddress: string;
  customerAccount: string;
}

/**
 * Request signature: login + password + "NBFundTransfer" + prodid + txnid
 * + amount + "INR", HMAC-SHA512 with the request hash key.
 *
 * Mirrors Atompay::getChecksum().
 */
export function requestSignature(req: AtomRequest): string {
  const payload =
    req.login +
    req.password +
    "NBFundTransfer" +
    req.productId +
    req.transactionId +
    req.amount +
    "INR";
  return createHmac("sha512", req.requestHashKey).update(payload).digest("hex");
}

/**
 * Build the redirect URL that hands the parent off to Atom.
 *
 * The legacy code emitted this via `document.location` in an inline script;
 * we return it so the caller can issue a proper HTTP redirect instead.
 */
export function buildRedirectUrl(
  req: AtomRequest,
  mode: AtomMode = atomMode()
): string {
  // Atom's own date format: dd/mm/yyyy hh:mm:ss with the space encoded.
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const date =
    `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}` +
    `%20${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const params = [
    ["login", req.login],
    ["pass", req.password],
    ["ttype", "NBFundTransfer"],
    ["prodid", req.productId],
    ["amt", req.amount],
    ["txncurr", "INR"],
    ["txnscamt", req.amount],
    ["ru", req.returnUrl],
    ["clientcode", encodeURIComponent(btoa(req.clientCode))],
    ["txnid", req.transactionId],
    ["date", date],
    ["udf1", req.customerName],
    ["udf2", req.customerEmail],
    ["udf3", req.customerMobile],
    ["udf4", req.customerAddress],
    ["custacc", req.customerAccount],
    ["signature", requestSignature(req)],
  ];

  // `date` and `clientcode` are pre-encoded above; everything else is encoded
  // here. Matches the legacy string concatenation exactly.
  const query = params
    .map(([k, v]) =>
      k === "date" || k === "clientcode"
        ? `${k}=${v}`
        : `${k}=${encodeURIComponent(v)}`
    )
    .join("&");

  return `${atomEndpoint(mode)}?${query}`;
}

/** Fields Atom posts back to the return URL. */
export interface AtomResponse {
  mmp_txn?: string;
  mer_txn?: string;
  f_code?: string;
  prod?: string;
  discriminator?: string;
  amt?: string;
  bank_txn?: string;
  signature?: string;
  desc?: string;
  [k: string]: string | undefined;
}

/**
 * Verify the response signature.
 *
 * Mirrors Atompay::validateResponse(), but compares in constant time — the
 * legacy `==` comparison leaked timing information and, being PHP's loose
 * equality, would also treat certain non-matching strings as equal.
 */
export function verifyResponse(
  res: AtomResponse,
  responseHashKey: string
): boolean {
  const payload =
    (res.mmp_txn ?? "") +
    (res.mer_txn ?? "") +
    (res.f_code ?? "") +
    (res.prod ?? "") +
    (res.discriminator ?? "") +
    (res.amt ?? "") +
    (res.bank_txn ?? "");

  const expected = createHmac("sha512", responseHashKey)
    .update(payload)
    .digest("hex");
  const got = (res.signature ?? "").toLowerCase();

  if (got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(got));
}

/**
 * Atom signals success with f_code "Ok". Anything else is a failure or a
 * pending state the parent should not be told succeeded.
 */
export function isSuccess(res: AtomResponse): boolean {
  return (res.f_code ?? "").toLowerCase() === "ok";
}
