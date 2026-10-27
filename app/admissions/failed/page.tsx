import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment didn't go through — Seedling Group of Schools",
};

export const dynamic = "force-dynamic";

export default async function FailedPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marigold-500">
        Payment not completed
      </p>
      <h1 className="mt-2 font-display text-3xl leading-tight text-indigo-950 lg:text-4xl">
        The payment didn&apos;t go through
      </h1>
      <p className="mt-4 text-sm text-ink-muted">
        Your application has been saved, so nothing you typed is lost. No money
        has been taken. You can try the payment again, and if your bank did
        debit you, it will be reversed automatically.
      </p>

      {ref && (
        <p className="mt-6 rounded-lg bg-paper-200 px-4 py-3 text-sm text-indigo-950">
          Reference <strong className="font-semibold">{ref}</strong> — quote this
          if you call the office.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/admissions/apply"
          className="inline-block rounded-lg bg-indigo-800 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-900"
        >
          Try the payment again
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
