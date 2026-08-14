import Image from "next/image";
import Link from "next/link";
import { LINKS, external } from "./links";

const SCHOOLS = [
  {
    board: "CBSE",
    name: "Seedling Public School",
    stage: "Class I – XII",
    photo: "/campus/feature-1.jpg",
    href: LINKS.sps,
  },
  {
    board: "CBSE",
    name: "Seedling Modern High School",
    stage: "Class I – XII",
    photo: "/campus/feature-2.jpg",
    href: LINKS.smhs,
  },
  {
    board: "Cambridge",
    name: "Seedling International Academy",
    stage: "Early Years – A Level",
    photo: "/campus/sia-card.jpg",
    href: LINKS.cambridge,
  },
  {
    board: "Cambridge",
    name: "Seedling Modern International Academy",
    stage: "Class I – XII",
    photo: "/campus/feature-5.jpg",
    href: LINKS.cambridge,
  },
] as const;

export default function SchoolsShowcase() {
  return (
    <section id="schools" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal>
          <p className="eyebrow flex items-center gap-3 text-marigold-500">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            Choose your board
          </p>
          {/* Deliberately not width-constrained like the lede below: at
              max-w-2xl this line wrapped to two, which the boss wants on one.
              The nowrap is held to lg: — below that the line needs more width
              than a phone or tablet viewport has, and forcing it would push
              the page into horizontal scroll instead of just wrapping. */}
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-indigo-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Four campuses, two boards, one standard.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Pick the board that fits your child&rsquo;s route — the standard
            behind it does not change.
          </p>

          <Link
            href="/schools"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-800 transition-colors hover:text-indigo-700"
          >
            View all schools
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          data-reveal-group
        >
          {SCHOOLS.map((school) => (
            <li key={school.name}>
              <a
                href={school.href}
                {...external}
                className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl lg:min-h-[26rem]"
              >
                {/* The photograph carries the card; the scrim only buys
                    legibility for the type sitting on the lower half. */}
                <Image
                  src={school.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                    school.board === "Cambridge"
                      ? "from-marigold-500 via-marigold-500/60"
                      : "from-indigo-950 via-indigo-950/60"
                  }`}
                />

                <div className="relative p-6">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-paper-100">
                    {school.board}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-medium leading-snug tracking-tight text-paper-50">
                    {school.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-paper-50/15 pt-3.5">
                    <span className="text-xs text-paper-200/70">
                      {school.stage}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-lg leading-none text-paper-50 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
