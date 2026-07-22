import Image from "next/image";
import { LINKS, external } from "./links";

export default function DirectorMessage() {
  return (
    <section className="bg-banyan-950 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-banyan-900">
              <Image
                src="/people/sandeep.png"
                alt="Dr. Sandeep Bakshi"
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-5">
              <p className="font-display text-xl font-semibold text-paper-50">
                Dr. Sandeep Bakshi
              </p>
              <p className="mt-1.5 text-sm text-paper-200/70">
                CEO &amp; Director, Seedling Group of Institutions
              </p>
            </figcaption>
          </figure>

          <div>
            <p className="eyebrow flex items-center gap-3 text-marigold-400">
              <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
              Director&rsquo;s communiqué
            </p>

            <blockquote className="mt-7">
              <p className="font-display text-2xl font-medium leading-snug text-paper-50 lg:text-[1.75rem]">
                “To make education monumentally effective, we must teach young
                people to grow their own plants rather than giving them cut
                flowers.”
              </p>
            </blockquote>

            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-paper-200/80">
              <p>
                Dr. Sandeep Bakshi has led the Seedling Group as CEO &amp;
                Director, carrying forward the institution founded by the late
                Ms. Mohini Bakshi and expanding it into a complete educational
                umbrella — play group through Class XII, on both CBSE and
                Cambridge.
              </p>
              <p>
                On the years after the pandemic, he writes of the chance
                &ldquo;to begin to rewrite the narrative of school and to make
                it more relevant to the realities of the world today&rdquo; —
                a school where learning happens{" "}
                <span className="text-paper-100">
                  not out of a text book or worksheet, but through contextual
                  and real life problem solving
                </span>
                .
              </p>
              <p className="font-display text-lg font-medium text-marigold-300">
                “From Play Group to University — your child, in our care, is
                promised a world of opportunities, memories and milestones.”
              </p>
            </div>

            <a
              href={LINKS.about}
              {...external}
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-marigold-400 transition-colors hover:text-marigold-300"
            >
              Read the full communiqué
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
