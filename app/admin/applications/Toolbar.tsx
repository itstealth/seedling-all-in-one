"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const field =
  "rounded-lg border border-indigo-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/15";

export default function Toolbar({
  schools,
  current,
}: {
  schools: string[];
  current: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const [q, setQ] = useState(current.q ?? "");
  const [school, setSchool] = useState(current.school ?? "");
  const [status, setStatus] = useState(current.status ?? "");
  const [from, setFrom] = useState(current.from ?? "");
  const [to, setTo] = useState(current.to ?? "");

  function params() {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (school) p.set("school", school);
    if (status) p.set("status", status);
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    return p;
  }

  function apply(e: FormEvent) {
    e.preventDefault();
    router.push(`/admin/applications?${params().toString()}`);
  }

  return (
    <form onSubmit={apply} className="mb-5 flex flex-wrap items-end gap-3">
      <label className="flex-1 min-w-[14rem]">
        <span className="mb-1 block text-xs font-medium text-ink-muted">
          Search name, mobile or application no.
        </span>
        <input className={`${field} w-full`} value={q} onChange={(e) => setQ(e.target.value)} />
      </label>

      <label>
        <span className="mb-1 block text-xs font-medium text-ink-muted">Campus</span>
        <select className={field} value={school} onChange={(e) => setSchool(e.target.value)}>
          <option value="">All</option>
          {schools.map((s) => (
            <option key={s} value={s}>{s.length > 44 ? s.slice(0, 44) + "…" : s}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="mb-1 block text-xs font-medium text-ink-muted">Payment</span>
        <select className={field} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </label>

      <label>
        <span className="mb-1 block text-xs font-medium text-ink-muted">From</span>
        <input type="date" className={field} value={from} onChange={(e) => setFrom(e.target.value)} />
      </label>
      <label>
        <span className="mb-1 block text-xs font-medium text-ink-muted">To</span>
        <input type="date" className={field} value={to} onChange={(e) => setTo(e.target.value)} />
      </label>

      <button type="submit" className="rounded-lg bg-indigo-800 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-900">
        Filter
      </button>
      <a
        href={`/api/admin/applications/export?${params().toString()}`}
        className="rounded-lg border border-indigo-900/20 px-4 py-2 text-sm font-semibold text-indigo-900 hover:bg-white"
      >
        Export CSV
      </a>
    </form>
  );
}
