import Link from "next/link";
import { LINKS, external } from "./links";
import HeaderMenuCloser from "./HeaderMenuCloser";

const SCHOOL_TABS = [
  { label: "SPS", href: LINKS.sps, alt: "Seedling Public School" },
  { label: "SMHS", href: LINKS.smhs, alt: "Seedling Modern High School" },
  { label: "SIA", href: LINKS.sia, alt: "Seedling International Academy" },
  { label: "SMIA", href: LINKS.smia, alt: "Seedling Modern International Academy" },
];

const SECTIONS = [
  { label: "The Journey", href: "/#journey" },
  { label: "Leadership", href: "/#director" },
];

export default function Nav() {
  return (
    <header data-site-header className="sticky top-0 z-50">
      <HeaderMenuCloser />
      <nav className="relative border-b border-indigo-800/10 bg-paper-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 lg:px-8">
          <Link href="/#top" className="flex items-baseline gap-2.5">
            <span className="font-display text-lg font-semibold tracking-tight text-indigo-800">
              Seedling
            </span>
            <span className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted sm:inline">
              Group of Schools
            </span>
          </Link>

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
                    <Link
                      href="/#schools"
                      aria-label="Our Schools: All Schools"
                      className="block rounded-lg px-3 py-2 font-semibold text-indigo-800 transition-colors hover:bg-indigo-800/5"
                    >
                      All Schools
                    </Link>
                  </li>
                  <li className="my-1 border-t border-indigo-800/10" aria-hidden="true" />
                  {SCHOOL_TABS.map((school) => (
                    <li key={school.label}>
                      <Link
                        href={school.href}
                        {...external}
                        aria-label={"Visit " + school.alt}
                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-indigo-800/5 hover:text-indigo-700"
                      >
                        {school.alt}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <Link href={section.href} className="transition-colors hover:text-indigo-700">
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={LINKS.alumni} {...external} className="transition-colors hover:text-indigo-700">
                SMHS Alumni
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-1.5">
            <Link
              href="/#schools"
              className="hidden rounded-full bg-indigo-800 px-4 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-700 lg:inline-block"
            >
              Choose a school
            </Link>

            {/* Phones: "Our Schools" is the header button (it used to sit
                inside the hamburger menu); the panel spans the full width
                under the header. Desktop keeps "Our Schools" in the link row
                and the "Choose a school" button, as before. */}
            <details className="group/schools lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full bg-indigo-800 px-4 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-700 [&::-webkit-details-marker]:hidden">
                Our Schools
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform group-open/schools:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <ul className="absolute inset-x-0 top-full border-b border-indigo-800/10 bg-paper-50 px-5 py-3 text-[0.9375rem] font-medium text-ink-muted shadow-lg">
                <li>
                  <Link
                    href="/#schools"
                    aria-label="Our Schools: All Schools"
                    className="block rounded-lg py-2 font-semibold text-indigo-800 transition-colors hover:text-indigo-700"
                  >
                    All Schools
                  </Link>
                </li>
                {SCHOOL_TABS.map((school) => (
                  <li key={school.label}>
                    <Link
                      href={school.href}
                      {...external}
                      aria-label={"Visit " + school.alt}
                      className="block rounded-lg py-2 transition-colors hover:text-indigo-700"
                    >
                      {school.alt}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

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
                    <Link href={section.href} className="block py-2.5 transition-colors hover:text-indigo-700">
                      {section.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={LINKS.alumni} {...external} className="block py-2.5 transition-colors hover:text-indigo-700">
                    SMHS Alumni
                  </Link>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
}
