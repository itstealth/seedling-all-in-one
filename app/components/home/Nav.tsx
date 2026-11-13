import Image from "next/image";
import { BASE_PATH, LINKS, external } from "./links";
import HeaderMenuCloser from "./HeaderMenuCloser";

const SCHOOL_TABS = [
  {
    label: "SPS",
    href: LINKS.sps,
    logo: `${BASE_PATH}/logos/sps-logo.png`,
    icon: `${BASE_PATH}/logos/sps-icon.png`,
    alt: "Seedling Public School",
    width: "w-20",
  },
  {
    label: "SMHS",
    href: LINKS.smhs,
    logo: `${BASE_PATH}/logos/smhs-logo.webp`,
    icon: `${BASE_PATH}/logos/smhs-logo.webp`,
    alt: "Seedling Modern High School",
    width: "w-8",
  },
  {
    label: "SIA",
    href: LINKS.cambridge,
    logo: `${BASE_PATH}/logos/sia-logo-dark.png`,
    icon: `${BASE_PATH}/logos/sia-icon.png`,
    alt: "Seedling International Academy",
    width: "w-24",
  },
  {
    label: "SMIA",
    href: LINKS.cambridge,
    logo: `${BASE_PATH}/logos/smia-logo-dark.webp`,
    icon: `${BASE_PATH}/logos/smia-icon.png`,
    alt: "Seedling Modern International Academy",
    width: "w-28",
  },
];

const SECTIONS = [
  { label: "The Journey", href: "#journey" },
  { label: "Leadership", href: "#director" },
];

export default function Nav() {
  return (
    <header data-site-header className="sticky top-0 z-50">
      <HeaderMenuCloser />
      {/* Group switcher — every school in the group, always one click away.
          On phones the full wordmark logos don't fit side by side, so each
          school shows just its emblem, in four equal quarters; from the sm
          breakpoint up the full logos return. */}
      <div className="border-b border-paper-200/10 bg-indigo-950">
        <div className="mx-auto flex max-w-6xl items-stretch overflow-x-auto sm:px-5 lg:justify-end lg:overflow-visible lg:px-8">
          {SCHOOL_TABS.map((school) => (
            <a
              key={school.label}
              href={school.href}
              {...external}
              aria-label={school.alt}
              className="group flex flex-1 items-center justify-center gap-2.5 border-l border-paper-200/10 py-2 first:border-l-0 transition-colors hover:bg-indigo-900 sm:flex-none sm:px-5 sm:py-2.5 sm:first:border-l"
            >
              <span
                aria-hidden="true"
                className="relative h-8 w-8 shrink-0 opacity-90 transition-opacity group-hover:opacity-100 sm:hidden"
              >
                <Image
                  src={school.icon}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </span>
              <span
                aria-hidden="true"
                className={`relative hidden h-7 ${school.width} shrink-0 opacity-80 transition-opacity group-hover:opacity-100 sm:block`}
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
            <li>
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-1 transition-colors hover:text-indigo-700 [&::-webkit-details-marker]:hidden">
                  Our Schools
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <ul className="absolute left-0 top-full z-50 mt-3 hidden w-72 rounded-xl border border-indigo-800/10 bg-paper-50 p-2 text-sm text-ink-muted shadow-lg group-open:block">
                  <li>
                    <a
                      href="#schools"
                      aria-label="Our Schools: All Schools"
                      className="block rounded-lg px-3 py-2 font-semibold text-indigo-800 transition-colors hover:bg-indigo-800/5"
                    >
                      All Schools
                    </a>
                  </li>
                  <li className="my-1 border-t border-indigo-800/10" aria-hidden="true" />
                  {SCHOOL_TABS.map((school) => (
                    <li key={school.label}>
                      <a
                        href={school.href}
                        {...external}
                        aria-label={"Visit " + school.alt}
                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-indigo-800/5 hover:text-indigo-700"
                      >
                        {school.alt}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <a href={section.href} className="transition-colors hover:text-indigo-700">
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <a href={LINKS.alumni} {...external} className="transition-colors hover:text-indigo-700">
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
                <li>
                  <details className="group/schools">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 transition-colors hover:text-indigo-700 [&::-webkit-details-marker]:hidden">
                      Our Schools
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4 transition-transform group-open/schools:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <ul className="pb-2 pl-3">
                      <li>
                        <a
                          href="#schools"
                          aria-label="Our Schools: All Schools"
                          className="block rounded-lg py-2 transition-colors hover:text-indigo-700"
                        >
                          All Schools
                        </a>
                      </li>
                      {SCHOOL_TABS.map((school) => (
                        <li key={school.label}>
                          <a
                            href={school.href}
                            {...external}
                            aria-label={"Visit " + school.alt}
                            className="block rounded-lg py-2 transition-colors hover:text-indigo-700"
                          >
                            {school.alt}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                {SECTIONS.map((section) => (
                  <li key={section.href}>
                    <a href={section.href} className="block py-2.5 transition-colors hover:text-indigo-700">
                      {section.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={LINKS.alumni} {...external} className="block py-2.5 transition-colors hover:text-indigo-700">
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
