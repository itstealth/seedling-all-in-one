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
    // Deep banyan green, light type
    wash: "bg-banyan-800",
    blend: "opacity-60",
    text: "text-paper-50",
    meta: "text-paper-100/75",
    arrow: "text-marigold-400",
  },
  {
    name: "Seedling Modern High School",
    short: "SMHS",
    board: "CBSE",
    tagline: "Where ambition finds its stream",
    photo: "/campus/feature-2.jpg",
    href: LINKS.smhs,
    // Marigold, dark type — the bright card in the row
    wash: "bg-marigold-500",
    blend: "opacity-45",
    text: "text-banyan-950",
    meta: "text-banyan-950/70",
    arrow: "text-banyan-900",
  },
  {
    name: "Seedling International Academy",
    short: "Cambridge",
    board: "Cambridge",
    tagline: "An international route, taught at home",
    photo: "/campus/sia-collage.webp",
    href: LINKS.cambridge,
    // Harbour blue, nodding to the Cambridge shield
    wash: "bg-harbour-800",
    blend: "opacity-55",
    text: "text-paper-50",
    meta: "text-paper-100/75",
    arrow: "text-marigold-400",
  },
] as const;

export default function SchoolsShowcase() {
  return (
    <section id="schools" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-banyan-600">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            Choose your school
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-banyan-900 sm:text-4xl lg:text-5xl">
            Three campuses, two boards, one standard.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Pick the board that fits your child&rsquo;s route — the standard
            behind it does not change.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {SCHOOLS.map((school) => (
            <a
              key={school.short}
              href={school.href}
              {...external}
              aria-label={`${school.name} — ${school.tagline}`}
              className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl p-7 ${school.wash} transition-transform duration-300 hover:-translate-y-1.5`}
            >
              {/* Duotone: photograph reduced to luminance over the brand wash */}
              <Image
                src={school.photo}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className={`object-cover mix-blend-luminosity ${school.blend} transition-transform duration-500 group-hover:scale-105`}
              />

              <div className="relative">
                <p
                  className={`text-[0.6875rem] font-bold uppercase tracking-[0.16em] ${school.meta}`}
                >
                  {school.board}
                </p>
                <h3
                  className={`mt-3 font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight ${school.text}`}
                >
                  {school.name}
                </h3>
              </div>

              <div className="relative flex items-end justify-between gap-4">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
