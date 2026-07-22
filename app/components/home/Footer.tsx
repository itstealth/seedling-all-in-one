import { LINKS, external } from "./links";

const SCHOOL_LINKS = [
  { label: "SPS", href: LINKS.sps, note: "CBSE" },
  { label: "SMHS", href: LINKS.smhs, note: "CBSE" },
  { label: "Cambridge", href: LINKS.cambridge, note: "Cambridge" },
];

const GROUP_LINKS = [
  { label: "About Us", href: LINKS.about },
  { label: "Alumni", href: LINKS.alumni },
  { label: "Seedling Group", href: LINKS.group },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-banyan-950 py-16 text-paper-200 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-paper-50">
              Seedling Group of Schools
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-200/70">
              Carrying students from play group to university since 1992, across
              CBSE and Cambridge campuses.
            </p>
          </div>

          <nav aria-label="Our schools">
            <p className="eyebrow text-marigold-400">Our schools</p>
            <ul className="mt-5 space-y-3.5">
              {SCHOOL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...external}
                    aria-label={`${link.label} (${link.note})`}
                    className="inline-flex items-baseline gap-2 text-[0.9375rem] font-medium text-paper-100 transition-colors hover:text-marigold-400"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="text-[0.6875rem] uppercase tracking-[0.1em] text-paper-200/45"
                    >
                      {link.note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="The group">
            <p className="eyebrow text-marigold-400">The group</p>
            <ul className="mt-5 space-y-3.5">
              {GROUP_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...external}
                    className="text-[0.9375rem] font-medium text-paper-100 transition-colors hover:text-marigold-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-paper-200/12 pt-7 text-xs text-paper-200/50">
          &copy; {new Date().getFullYear()} Seedling Group of Schools. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
