import Image from "next/image";
import { LINKS, external } from "./links";

const SCHOOLS = [
  {
    name: "Seedling Public School",
    short: "SPS",
    board: "CBSE",
    tagline: "The foundation years, built to last",
    photo: "/campus/feature-1.jpg",
    href: LINKS.sps,
    scrim: "from-indigo-950 via-indigo-950/75",
    text: "text-paper-50",
    meta: "text-marigold-400",
    arrow: "text-marigold-400",
  },
  {
    name: "Seedling Modern High School",
    short: "SMHS",
    board: "CBSE",
    tagline: "Where ambition finds its stream",
    photo: "/campus/feature-5.jpg",
    href: LINKS.smhs,
    // The bright card in the row — dark type over marigold
    scrim: "from-marigold-500 via-marigold-500/80",
    text: "text-indigo-950",
    meta: "text-indigo-900",
    arrow: "text-indigo-900",
  },
  {
    name: "Seedling International Academy",
    short: "Cambridge",
    board: "Cambridge",
    tagline: "An international route, taught at home",
    photo: "/campus/sia-card.jpg",
    href: LINKS.cambridge,
    scrim: "from-teal-700 via-teal-700/75",
    text: "text-paper-50",
    meta: "text-marigold-400",
    arrow: "text-marigold-400",
  },
] as const;

export default function SchoolsShowcase() {
  return (
    <section id="schools" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-indigo-700">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            Choose your school
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-indigo-900 sm:text-4xl lg:text-5xl">
            Three campuses, two boards, one standard.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Pick the board that fits your child&rsquo;s route — the standard
            behind it does not change.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3" data-reveal-group>
          {SCHOOLS.map((school) => (
            <li key={school.short}>
              <a
                href={school.href}
                {...external}
                aria-label={`${school.name} — ${school.tagline}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* The photograph carries the card; the scrim only buys legibility
                  for the type sitting on the lower half. */}
                <Image
                  src={school.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t ${school.scrim} to-transparent`}
                />

                <div className="relative p-7">
                  <p
                    className={`text-[0.6875rem] font-bold uppercase tracking-[0.16em] ${school.meta}`}
                  >
                    {school.board}
                  </p>
                  <h3
                    className={`mt-2.5 font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight ${school.text}`}
                  >
                    {school.name}
                  </h3>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <p
                      className={`max-w-[14rem] font-display text-[1.0625rem] leading-snug ${school.text}`}
                    >
                      {school.tagline}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-2xl leading-none ${school.arrow} transition-transform duration-300 group-hover:translate-x-1`}
                    >
                      ↳
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
