"use client";

import { useId, useState, type FormEvent } from "react";
import { FORM_ENDPOINT } from "./links";

const SCHOOLS = [
  "Seedling Public School — CBSE",
  "Seedling Modern High School — CBSE",
  "Seedling International Academy — Cambridge",
  "Seedling Modern International Academy — Cambridge",
];

const GRADES = [
  "Play Group",
  "Nursery",
  "LKG",
  "UKG",
  ...[
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ].map((numeral) => `Class ${numeral}`),
];

const GENDERS = ["Male", "Female", "Other"];

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-indigo-900/15 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/15";

// The native select arrow is heavy and differs per platform; a hairline
// chevron matches the rest of the field set.
const selectClass = `${fieldClass} appearance-none bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20stroke%3D%22%236b6459%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%208.5l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.15rem_1.15rem] bg-[right_0.75rem_center] bg-no-repeat pr-9`;

const labelClass = "text-[0.8125rem] font-medium text-ink";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className={labelClass}>{label}</span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

export default function InquiryForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        data-reveal
        data-reveal-bloom
        className="rounded-2xl bg-paper-50 p-7 shadow-2xl shadow-indigo-950/25 sm:p-8"
        role="status"
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-800/8"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-6 w-6 text-indigo-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </span>
        <p className="mt-4 font-display text-xl font-semibold text-indigo-950">
          We&rsquo;ve got your enquiry.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          Someone from the admissions team will call you back shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      data-reveal
      data-reveal-bloom
      className="rounded-2xl bg-paper-50 p-6 shadow-2xl shadow-indigo-950/25 sm:p-7"
    >
      <p className="font-display text-xl font-semibold leading-snug text-indigo-950">
        Talk to our admissions team
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        Share a few details and the right campus team will call you back.
      </p>

      <div className="mt-5 h-px bg-indigo-900/10" aria-hidden="true" />

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2"
      >
        {/* Formspree conventions: a hidden email subject line, and a honeypot
            field spam bots fill in but real visitors, who never see it, do
            not. Both need no setup beyond a Formspree account. */}
        <input
          type="hidden"
          name="_subject"
          value="New admissions enquiry — Seedling Group of Schools"
        />
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <Field label="Full Name" htmlFor={`${uid}-name`}>
          <input
            id={`${uid}-name`}
            name="Full Name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
          />
        </Field>

        <Field label="Parent's Name" htmlFor={`${uid}-parent`}>
          <input
            id={`${uid}-parent`}
            name="Parent's Name"
            type="text"
            required
            className={fieldClass}
          />
        </Field>

        <Field label="Mobile Number" htmlFor={`${uid}-phone`}>
          <span className="flex items-stretch overflow-hidden rounded-lg border border-indigo-900/15 bg-white transition-colors focus-within:border-indigo-700 focus-within:ring-2 focus-within:ring-indigo-700/15">
            <span className="flex items-center border-r border-indigo-900/12 px-2.5 text-sm text-ink-muted">
              +91
            </span>
            <input
              id={`${uid}-phone`}
              name="Mobile Number"
              type="tel"
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              placeholder="98765 43210"
              required
              autoComplete="tel-national"
              className="w-full bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none"
            />
          </span>
        </Field>

        <Field label="School" htmlFor={`${uid}-school`}>
          <select
            id={`${uid}-school`}
            name="School"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select a school
            </option>
            {SCHOOLS.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Grade Applying For" htmlFor={`${uid}-grade`}>
          <select
            id={`${uid}-grade`}
            name="Grade Applying For"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select a grade
            </option>
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Gender" htmlFor={`${uid}-gender`}>
          <select
            id={`${uid}-gender`}
            name="Gender"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select
            </option>
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </Field>

        <label htmlFor={`${uid}-message`} className="block sm:col-span-2">
          <span className={labelClass}>
            Message{" "}
            <span className="font-normal text-ink-muted">(optional)</span>
          </span>
          <textarea
            id={`${uid}-message`}
            name="Message"
            rows={2}
            className={`mt-1.5 resize-none ${fieldClass}`}
          />
        </label>

        <div className="mt-1 sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-800 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-paper-50/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Request a callback
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </>
            )}
          </button>

          {status === "error" && (
            <p
              role="alert"
              className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              Something went wrong sending that — please try again, or call
              the campus directly.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
