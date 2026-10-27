"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  CATEGORIES,
  EMPTY_APPLICATION,
  GENDERS,
  MEDIUMS,
  RESIDENTIAL,
  YES_NO,
  hasErrors,
  validateApplication,
  type ApplicationFields,
  type Errors,
} from "@/lib/application-schema";

export interface SchoolOption {
  key: string;
  label: string;
  feeInr: number;
  theme: "sps" | "smhs" | "cambridge" | "swkl";
}

/** Accent per campus, so the shared form still reads as the school's own. */
const THEME_ACCENT: Record<SchoolOption["theme"], string> = {
  sps: "text-indigo-900 border-indigo-900",
  smhs: "text-indigo-800 border-indigo-800",
  cambridge: "text-teal-800 border-teal-800",
  swkl: "text-marigold-500 border-marigold-500",
};

const field =
  "w-full rounded-lg border border-indigo-900/15 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/15";
const select = `${field} appearance-none pr-9`;
const label = "text-[0.8125rem] font-medium text-ink";

function Field({
  children,
  htmlFor,
  text,
  error,
  required,
}: {
  children: React.ReactNode;
  htmlFor: string;
  text: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className={label}>
        {text}
        {required && <span className="text-marigold-500"> *</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error && (
        <span className="mt-1 block text-xs text-marigold-500">{error}</span>
      )}
    </label>
  );
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function ApplyForm({
  schools,
  grades,
  preselectedKey,
}: {
  schools: SchoolOption[];
  grades: string[];
  preselectedKey: string;
}) {
  const [data, setData] = useState<ApplicationFields>({
    ...EMPTY_APPLICATION,
    school: preselectedKey,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const selected = useMemo(
    () => schools.find((s) => s.key === data.school),
    [schools, data.school]
  );

  const set =
    (key: keyof ApplicationFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const found = validateApplication(data);
    if (hasErrors(found)) {
      setErrors(found);
      setFormError("Please correct the highlighted fields.");
      document
        .querySelector("[data-error-anchor]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();

      if (!res.ok) {
        setErrors(payload.errors ?? {});
        setFormError(payload.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Hand off to the gateway. Kept as a full navigation rather than a fetch
      // so the parent lands on Atom's own page with a normal browser history.
      window.location.href = payload.redirectUrl;
    } catch {
      setFormError(
        "We couldn't reach the server. Check your connection and try again."
      );
      setSubmitting(false);
    }
  }

  const accent = selected ? THEME_ACCENT[selected.theme] : "text-indigo-900 border-indigo-900";

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="mb-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${accent.split(" ")[0]}`}>
          Admissions {new Date().getFullYear()}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-indigo-950 lg:text-4xl">
          Application &amp; registration fee
        </h1>
        <p className="mt-3 max-w-prose text-sm text-ink-muted">
          Fill in the student&apos;s details, then continue to secure payment.
          Your application is saved before you pay, so nothing is lost if the
          payment needs another attempt.
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className={`border-l-2 pl-3 font-display text-lg text-indigo-950 ${accent.split(" ")[1]}`}>
            School &amp; grade
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="school" text="School" error={errors.school} required>
              <select
                id="school"
                className={select}
                value={data.school}
                onChange={set("school")}
              >
                <option value="">Select a campus</option>
                {schools.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field htmlFor="className" text="Grade applying for" error={errors.className} required>
              <select
                id="className"
                className={select}
                value={data.className}
                onChange={set("className")}
              >
                <option value="">Select a grade</option>
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {selected && (
            <p className="rounded-lg bg-paper-200 px-4 py-3 text-sm text-indigo-950">
              Registration fee for {selected.label}:{" "}
              <strong className="font-semibold">
                ₹{selected.feeInr.toLocaleString("en-IN")}
              </strong>
            </p>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={`border-l-2 pl-3 font-display text-lg text-indigo-950 ${accent.split(" ")[1]}`}>
            Student
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="name" text="Full name" error={errors.name} required>
              <input id="name" className={field} value={data.name} onChange={set("name")} />
            </Field>
            <Field htmlFor="gender" text="Gender" error={errors.gender} required>
              <select id="gender" className={select} value={data.gender} onChange={set("gender")}>
                <option value="">Select</option>
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
          </div>

          <div>
            <span className={label}>
              Date of birth<span className="text-marigold-500"> *</span>
            </span>
            <div className="mt-1.5 grid grid-cols-3 gap-3">
              <input
                aria-label="Day"
                className={field}
                placeholder="DD"
                inputMode="numeric"
                value={data.dobDay}
                onChange={set("dobDay")}
              />
              <select aria-label="Month" className={select} value={data.dobMonth} onChange={set("dobMonth")}>
                <option value="">Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={String(i + 1)}>{m}</option>
                ))}
              </select>
              <input
                aria-label="Year"
                className={field}
                placeholder="YYYY"
                inputMode="numeric"
                value={data.dobYear}
                onChange={set("dobYear")}
              />
            </div>
            {(errors.dobDay || errors.dobMonth || errors.dobYear) && (
              <span className="mt-1 block text-xs text-marigold-500">
                {errors.dobDay ?? errors.dobMonth ?? errors.dobYear}
              </span>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="category" text="Category" error={errors.category} required>
              <select id="category" className={select} value={data.category} onChange={set("category")}>
                <option value="">Select</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field htmlFor="caste" text="Caste" error={errors.caste}>
              <input id="caste" className={field} value={data.caste} onChange={set("caste")} />
            </Field>
            <Field htmlFor="religion" text="Religion" error={errors.religion}>
              <input id="religion" className={field} value={data.religion} onChange={set("religion")} />
            </Field>
            <Field htmlFor="placeBirth" text="Place of birth" error={errors.placeBirth}>
              <input id="placeBirth" className={field} value={data.placeBirth} onChange={set("placeBirth")} />
            </Field>
            <Field htmlFor="aadharCard" text="Aadhaar number" error={errors.aadharCard}>
              <input id="aadharCard" className={field} inputMode="numeric" value={data.aadharCard} onChange={set("aadharCard")} />
            </Field>
            <Field htmlFor="physically" text="Specially abled" error={errors.physically}>
              <select id="physically" className={select} value={data.physically} onChange={set("physically")}>
                <option value="">Select</option>
                {YES_NO.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </Field>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={`border-l-2 pl-3 font-display text-lg text-indigo-950 ${accent.split(" ")[1]}`}>
            Parents
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="fatherName" text="Father's name" error={errors.fatherName} required>
              <input id="fatherName" className={field} value={data.fatherName} onChange={set("fatherName")} />
            </Field>
            <Field htmlFor="fatherOccupation" text="Father's occupation" error={errors.fatherOccupation}>
              <input id="fatherOccupation" className={field} value={data.fatherOccupation} onChange={set("fatherOccupation")} />
            </Field>
            <Field htmlFor="motherName" text="Mother's name" error={errors.motherName} required>
              <input id="motherName" className={field} value={data.motherName} onChange={set("motherName")} />
            </Field>
            <Field htmlFor="motherOccupation" text="Mother's occupation" error={errors.motherOccupation}>
              <input id="motherOccupation" className={field} value={data.motherOccupation} onChange={set("motherOccupation")} />
            </Field>
            <Field htmlFor="incomeParents" text="Annual family income" error={errors.incomeParents}>
              <input id="incomeParents" className={field} value={data.incomeParents} onChange={set("incomeParents")} />
            </Field>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={`border-l-2 pl-3 font-display text-lg text-indigo-950 ${accent.split(" ")[1]}`}>
            Contact
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="mobile" text="Mobile number" error={errors.mobile} required>
              <input id="mobile" className={field} inputMode="tel" placeholder="10-digit number" value={data.mobile} onChange={set("mobile")} />
            </Field>
            <Field htmlFor="email" text="Email" error={errors.email}>
              <input id="email" className={field} inputMode="email" value={data.email} onChange={set("email")} />
            </Field>
          </div>
          <Field htmlFor="address" text="Address" error={errors.address} required>
            <textarea id="address" rows={3} className={field} value={data.address} onChange={set("address")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field htmlFor="state" text="State" error={errors.state} required>
              <input id="state" className={field} value={data.state} onChange={set("state")} />
            </Field>
            <Field htmlFor="district" text="District" error={errors.district} required>
              <input id="district" className={field} value={data.district} onChange={set("district")} />
            </Field>
            <Field htmlFor="pinCode" text="PIN code" error={errors.pinCode} required>
              <input id="pinCode" className={field} inputMode="numeric" value={data.pinCode} onChange={set("pinCode")} />
            </Field>
          </div>
          <Field htmlFor="residential" text="Day scholar or hosteller" error={errors.residential}>
            <select id="residential" className={select} value={data.residential} onChange={set("residential")}>
              <option value="">Select</option>
              {RESIDENTIAL.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={`border-l-2 pl-3 font-display text-lg text-indigo-950 ${accent.split(" ")[1]}`}>
            Previous school &amp; siblings
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="namePreviousSchool" text="Previous school" error={errors.namePreviousSchool}>
              <input id="namePreviousSchool" className={field} value={data.namePreviousSchool} onChange={set("namePreviousSchool")} />
            </Field>
            <Field htmlFor="mediumPreviousSchool" text="Medium of instruction" error={errors.mediumPreviousSchool}>
              <select id="mediumPreviousSchool" className={select} value={data.mediumPreviousSchool} onChange={set("mediumPreviousSchool")}>
                <option value="">Select</option>
                {MEDIUMS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            <Field htmlFor="nameSibling" text="Sibling in a Seedling school" error={errors.nameSibling}>
              <input id="nameSibling" className={field} value={data.nameSibling} onChange={set("nameSibling")} />
            </Field>
            <Field htmlFor="classSibling" text="Sibling's class" error={errors.classSibling}>
              <input id="classSibling" className={field} value={data.classSibling} onChange={set("classSibling")} />
            </Field>
          </div>
        </section>

        <div data-error-anchor>
          {formError && (
            <p role="alert" className="rounded-lg border border-marigold-500/30 bg-marigold-500/5 px-4 py-3 text-sm text-marigold-500">
              {formError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-indigo-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            {selected
              ? `You'll pay ₹${selected.feeInr.toLocaleString("en-IN")} on the next screen.`
              : "Select a campus to see the registration fee."}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-indigo-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-700/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Starting payment…" : "Continue to payment"}
          </button>
        </div>
      </form>
    </main>
  );
}
