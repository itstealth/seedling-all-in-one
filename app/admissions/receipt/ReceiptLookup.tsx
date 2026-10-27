"use client";

import { useState, type FormEvent } from "react";

interface Receipt {
  applicationNo: number;
  school: string;
  studentName: string;
  className: string;
  fatherName: string;
  amount: string;
  transactionId: string | null;
  gatewayRef: string | null;
  paymentStatus: string | null;
  paidOn: string;
}

const field =
  "w-full rounded-lg border border-indigo-900/15 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/15";

export default function ReceiptLookup() {
  const [applicationNo, setApplicationNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admissions/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationNo, mobile }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setReceipt(null);
        setError(payload.error ?? "Something went wrong. Please try again.");
      } else {
        setReceipt(payload.receipt);
      }
    } catch {
      setReceipt(null);
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const paid = receipt?.paymentStatus?.toUpperCase() === "SUCCESS";

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12 lg:px-8 lg:py-16">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
          .receipt-sheet { border: none !important; box-shadow: none !important; }
        }
      `}</style>

      <header className="no-print mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
          Admissions
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-indigo-950 lg:text-4xl">
          Find your payment receipt
        </h1>
        <p className="mt-3 max-w-prose text-sm text-ink-muted">
          Enter the application number you were given, along with the mobile
          number you registered on the form.
        </p>
      </header>

      <form onSubmit={onSubmit} className="no-print flex flex-col gap-4 sm:flex-row sm:items-end">
        <label htmlFor="applicationNo" className="block flex-1">
          <span className="text-[0.8125rem] font-medium text-ink">
            Application number
          </span>
          <span className="mt-1.5 block">
            <input
              id="applicationNo"
              className={field}
              inputMode="numeric"
              placeholder="e.g. 105957"
              value={applicationNo}
              onChange={(e) => setApplicationNo(e.target.value)}
              required
            />
          </span>
        </label>
        <label htmlFor="mobile" className="block flex-1">
          <span className="text-[0.8125rem] font-medium text-ink">
            Registered mobile
          </span>
          <span className="mt-1.5 block">
            <input
              id="mobile"
              className={field}
              inputMode="tel"
              placeholder="10-digit number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-700/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Looking up…" : "Find receipt"}
        </button>
      </form>

      {error && (
        <p
          role="alert"
          className="no-print mt-6 rounded-lg border border-marigold-500/30 bg-marigold-500/5 px-4 py-3 text-sm text-marigold-500"
        >
          {error}
        </p>
      )}

      {receipt && (
        <section className="receipt-sheet mt-10 rounded-lg border border-indigo-900/15 bg-white p-6 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-indigo-900/10 pb-5">
            <div>
              <p className="font-display text-xl text-indigo-950">
                Seedling Group of Schools
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Application fee receipt
              </p>
            </div>
            <span
              className={`rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                paid
                  ? "bg-indigo-900/10 text-indigo-900"
                  : "bg-marigold-500/10 text-marigold-500"
              }`}
            >
              {paid ? "Paid" : (receipt.paymentStatus ?? "Unpaid")}
            </span>
          </div>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <Row label="Application number" value={String(receipt.applicationNo)} />
            <Row label="Date" value={receipt.paidOn} />
            <Row label="Student" value={receipt.studentName} />
            <Row label="Father's name" value={receipt.fatherName} />
            <Row label="Campus" value={receipt.school} wide />
            <Row label="Grade" value={receipt.className} />
            <Row
              label="Amount"
              value={
                receipt.amount
                  ? `₹${Number(receipt.amount).toLocaleString("en-IN")}`
                  : "—"
              }
            />
            {receipt.transactionId && (
              <Row label="Transaction ref" value={receipt.transactionId} wide />
            )}
            {receipt.gatewayRef && (
              <Row label="Gateway ref" value={receipt.gatewayRef} wide />
            )}
          </dl>

          {!paid && (
            <p className="mt-5 rounded-lg bg-marigold-500/5 px-4 py-3 text-sm text-marigold-500">
              This application has not been paid for. If you were charged, please
              contact the school office with the reference above.
            </p>
          )}

          <p className="mt-6 border-t border-indigo-900/10 pt-4 text-xs text-ink-muted">
            This is a computer-generated receipt and does not require a signature.
          </p>

          <button
            type="button"
            onClick={() => window.print()}
            className="no-print mt-6 rounded-lg border border-indigo-900/20 px-5 py-2.5 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-900/5"
          >
            Print this receipt
          </button>
        </section>
      )}
    </main>
  );
}

function Row({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-ink-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value || "—"}</dd>
    </div>
  );
}
