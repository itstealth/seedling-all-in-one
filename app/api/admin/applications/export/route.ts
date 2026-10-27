import { requireAdmin } from "@/lib/admin-auth";
import { exportApplications, type ListFilters } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ROWS = 5000;

/**
 * CSV export of the current filter.
 *
 * Contains applicants' personal details, so it is behind the same session guard
 * as the rest of the dashboard.
 */
export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const sp = new URL(request.url).searchParams;
  const filters: ListFilters = {
    q: sp.get("q") ?? undefined,
    school: sp.get("school") ?? undefined,
    status: sp.get("status") ?? undefined,
    from: sp.get("from") ?? undefined,
    to: sp.get("to") ?? undefined,
  };

  let rows;
  try {
    rows = await exportApplications(filters, MAX_ROWS);
  } catch (err) {
    console.error("[admin-export] query failed:", err);
    return Response.json({ error: "Export failed." }, { status: 500 });
  }

  const header = [
    "Application No", "Date", "School", "Grade", "Student",
    "Father", "Mobile", "Email", "Fee", "Amount Paid", "Payment Status",
  ];

  const lines = [header.map(csv).join(",")];
  for (const r of rows) {
    lines.push([
      r.applicationNo, r.createdOn, r.school, r.className, r.studentName,
      r.fatherName, r.mobile, r.email, r.fee, r.amount ?? "",
      r.paymentStatus ?? "",
    ].map(csv).join(","));
  }

  // Excel opens UTF-8 CSV as the local codepage unless there's a BOM, which
  // mangles names with accents.
  const body = "﻿" + lines.join("\r\n") + "\r\n";
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="admissions-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Quote a CSV field.
 *
 * A leading =, +, - or @ is prefixed with a quote so spreadsheet software
 * treats it as text: applicant-supplied values land in this file, and Excel
 * would otherwise evaluate them as formulas.
 */
function csv(value: unknown): string {
  let s = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
