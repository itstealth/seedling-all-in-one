import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "../components/home/links";

export const metadata: Metadata = {
  title: "Thank you — Seedling Group of Schools",
  description:
    "Thank you for getting in touch with Seedling Group of Schools. Our team will be in touch soon.",
};

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-indigo-950 text-paper-50">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={`${BASE_PATH}/campus/about-banner.jpg`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/95 via-indigo-950/90 to-indigo-900/80" />
        <div className="jaali absolute inset-0 text-paper-50 opacity-40" />
        <div className="thankyou-glow absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-marigold-500/10 blur-[100px]" />
        <div className="absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full border border-paper-50/10" />
        <div className="absolute -right-20 -top-28 h-[26rem] w-[26rem] rounded-full border border-paper-50/10" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 lg:px-8">
        <Link href="/" aria-label="Seedling Group of Schools home" className="group">
          <span className="block font-display text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-paper-100 sm:text-2xl">
            Seedling
          </span>
          <span className="mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-paper-200/65">
            Group of Schools
          </span>
        </Link>
        <span className="hidden items-center gap-2 text-xs font-medium tracking-wide text-paper-200/65 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-marigold-500" />
          Jaipur · Since 1992
        </span>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 pb-16 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
          <div className="thankyou-copy max-w-2xl">
            <div className="thankyou-check relative flex h-16 w-16 items-center justify-center rounded-full border border-paper-50/25 bg-white/[0.07] shadow-[0_0_0_10px_rgba(255,255,255,0.025),0_0_48px_rgba(255,255,255,0.1)] sm:h-[4.5rem] sm:w-[4.5rem]">
              <span className="thankyou-check-halo absolute -inset-2 rounded-full border border-paper-50/20" aria-hidden="true" />
              <svg
                viewBox="0 0 48 48"
                className="h-8 w-8 text-paper-50 sm:h-9 sm:w-9"
                fill="none"
                aria-hidden="true"
              >
                <circle className="thankyou-check-ring" cx="24" cy="24" r="20" stroke="currentColor" strokeOpacity=".55" />
                <path className="thankyou-check-tick" d="m15.5 24.5 5.7 5.7L33 18.4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="eyebrow mt-9 flex items-center gap-3 text-paper-100/80">
              <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
              Message received
            </p>
            <h1 className="mt-5 max-w-xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              Thank you.
              <br className="hidden sm:block" /> A bright beginning.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-200/75 sm:text-xl">
              Every great journey starts with a conversation. Our team has your
              message and will be in touch with you soon.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-paper-50 px-6 py-3 text-sm font-bold text-indigo-950 transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-paper-50"
              >
                Back to our home
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/#schools"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-paper-50/25 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:border-paper-50/55 hover:bg-white/5"
              >
                Explore our schools
              </Link>
            </div>

            <p className="mt-8 text-xs leading-relaxed text-paper-200/50">
              Need to speak with us sooner? Call our Jaipur team at{" "}
              <a className="whitespace-nowrap text-paper-100 underline decoration-paper-100/40 underline-offset-4 hover:text-white" href="tel:+911414101111">
                +91 141 410 1111
              </a>
            </p>
          </div>

          <aside className="thankyou-card-wrap relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-3 rotate-[-3deg] rounded-[2rem] border border-paper-50/10 bg-white/[0.03]" aria-hidden="true" />
            <div className="thankyou-card relative overflow-hidden rounded-[1.7rem] border border-white/60 bg-paper-50 p-7 text-ink shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-9">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-marigold-500 via-marigold-400 to-transparent" aria-hidden="true" />
              <div className="flex items-center justify-between">
                <span className="eyebrow text-indigo-700">What happens next</span>
                <span className="font-display text-sm italic text-ink-muted/60">A note from us</span>
              </div>

              <div className="mt-8 space-y-7">
                <Step number="01" title="We read your note" text="Your enquiry is with our admissions team." />
                <Step number="02" title="We find the right person" text="We’ll connect you with the campus that fits your needs." />
                <Step number="03" title="We’ll be in touch" text="Expect a personal reply from our team shortly." last />
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-indigo-900/10 pt-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900 text-xs font-semibold tracking-wide text-white">
                  SG
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-indigo-950">Seedling Group</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Growing brighter futures since 1992</p>
                </div>
                <svg viewBox="0 0 40 40" className="ml-auto h-9 w-9 text-marigold-500/80" fill="none" aria-hidden="true">
                  <path d="M20 33V17m0 8c-7 0-11-4-11-11 7 0 11 4 11 11Zm0-5c0-7 4-11 11-11 0 7-4 11-11 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 33h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-paper-50/10 px-5 py-5 text-[0.68rem] text-paper-200/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {new Date().getFullYear()} Seedling Group of Schools</span>
        <span>From the first little step to a world of possibility.</span>
      </footer>
    </main>
  );
}

function Step({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div className="thankyou-step relative flex gap-4">
      {!last && <span className="absolute left-[1.125rem] top-10 h-[calc(100%+0.9rem)] w-px bg-indigo-900/10" aria-hidden="true" />}
      <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-900/10 bg-paper-50 font-body text-[0.62rem] font-bold tracking-wide text-marigold-500">
        {number}
      </span>
      <div className="pt-0.5">
        <h2 className="font-display text-lg font-semibold leading-tight text-indigo-950">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{text}</p>
      </div>
    </div>
  );
}
