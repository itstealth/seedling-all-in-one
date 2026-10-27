import type { Metadata } from "next";
import Link from "next/link";
import { findByTransaction } from "@/lib/db";

export const metadata: Metadata = {
  title: "Application received — Seedling Group of Schools",
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  // Read-back is best-effort: the payment already succeeded regardless of
  // whether we can render the detail rows here.
  let record: Awaited<ReturnType<typeof findByTransaction>> | undefined;
  if (ref) {
    try {
      record = await findByTransaction(ref);
    } catch {
      record = undefined;
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
        Payment successful
      </p>
      <h1 className="mt-2 font-display text-3xl leading-tight text-indigo-950 lg:text-4xl">
        Your application is in
      </h1>
      <p className="mt-4 text-sm text-ink-muted">
        We&apos;ve received the registration fee and your application. The school
        office will contact you on the mobile number you provided.
      </p>

      {record && (
        <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-indigo-900/10 bg-indigo-900/10 text-sm">
          <Row label="Application number" value={String(record.unique_no)} />
          <Row label="Student" value={String(record.name)} />
          <Row label="Campus" value={String(record.school)} />
          <Row label="Grade" value={String(record.classname)} />
          <Row
            label="Amount paid"
            value={`₹${Number(record.amount).toLocaleString("en-IN")}`}
          />
          {ref && <Row label="Reference" value={ref} />}
        </dl>
      )}

      {!record && ref && (
        <p className="mt-8 rounded-lg bg-paper-200 px-4 py-3 text-sm text-indigo-950">
          Reference <strong className="font-semibold">{ref}</strong> — keep this
          for your records.
        </p>
      )}

      <p className="mt-8 text-sm text-ink-muted">
        Please save or print this page. If you lose it, you can find your receipt
        again using your application number and registered mobile.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/admissions/receipt"
          className="inline-block rounded-lg bg-indigo-800 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-900"
        >
          View &amp; print receipt
        </Link>
        <Link
          href="/"
          className="inline-block rounded-lg border border-indigo-900/20 px-6 py-3 text-center text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-900/5"
        >
          Back to Seedling Schools
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-4 bg-white px-4 py-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
