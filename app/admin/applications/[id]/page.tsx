import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getApplication } from "@/lib/db";

export const metadata: Metadata = {
  title: "Application — Seedling Staff",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Full application record.
 *
 * The legacy equivalent took `?no=` straight into its SQL and required no
 * sign-in, so the whole table could be walked by incrementing a number. Here
 * the id is coerced to an integer, bound as a parameter, and gated on session.
 */
export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  let row;
  try {
    row = await getApplication(numericId);
  } catch (err) {
    console.error("[admin] detail failed:", err);
    row = null;
  }
  if (!row) notFound();

  const v = (k: string) => {
    const val = row[k];
    return val === null || val === undefined || val === "" ? "—" : String(val);
  };

  const paid = String(row.payment_status ?? "").toUpperCase().startsWith("SUCCESS");
  const dob = [row.dob_day, row.dob_month, row.dob_year].filter(Boolean).join("/") || "—";

  return (
    <main className="min-h-screen bg-paper-200 px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/applications" className="text-sm font-semibold text-indigo-700 hover:underline">
          ← All applications
        </Link>

        <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-indigo-950">{v("name")}</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Application #{v("unique_no")} · {v("create_date")}
            </p>
          </div>
          <span className={`rounded px-3 py-1 text-xs font-bold uppercase ${
            paid ? "bg-indigo-900/10 text-indigo-900" : "bg-marigold-500/10 text-marigold-500"
          }`}>
            {paid ? "Paid" : (v("payment_status") === "—" ? "Unpaid" : v("payment_status"))}
          </span>
        </header>

        <Section title="Application">
          <Row label="Campus" value={v("school")} />
          <Row label="Grade" value={v("classname")} />
          <Row label="Fee" value={`₹${v("fee")}`} />
          <Row label="Amount recorded" value={row.amount ? `₹${v("amount")}` : "—"} />
          <Row label="Transaction ref" value={v("txnid")} />
          <Row label="Gateway ref" value={v("mihpayid")} />
          {row.error_msg ? <Row label="Gateway message" value={v("error_msg")} /> : null}
        </Section>

        <Section title="Student">
          <Row label="Name" value={v("name")} />
          <Row label="Date of birth" value={dob} />
          <Row label="Gender" value={v("gender")} />
          <Row label="Category" value={v("category")} />
          <Row label="Caste" value={v("caste")} />
          <Row label="Religion" value={v("religion")} />
          <Row label="Place of birth" value={v("place_birth")} />
          <Row label="Aadhaar" value={v("aadhar_card")} />
          <Row label="Specially abled" value={v("physically")} />
        </Section>

        <Section title="Parents">
          <Row label="Father" value={v("father_name")} />
          <Row label="Father's occupation" value={v("father_occupation")} />
          <Row label="Mother" value={v("mother_name")} />
          <Row label="Mother's occupation" value={v("mother_occupation")} />
          <Row label="Annual income" value={v("income_parents")} />
        </Section>

        <Section title="Contact">
          <Row label="Mobile" value={v("mobile")} />
          <Row label="Email" value={v("email")} />
          <Row label="Address" value={v("address")} />
          <Row label="District" value={v("district")} />
          <Row label="State" value={v("state")} />
          <Row label="PIN code" value={v("pin_code")} />
          <Row label="Day scholar / hosteller" value={v("residential")} />
        </Section>

        <Section title="Previous school & siblings">
          <Row label="Previous school" value={v("name_previous_school")} />
          <Row label="Medium" value={v("medium_previous_school")} />
          <Row label="Sibling" value={v("name_sibling")} />
          <Row label="Sibling's class" value={v("class_sibling")} />
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-indigo-900/10 bg-white">
      <h2 className="border-b border-indigo-900/10 bg-paper-200/60 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-muted">
        {title}
      </h2>
      <dl className="divide-y divide-indigo-900/5">{children}</dl>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 px-4 py-2.5 sm:grid-cols-[14rem_1fr] sm:gap-4">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd className="text-sm font-medium text-ink break-words">{value}</dd>
    </div>
  );
}
