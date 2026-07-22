import Image from "next/image";

export default function VisionMission() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-3 text-banyan-600">
              <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
              Vision
            </p>

            {/* The group's vision is written in Sanskrit — set it in Devanagari */}
            <blockquote className="mt-7 border-l-2 border-marigold-500 pl-6">
              <p className="font-sanskrit text-2xl leading-relaxed text-banyan-900 lg:text-[1.75rem]">
                हस्ये नयतु नः ब्रह्मज्ञानं
              </p>
              <cite className="mt-2 block text-[0.9375rem] not-italic text-ink-muted">
                We aim at wisdom and the ability to comprehend.
              </cite>

              <p className="mt-6 font-sanskrit text-2xl leading-relaxed text-banyan-900 lg:text-[1.75rem]">
                उप नो सश्रा कृतवो यन्तु विश्रमः
              </p>
              <cite className="mt-2 block text-[0.9375rem] not-italic text-ink-muted">
                Open the doors from all sides, so that noble thoughts come in
                unhindered.
              </cite>
            </blockquote>

            <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-banyan-900 lg:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
              To provide a joyful learning environment that empowers students to
              reach their educational and personal potential while nurturing
              their self-confidence and self-esteem — developing children who
              are resilient and adaptable, across every intellectual, social,
              moral, spiritual, emotional and physical aspect.
            </p>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/campus/happy-parents.jpg"
                alt="Seedling students and families on campus"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-5 -left-5 max-w-[15rem] rounded-xl bg-marigold-500 p-5 shadow-lg">
              <p className="font-display text-lg font-semibold leading-snug text-banyan-950">
                “From Play Group to University — your child, in our care, is
                promised a world of opportunities.”
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
