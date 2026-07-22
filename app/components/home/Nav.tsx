import Image from "next/image";
import { LINKS, external } from "./links";

const SCHOOL_TABS = [
  {
    label: "SPS",
    href: LINKS.sps,
    logo: "/logos/sps-logo.png",
    alt: "Seedling Public School",
    width: "w-20",
  },
  {
    label: "SMHS",
    href: LINKS.smhs,
    logo: "/logos/smhs-logo.webp",
    alt: "Seedling Modern High School",
    width: "w-8",
  },
  {
    label: "Cambridge",
    href: LINKS.cambridge,
    logo: "/logos/cambridge-shield.webp",
    alt: "Cambridge shield",
    width: "w-7",
  },
];

const SECTIONS = [
  { label: "The Journey", href: "#journey" },
  { label: "Our Schools", href: "#schools" },
  { label: "Leadership", href: "#leadership" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50">
      {/* Group switcher — every school in the group, always one click away */}
      <div className="border-b border-paper-200/10 bg-banyan-950">
        <div className="mx-auto flex max-w-6xl items-stretch justify-end px-5 lg:px-8">
          {SCHOOL_TABS.map((school) => (
            <a
              key={school.label}
              href={school.href}
              {...external}
              aria-label={school.alt}
              className="group flex items-center gap-2.5 border-l border-paper-200/10 px-4 py-2.5 transition-colors hover:bg-banyan-900 sm:px-5"
            >
              <span
                aria-hidden="true"
                className={`relative h-6 ${school.width} shrink-0 opacity-80 transition-opacity group-hover:opacity-100`}
              >
                <Image
                  src={school.logo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </span>
              <span
                aria-hidden="true"
                className="hidden text-xs font-semibold uppercase tracking-[0.1em] text-paper-200/70 transition-colors group-hover:text-marigold-400 sm:inline"
              >
                {school.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <nav className="border-b border-banyan-800/10 bg-paper-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 lg:px-8">
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="font-display text-lg font-semibold tracking-tight text-banyan-800">
              Seedling
            </span>
            <span className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted sm:inline">
              Group of Schools
            </span>
          </a>

          <ul className="hidden items-center gap-7 text-sm font-medium text-ink-muted lg:flex">
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="transition-colors hover:text-banyan-700"
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={LINKS.alumni}
                {...external}
                className="transition-colors hover:text-banyan-700"
              >
                Alumni
              </a>
            </li>
          </ul>

          <a
            href="#schools"
            className="rounded-full bg-banyan-800 px-4 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-banyan-700"
          >
            Choose a school
          </a>
        </div>
      </nav>
    </header>
  );
}
