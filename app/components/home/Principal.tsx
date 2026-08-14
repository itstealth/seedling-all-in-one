import Image from "next/image";

const OVERSEES = [
  { school: "Seedling Public School", board: "CBSE" },
  { school: "Seedling Modern High School", board: "CBSE" },
];

export default function Principal() {
  return (
    <section id="principal" className="bg-paper-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="order-2 lg:order-1" data-reveal>
            <p className="eyebrow flex items-center gap-3 text-marigold-500">
              <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
              Executive Director
            </p>

            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-indigo-900 sm:text-4xl">
              Dr. Preeti Bakshi
            </h2>

            <p className="mt-4 text-lg text-ink-muted">
              Executive Director, Seedling Group of Institutions
            </p>

            <blockquote className="mt-8 border-l-2 border-marigold-500 pl-6">
              <p className="font-display text-xl leading-snug text-indigo-900">
                “Give the pupils something to do, not something to learn; and
                the doing is of such a nature as to demand thinking; learning
                naturally results.”
              </p>
              <cite className="mt-3 block text-sm not-italic text-ink-muted">
                John Dewey — the principle behind{" "}
                <span className="font-semibold text-indigo-700">
                  Creating Fresh Pathways
                </span>
              </cite>
            </blockquote>

            <dl className="mt-9 divide-y divide-indigo-800/12 border-y border-indigo-800/12">
              {OVERSEES.map((item) => (
                <div
                  key={item.school}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                >
                  <dt className="font-display text-base font-semibold text-indigo-900">
                    {item.school}
                  </dt>
                  <dd className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-indigo-700">
                    {item.board}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
              Academic direction across both CBSE campuses of the group, holding
              one standard through the years that carry a student from Class I
              to the boards.
            </p>
          </div>

          <figure className="order-1 lg:order-2" data-reveal data-reveal-bloom>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-indigo-800/8 ring-8 ring-marigold-500">
              <Image
                src="/people/preeti-portrait.png"
                alt="Dr. Preeti Bakshi"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
