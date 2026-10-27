import { NextResponse } from "next/server";
import { isSuccess, verifyResponse, type AtomResponse } from "@/lib/atom";
import { recordPaymentOutcome } from "@/lib/db";
import { MERCHANTS, merchantCredentials, type MerchantId } from "@/lib/schools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Atom posts the payment result here as form-encoded data.
 *
 * Everything in the body is attacker-controllable until the signature checks
 * out, so the order is: parse → verify → then act. A body that fails
 * verification is recorded nowhere and redirected to the failure page.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ merchant: string }> }
) {
  const { merchant } = await params;

  if (!Object.prototype.hasOwnProperty.call(MERCHANTS, merchant)) {
    return NextResponse.json({ error: "Unknown merchant." }, { status: 404 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirectToResult(request, "failed", undefined);
  }

  const res: AtomResponse = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === "string") res[k] = v;
  }

  let credentials: ReturnType<typeof merchantCredentials>;
  try {
    credentials = merchantCredentials(merchant as MerchantId);
  } catch (err) {
    console.error("[payment-callback] credentials unavailable:", err);
    return redirectToResult(request, "failed", res.mer_txn);
  }

  if (!verifyResponse(res, credentials.responseHashKey)) {
    // Either a forged callback or a key mismatch. Never write to the row.
    console.error(
      "[payment-callback] signature verification FAILED for merchant=%s txn=%s",
      merchant,
      res.mer_txn
    );
    return redirectToResult(request, "failed", res.mer_txn);
  }

  const txnId = res.mer_txn ?? "";
  if (!txnId) {
    console.error("[payment-callback] verified callback carried no mer_txn");
    return redirectToResult(request, "failed", undefined);
  }

  const success = isSuccess(res);

  try {
    await recordPaymentOutcome({
      txnId,
      status: success ? "SUCCESS" : "FAILED",
      gatewayRef: res.mmp_txn,
      mode: res.prod,
      amount: res.amt,
      errorMessage: success ? undefined : (res.desc ?? res.f_code),
    });
  } catch (err) {
    // The parent has already paid at this point — surface the receipt anyway
    // and let reconciliation catch the row. Losing the redirect would be worse.
    console.error("[payment-callback] could not record outcome:", err);
  }

  return redirectToResult(request, success ? "thank-you" : "failed", txnId);
}

/**
 * Atom sends the parent here by POST, so we answer with a 303 to turn it back
 * into a GET — otherwise a refresh on the result page re-submits the callback.
 */
function redirectToResult(
  request: Request,
  page: "thank-you" | "failed",
  txnId: string | undefined
) {
  const base = process.env.PUBLIC_BASE_URL ?? new URL(request.url).origin;
  const url = new URL(`/admissions/${page}`, base);
  if (txnId) url.searchParams.set("ref", txnId);
  return NextResponse.redirect(url, 303);
}

/** Some gateways probe the return URL with GET; answer politely. */
export async function GET(request: Request) {
  return redirectToResult(request, "failed", undefined);
}
