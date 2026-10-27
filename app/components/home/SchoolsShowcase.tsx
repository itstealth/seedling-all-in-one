import Image from "next/image";
import { BASE_PATH, LINKS, external } from "./links";

const BOARDS = [
  {
    board: "CBSE",
    heading: "The CBSE campuses",
    tagline: "Two campuses, one curriculum, the same standard throughout.",
    photo: `${BASE_PATH}/campus/feature-1.jpg`,
    scrim: "from-indigo-950 via-indigo-950/75",
    schools: [
      { name: "Seedling Public School", href: LINKS.sps },
      { name: "Seedling Modern High School", href: LINKS.smhs },
    ],
  },
  {
    board: "Cambridge",
    heading: "The Cambridge campuses",
    tagline: "An international route, taught across both campuses at home.",
    photo: `${BASE_PATH}/campus/sia-card.jpg`,
    scrim: "from-marigold-500 via-marigold-500/75",
    schools: [
      { name: "Seedling International Academy", href: LINKS.cambridge },
      { name: "Seedling Modern International Academy", href: LINKS.cambridge },
    ],
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
        </div>

        <ul
          className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2"
          data-reveal-group
        >
          {BOARDS.map((group) => (
            <li key={group.board}>
              <div className="relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-2xl lg:min-h-[28rem]">
                {/* The photograph carries the card; the scrim only buys
                    legibility for the type sitting on the lower half. */}
                <Image
                  src={group.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t ${group.scrim} to-transparent`}
                />

                <div className="relative p-7 lg:p-9">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-paper-100">
                    {group.board}
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight text-paper-50">
                    {group.heading}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-paper-100/80">
                    {group.tagline}
                  </p>

                  <ul className="mt-6 divide-y divide-paper-50/15 border-t border-paper-50/15">
                    {group.schools.map((school) => (
                      <li key={school.name}>
                        <a
                          href={school.href}
                          {...external}
                          className="group flex items-center justify-between gap-4 py-3.5 text-paper-50 transition-colors hover:text-paper-100"
                        >
                          <span className="font-display text-[1.0625rem] leading-snug">
                            {school.name}
                          </span>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-xl leading-none transition-transform duration-300 group-hover:translate-x-1"
                          >
                            ↳
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
