import { NextResponse } from "next/server";
import { findReceipt } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 10 attempts per 10 minutes per address — generous for a parent, slow for a script. */
const LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * Receipt lookup.
 *
 * Requires the application number *and* the mobile registered against it. A
 * failed match returns the same response whether the application doesn't exist
 * or the mobile is wrong, so the endpoint can't be used to test which
 * application numbers are real.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`receipt:${clientKey(request)}`, LIMIT, WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const source = (body ?? {}) as Record<string, unknown>;
  const applicationNo = Number(
    typeof source.applicationNo === "string"
      ? source.applicationNo.trim()
      : source.applicationNo
  );
  const mobile =
    typeof source.mobile === "string" ? source.mobile.replace(/\D/g, "") : "";

  if (!Number.isInteger(applicationNo) || applicationNo <= 0 || mobile.length !== 10) {
    return NextResponse.json(
      { error: "Enter your application number and the 10-digit mobile you registered." },
      { status: 400 }
    );
  }

  let receipt;
  try {
    receipt = await findReceipt(applicationNo, mobile);
  } catch (err) {
    console.error("[receipt] lookup failed:", err);
    return NextResponse.json(
      { error: "We couldn't look that up right now. Please try again." },
      { status: 500 }
    );
  }

  // Same message for "no such application" and "wrong mobile" — see the note
  // in findReceipt about enumeration.
  if (!receipt) {
    return NextResponse.json(
      {
        error:
          "No application matches that number and mobile. Check both and try again.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ receipt });
}
