import { LINKS, external } from "./links";

const SECTIONS = [
  { label: "The Journey", href: "#journey" },
  { label: "Our Schools", href: "#schools" },
  { label: "Leadership", href: "#leadership" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-banyan-800/10 bg-paper-50/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
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

        <div className="flex items-center gap-1">
          <a
            href={LINKS.sps}
            {...external}
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-banyan-700 sm:block"
          >
            SPS
          </a>
          <a
            href={LINKS.smhs}
            {...external}
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-banyan-700 sm:block"
          >
            SMHS
          </a>
          <a
            href={LINKS.cambridge}
            {...external}
            className="rounded-full bg-banyan-800 px-4 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-banyan-700"
          >
            Cambridge
          </a>
        </div>
      </nav>
    </header>
  );
}
