import type { Metadata } from "next";
import Nav from "../components/home/Nav";
import Footer from "../components/home/Footer";
import { LINKS, external } from "../components/home/links";

export const metadata: Metadata = {
  title: "Our Schools — Seedling Group of Schools",
  alternates: { canonical: "https://seedlingschools.com/schools" },
  openGraph: { title: "Our Schools — Seedling Group of Schools", description: "Four schools across two Jaipur campuses, offering CBSE and Cambridge pathways.", url: "https://seedlingschools.com/schools", images: [{ url: "/og-group-campus.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Our Schools — Seedling Group of Schools", description: "Four schools across two Jaipur campuses, offering CBSE and Cambridge pathways.", images: ["/og-group-campus.jpg"] },
  description:
    "Four schools across two Jaipur campuses, offering CBSE and Cambridge pathways.",
};

const GROUPS = [
  {
    board: "CBSE",
    heading: "The CBSE campuses",
    tagline: "Two Jaipur campuses offering the CBSE curriculum.",
    schools: [
      {
        name: "Seedling Public School",
        stage: "CBSE pathway",
        note: "A CBSE school supporting students throughout their school years.",
        href: LINKS.sps,
      },
      {
        name: "Seedling Modern High School",
        stage: "CBSE pathway",
        note: "A CBSE school supporting students throughout their school years.",
        href: LINKS.smhs,
      },
    ],
  },
  {
    board: "Cambridge",
    heading: "The Cambridge campuses",
    tagline: "One international curriculum, offered at both our Jaipur campuses.",
    schools: [
      {
        name: "Seedling International Academy",
        stage: "Cambridge pathway",
        note: "An internationally benchmarked route for families planning study abroad.",
        href: LINKS.sia,
      },
      {
        name: "Seedling Modern International Academy",
        stage: "Cambridge pathway",
        note: "A second Cambridge campus in Durgapura, extending the international route.",
        href: LINKS.smia,
      },
    ],
  },
] as const;

export default function SchoolsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-indigo-950 py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <p className="eyebrow flex items-center gap-3 text-paper-100">
              <span className="h-px w-8 bg-paper-100" aria-hidden="true" />
              Our Schools
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-paper-50 sm:text-5xl">
              Four schools, two boards, two Jaipur campuses.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper-200">
              Pick the board that fits your child&rsquo;s route — the
              standard behind it does not change.
            </p>
          </div>
        </section>

        {GROUPS.map((group) => (
          <section key={group.board} className="py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-marigold-500">
                  {group.board}
                </p>
                <h2 className="mt-2.5 font-display text-2xl font-semibold leading-snug tracking-tight text-indigo-900 sm:text-3xl">
                  {group.heading}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {group.tagline}
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal-group>
                {group.schools.map((school) => (
                  <li key={school.name}>
                    <a
                      href={school.href}
                      {...external}
                      className="group flex h-full flex-col justify-between gap-8 rounded-2xl bg-indigo-950 p-7 transition-transform duration-300 hover:-translate-y-1.5 lg:p-9"
                    >
                      <div>
                        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-paper-100">
                          {school.stage}
                        </p>
                        <p className="mt-3 font-display text-[1.375rem] font-medium leading-snug text-paper-50">
                          {school.name}
                        </p>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper-200/70">
                          {school.note}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-paper-50">
                          Visit campus site
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-xl leading-none text-paper-100 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
