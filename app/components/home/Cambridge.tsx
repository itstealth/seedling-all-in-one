import Image from "next/image";
import { LINKS, external } from "./links";

export default function Cambridge() {
  return (
    <section className="bg-paper-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4">
              <span className="relative h-14 w-12 shrink-0">
                <Image
                  src="/logos/cambridge-shield.webp"
                  alt="Cambridge International shield"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </span>
              <p className="eyebrow text-banyan-600">
                Cambridge International
              </p>
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-banyan-900 sm:text-4xl">
              The international route, taught at home.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Seedling International Academy runs the Cambridge curriculum in
              Ghaziabad — the same qualification recognised by universities in
              more than fifty countries, without sending a fourteen-year-old
              abroad to get it.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-banyan-800/12 pt-7">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Qualification
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-banyan-900">
                  IGCSE &amp; A Level
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Recognised in
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-banyan-900">
                  50+ nations
                </dd>
              </div>
            </dl>

            <a
              href={LINKS.cambridge}
              {...external}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-banyan-800 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-banyan-700"
            >
              Explore the Cambridge campus
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="/campus/sia-collage.webp"
                alt="Students at Seedling International Academy"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/campus/cambridge-building.jpg"
                alt="Cambridge, United Kingdom"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/campus/science-lab.jpg"
                alt="Science laboratory at the Cambridge campus"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
