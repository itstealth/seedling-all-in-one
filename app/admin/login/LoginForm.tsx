"use client";

import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/admin/applications";
        return;
      }
      const payload = await res.json().catch(() => ({}));
      setError(payload.error ?? "Sign in failed.");
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper-200 px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-lg border border-indigo-900/10 bg-white p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
          Seedling Admissions
        </p>
        <h1 className="mt-2 font-display text-2xl text-indigo-950">Staff sign in</h1>
        <p className="mt-2 text-sm text-ink-muted">
          This dashboard contains applicants&apos; personal details.
        </p>

        <label htmlFor="password" className="mt-6 block">
          <span className="text-[0.8125rem] font-medium text-ink">Password</span>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-indigo-900/15 px-3 py-2.5 text-sm outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/15"
          />
        </label>

        {error && (
          <p role="alert" className="mt-3 text-sm text-marigold-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full rounded-lg bg-indigo-800 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
