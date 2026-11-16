import { LINKS, external } from "./links";

// SIA and SMIA share the Cambridge site, so each links to its own campus page.
const SCHOOL_LINKS = [
  { label: "SPS", href: LINKS.sps, note: "CBSE" },
  { label: "SMHS", href: LINKS.smhs, note: "CBSE" },
  { label: "SIA", href: LINKS.sia, note: "Cambridge" },
  { label: "SMIA", href: LINKS.smia, note: "Cambridge" },
];

const GROUP_LINKS = [
  { label: "SMHS: About the school", href: LINKS.about },
  { label: "SMHS: Alumni", href: LINKS.alumni },
  { label: "Seedling Group", href: "/#top" },
];

export default function Footer() {
  return (
    <footer className="jaali mt-auto overflow-hidden bg-indigo-950 py-16 text-paper-200 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-paper-50">
              Seedling Group of Schools
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-200/70">
              Four schools across two Jaipur campuses, offering CBSE and
              Cambridge pathways from early years through Class XII.
            </p>
          </div>

          <nav aria-label="Our schools">
            <p className="eyebrow text-paper-100">Our schools</p>
            <ul className="mt-5 space-y-3.5">
              {SCHOOL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...external}
                    aria-label={`${link.label} (${link.note})`}
                    className="inline-flex items-baseline gap-2 text-[0.9375rem] font-medium text-paper-100 transition-colors hover:text-paper-50"
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
            <p className="eyebrow text-paper-100">The group</p>
            <ul className="mt-5 space-y-3.5">
              {GROUP_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...external}
                    className="text-[0.9375rem] font-medium text-paper-100 transition-colors hover:text-paper-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-paper-100">Jaipur campuses</p>
            <address className="mt-5 space-y-4 text-sm not-italic leading-relaxed text-paper-200/75">
              <p>Jawahar Nagar: Sector 4, Park Lane, Jaipur 302004<br />
                <a className="hover:text-paper-50" href="tel:+917413012351">SPS admissions: +91 74130 12351</a><br />
                <a href="tel:+911413623000">SPS office: 0141 3623000</a><br />
                <a href="mailto:seedlingacademy@hotmail.com">seedlingacademy@hotmail.com</a><br />
                <a className="underline underline-offset-4 hover:text-paper-50" href="https://maps.google.com/?q=Sector+4+Park+Lane+Jawahar+Nagar+Jaipur+302004" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
              </p>
              <p>Durgapura: Ashok Marg, Mahaveer Nagar-II, Jaipur 302018<br />
                <a className="hover:text-paper-50" href="tel:+919587772837">SMHS admissions: +91 95877 72837</a><br />
                <a href="tel:+911413624000">SMHS office: 0141 3624000</a><br />
                <a href="mailto:smhsjaipur@jnujaipur.ac.in">smhsjaipur@jnujaipur.ac.in</a><br />
                <a className="underline underline-offset-4 hover:text-paper-50" href="https://maps.google.com/?q=Ashok+Marg+Mahaveer+Nagar+II+Durgapura+Jaipur+302018" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
              </p>
            </address>
          </div>
        </div>

        <p className="mt-14 border-t border-paper-200/12 pt-7 text-xs text-paper-200/50">
          &copy; {new Date().getFullYear()} Seedling Group of Schools. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
