import { NextResponse } from "next/server";
import { SCHOOLS, findSchool } from "@/lib/schools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public campus config for the admission form.
 *
 * The form UI lives in each school's own codebase so it can use that site's
 * header, footer and design — but the fees and grade lists must not be
 * duplicated three times and drift. Each site fetches them from here, so
 * `lib/schools.ts` stays the single source of truth.
 *
 * Only presentational fields are exposed. Merchant ids and the env var names
 * behind them never leave the server.
 */
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("school");

  if (key) {
    const school = findSchool(key);
    if (!school) {
      return NextResponse.json({ error: "Unknown school." }, { status: 404 });
    }
    return NextResponse.json({
      school: {
        key: school.key,
        label: school.label,
        feeInr: school.feeInr,
        theme: school.theme,
        grades: school.grades,
      },
    });
  }

  return NextResponse.json({
    schools: SCHOOLS.map((s) => ({
      key: s.key,
      label: s.label,
      feeInr: s.feeInr,
      theme: s.theme,
      grades: s.grades,
    })),
  });
}
