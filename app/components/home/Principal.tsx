import Image from "next/image";

const DESIGNATIONS = [
  { role: "Principal", school: "Seedling Public School" },
  { role: "Principal", school: "Seedling Modern High School" },
];

export default function Principal() {
  return (
    <section id="principal" className="bg-paper-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow flex items-center gap-3 text-banyan-600">
              <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
              Principal
            </p>

            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-banyan-900 sm:text-4xl">
              Dr. Preeti Bakshi
            </h2>

            <dl className="mt-8 divide-y divide-banyan-800/12 border-y border-banyan-800/12">
              {DESIGNATIONS.map((item) => (
                <div
                  key={item.school}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                >
                  <dt className="font-display text-lg font-semibold text-banyan-900">
                    {item.role}
                  </dt>
                  <dd className="text-[0.9375rem] text-ink-muted">
                    {item.school}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
              Dr. Preeti Bakshi leads both CBSE campuses of the Seedling Group,
              holding a single academic standard across the schools that carry a
              student from Class I through to the board years.
            </p>
          </div>

          <figure className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-banyan-800/8">
              <Image
                src="/people/preeti.png"
                alt="Dr. Preeti Bakshi"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
