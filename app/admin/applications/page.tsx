import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import {
  countApplications,
  listApplications,
  listSchoolsInData,
  type ListFilters,
} from "@/lib/db";
import LogoutButton from "./LogoutButton";
import Toolbar from "./Toolbar";

export const metadata: Metadata = {
  title: "Admissions — Seedling Staff",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PER_PAGE = 50;

/** Replaces `admission_form_view.php`, which had no authentication at all. */
export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const sp = await searchParams;
  const page = Math.max(Number(sp.page ?? 1) || 1, 1);
  const filters: ListFilters = {
    q: sp.q,
    school: sp.school,
    status: sp.status,
    from: sp.from,
    to: sp.to,
    page,
    perPage: PER_PAGE,
  };

  let rows: Awaited<ReturnType<typeof listApplications>> = [];
  let total = 0;
  let schools: string[] = [];
  let loadError: string | null = null;

  try {
    [rows, total, schools] = await Promise.all([
      listApplications(filters),
      countApplications(filters),
      listSchoolsInData(),
    ]);
  } catch (err) {
    console.error("[admin] list failed:", err);
    loadError = "Couldn't load applications. Please try again.";
  }

  const pages = Math.max(Math.ceil(total / PER_PAGE), 1);
  const qs = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...sp, ...over })) {
      if (v !== undefined && v !== "") p.set(k, String(v));
    }
    return `?${p.toString()}`;
  };

  return (
    <main className="min-h-screen bg-paper-200 px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
              Seedling Admissions
            </p>
            <h1 className="mt-1 font-display text-3xl text-indigo-950">
              Applications
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {total.toLocaleString("en-IN")} matching
              {total > 0 && <> · page {page} of {pages}</>}
            </p>
          </div>
          <LogoutButton />
        </header>

        <Toolbar schools={schools} current={sp} />

        {loadError ? (
          <p role="alert" className="rounded-lg border border-marigold-500/30 bg-white px-4 py-3 text-sm text-marigold-500">
            {loadError}
          </p>
        ) : rows.length === 0 ? (
          <p className="rounded-lg border border-indigo-900/10 bg-white px-4 py-8 text-center text-sm text-ink-muted">
            No applications match these filters.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-indigo-900/10 bg-white">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-indigo-900/10 bg-paper-200/60 text-left">
                  <Th>App no.</Th><Th>Date</Th><Th>Student</Th><Th>Campus</Th>
                  <Th>Grade</Th><Th>Mobile</Th><Th>Fee</Th><Th>Payment</Th><Th></Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const paid = (r.paymentStatus ?? "").toUpperCase().startsWith("SUCCESS");
                  return (
                    <tr key={r.id} className="border-b border-indigo-900/5 last:border-0">
                      <Td className="font-medium tabular-nums">{r.applicationNo}</Td>
                      <Td className="whitespace-nowrap tabular-nums">{r.createdOn}</Td>
                      <Td className="font-medium">{r.studentName || "—"}</Td>
                      <Td className="max-w-[16rem] truncate" title={r.school}>{r.school || "—"}</Td>
                      <Td>{r.className || "—"}</Td>
                      <Td className="tabular-nums">{r.mobile || "—"}</Td>
                      <Td className="tabular-nums">₹{r.fee || "—"}</Td>
                      <Td>
                        <span className={`rounded px-2 py-0.5 text-xs font-bold ${
                          paid
                            ? "bg-indigo-900/10 text-indigo-900"
                            : "bg-marigold-500/10 text-marigold-500"
                        }`}>
                          {paid ? "PAID" : (r.paymentStatus ?? "UNPAID")}
                        </span>
                      </Td>
                      <Td>
                        <Link
                          href={`/admin/applications/${r.id}`}
                          className="font-semibold text-indigo-700 hover:underline"
                        >
                          View
                        </Link>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <nav className="mt-5 flex items-center justify-between text-sm">
            {page > 1 ? (
              <Link href={qs({ page: page - 1 })} className="rounded-lg border border-indigo-900/20 px-4 py-2 font-medium text-indigo-900 hover:bg-white">
                ← Previous
              </Link>
            ) : <span />}
            {page < pages ? (
              <Link href={qs({ page: page + 1 })} className="rounded-lg border border-indigo-900/20 px-4 py-2 font-medium text-indigo-900 hover:bg-white">
                Next →
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>
    </main>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-muted">
      {children}
    </th>
  );
}

function Td({ children, className = "", title }: { children?: React.ReactNode; className?: string; title?: string }) {
  return <td className={`px-3 py-2.5 text-ink ${className}`} title={title}>{children}</td>;
}

