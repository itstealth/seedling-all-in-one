import Image from "next/image";
import { BASE_PATH, LINKS, external } from "./links";

const SCHOOL_TABS = [
  {
    label: "SPS",
    href: LINKS.sps,
    logo: `${BASE_PATH}/logos/sps-logo.png`,
    alt: "Seedling Public School",
    width: "w-20",
  },
  {
    label: "SMHS",
    href: LINKS.smhs,
    logo: `${BASE_PATH}/logos/smhs-logo.webp`,
    alt: "Seedling Modern High School",
    width: "w-8",
  },
  {
    label: "SIA",
    href: LINKS.cambridge,
    logo: `${BASE_PATH}/logos/sia-logo-dark.png`,
    alt: "Seedling International Academy",
    width: "w-24",
  },
  {
    label: "SMIA",
    href: LINKS.cambridge,
    logo: `${BASE_PATH}/logos/smia-logo-dark.webp`,
    alt: "Seedling Modern International Academy",
    width: "w-28",
  },
];

const SECTIONS = [
  { label: "Our Schools", href: "#schools" },
  { label: "The Journey", href: "#journey" },
  { label: "Leadership", href: "#director" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50">
      {/* Group switcher — every school in the group, always one click away.
          Four logos are wider than three were, so on narrow screens this
          scrolls horizontally rather than clipping the first tab off-screen. */}
      <div className="border-b border-paper-200/10 bg-indigo-950">
        <div className="mx-auto flex max-w-6xl items-stretch overflow-x-auto px-5 lg:justify-end lg:overflow-visible lg:px-8">
          {SCHOOL_TABS.map((school) => (
            <a
              key={school.label}
              href={school.href}
              {...external}
              aria-label={school.alt}
              className="group flex items-center gap-2.5 border-l border-paper-200/10 px-4 py-2.5 transition-colors hover:bg-indigo-900 sm:px-5"
            >
              <span
                aria-hidden="true"
                className={`relative h-7 ${school.width} shrink-0 opacity-80 transition-opacity group-hover:opacity-100`}
              >
                <Image
                  src={school.logo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </span>
            </a>
          ))}
        </div>
      </div>

      <nav className="relative border-b border-indigo-800/10 bg-paper-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 lg:px-8">
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="font-display text-lg font-semibold tracking-tight text-indigo-800">
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
                  className="transition-colors hover:text-indigo-700"
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={LINKS.alumni}
                {...external}
                className="transition-colors hover:text-indigo-700"
              >
                Alumni
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href="#schools"
              className="rounded-full bg-indigo-800 px-4 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-700"
            >
              Choose a school
            </a>

            {/* A disclosure rather than a scripted drawer: the menu opens with
                no client JavaScript, and keyboard support comes for free. */}
            <details className="group lg:hidden">
              <summary
                aria-label="Menu"
                className="flex cursor-pointer items-center rounded-full p-2 text-indigo-800 transition-colors hover:bg-indigo-800/8 [&::-webkit-details-marker]:hidden"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6h14M3 10h14M3 14h14"
                    className="group-open:hidden"
                  />
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    className="hidden group-open:block"
                  />
                </svg>
              </summary>

              <ul className="absolute inset-x-0 top-full border-b border-indigo-800/10 bg-paper-50 px-5 py-3 text-[0.9375rem] font-medium text-ink-muted shadow-lg">
                {SECTIONS.map((section) => (
                  <li key={section.href}>
                    <a
                      href={section.href}
                      className="block py-2.5 transition-colors hover:text-indigo-700"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={LINKS.alumni}
                    {...external}
                    className="block py-2.5 transition-colors hover:text-indigo-700"
                  >
                    Alumni
                  </a>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
}
