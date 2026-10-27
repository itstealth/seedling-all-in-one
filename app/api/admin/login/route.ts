import { NextResponse } from "next/server";
import { passwordMatches, startSession } from "@/lib/admin-auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Slow down password guessing: 8 attempts per 15 minutes per address. */
const LIMIT = 8;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  const limit = rateLimit(`admin-login:${clientKey(request)}`, LIMIT, WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof (body as { password?: unknown }).password === "string"
    ? (body as { password: string }).password
    : "";

  if (!password || !passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  try {
    await startSession();
  } catch (err) {
    console.error("[admin-login] cannot start session:", err);
    return NextResponse.json(
      { error: "Sign-in is not configured. Contact the administrator." },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: true });
}
