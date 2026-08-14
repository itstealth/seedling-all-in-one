import { LINKS, external } from "./links";

const ROUTES = [
  {
    name: "Seedling Public School",
    board: "CBSE",
    stage: "Class I – XII",
    href: LINKS.sps,
  },
  {
    name: "Seedling Modern High School",
    board: "CBSE",
    stage: "Class I – XII",
    href: LINKS.smhs,
  },
  {
    name: "Seedling International Academy",
    board: "Cambridge",
    stage: "Early Years – A Level",
    href: LINKS.cambridge,
  },
] as const;

export default function Admissions() {
  return (
    <section id="admissions" className="pt-4 pb-12 lg:pt-6 lg:pb-16">
      {/* Marigold is the page's accent, so it is held to a panel rather than a
          full-bleed band — at that size it would stop reading as an accent and
          start competing with everything above it. */}
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="jaali overflow-hidden rounded-3xl bg-marigold-500 px-7 py-14 text-paper-50 sm:px-12 lg:px-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-paper-50">
              <span className="h-px w-8 bg-paper-50" aria-hidden="true" />
              Admissions
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-paper-50 sm:text-4xl lg:text-5xl">
              Every route starts with a conversation.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-paper-100">
              Each campus runs its own admissions. Choose the school that fits
              your child&rsquo;s route and speak to that team directly — they
              will take it from there.
            </p>
          </div>

          <ul className="mt-11 grid gap-4 lg:grid-cols-3" data-reveal-group>
            {ROUTES.map((route) => (
              <li key={route.name}>
                <a
                  href={route.href}
                  {...external}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-indigo-950 p-7 transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-paper-100">
                      {route.board}
                    </p>
                    <p className="mt-3 font-display text-[1.375rem] font-medium leading-snug text-paper-50">
                      {route.name}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-paper-200/70">{route.stage}</p>
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

          <p className="mt-9 text-[0.9375rem] text-paper-100">
            Not sure which fits?{" "}
            <a
              href={LINKS.group}
              {...external}
              className="font-semibold text-paper-50 underline decoration-paper-50/30 underline-offset-4 transition-colors hover:decoration-paper-50"
            >
              Talk to the group office
            </a>{" "}
            and we will point you to the right campus.
          </p>
        </div>
      </div>
    </section>
  );
}
