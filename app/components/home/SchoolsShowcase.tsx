import Image from "next/image";
import { LINKS, external } from "./links";

const SCHOOLS = [
  {
    name: "SPS",
    full: "Seedling Public School",
    logoSrc: "/logos/sps-logo.png",
    logoAlt: "SPS logo",
    board: "CBSE",
    photo: "/campus/feature-1.jpg",
    description:
      "The foundation years — reading, reasoning and curiosity built into daily habit, from Class I onward.",
    href: LINKS.sps,
  },
  {
    name: "SMHS",
    full: "Seedling Modern High School",
    logoSrc: "/logos/smhs-logo.webp",
    logoAlt: "SMHS logo",
    board: "CBSE",
    photo: "/campus/feature-2.jpg",
    description:
      "Senior schooling with streams, board preparation and the first real sense of a career direction.",
    href: LINKS.smhs,
  },
  {
    name: "Cambridge",
    full: "Seedling International Academy",
    logoSrc: "/logos/cambridge-shield.webp",
    logoAlt: "Cambridge shield logo",
    board: "Cambridge",
    photo: "/campus/feature-4.jpg",
    description:
      "An internationally benchmarked Cambridge pathway for families planning university abroad.",
    href: LINKS.cambridge,
  },
] as const;

export default function SchoolsShowcase() {
  return (
    <section id="schools" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-banyan-600">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            Our schools
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-banyan-900 sm:text-4xl lg:text-5xl">
            Three campuses, two boards, one standard.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {SCHOOLS.map((school) => (
            <a
              key={school.name}
              href={school.href}
              {...external}
              className="group flex flex-col overflow-hidden rounded-2xl border border-banyan-800/12 bg-paper-50 transition-all hover:-translate-y-1 hover:border-banyan-700/30 hover:shadow-xl hover:shadow-banyan-900/8"
            >
              <div className="relative h-44 overflow-hidden bg-banyan-900">
                <Image
                  src={school.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-paper-50/95 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-banyan-800">
                  {school.board}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="relative h-11 w-32">
                  <Image
                    src={school.logoSrc}
                    alt={school.logoAlt}
                    fill
                    sizes="128px"
                    className="object-contain object-left"
                  />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-banyan-900">
                  {school.full}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {school.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-banyan-700">
                  Visit {school.name}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
