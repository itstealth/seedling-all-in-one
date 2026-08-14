import { LINKS, external } from "./links";

export default function GroupCta() {
  return (
    <section className="pb-20 lg:pb-28">
      {/* The marigold panel, kept short and text-only. At full section height it
          stops reading as the page's accent and starts competing with the
          photography above it. */}
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div
          className="jaali flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl bg-marigold-500 px-7 py-10 text-paper-50 sm:px-12 lg:px-14"
          data-reveal
        >
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-paper-50 sm:text-3xl">
              Not sure which campus fits?
            </h2>
            <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-paper-100">
              Tell us about your child and we will point you to the right team.
            </p>
          </div>

          <a
            href={LINKS.group}
            {...external}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-indigo-950 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-900"
          >
            Talk to the group office
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
