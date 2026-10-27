import Image from "next/image";
import { BASE_PATH, LINKS, external } from "./links";

const ALUMNI = [
  {
    name: "Harshil Mathur",
    title: "CEO, Razorpay",
    photo: `${BASE_PATH}/people/harshil-portrait.png`,
  },
  {
    name: "Abhishek Tripathi",
    title: "Wing Commander",
    photo: `${BASE_PATH}/people/abhishek-portrait.png`,
  },
  {
    name: "Shashank Jain",
    title: "Head of Architecture & Design",
    photo: `${BASE_PATH}/people/shashank-portrait.png`,
  },
] as const;

export default function AlumniSpotlight() {
  return (
    <section id="alumni" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-marigold-500">
              <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
              Community · Connection · Collaboration
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-indigo-900 sm:text-4xl lg:text-5xl">
              The Pride of Seedling
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Five thousand alumni, across fifty nations — in enterprise, in
              uniform, in design studios.
            </p>
          </div>

          <a
            href={LINKS.alumni}
            {...external}
            className="group inline-flex items-center gap-2 rounded-full border border-indigo-800/20 px-5 py-3 text-sm font-semibold text-indigo-800 transition-colors hover:border-indigo-700 hover:bg-indigo-800 hover:text-paper-50"
          >
            See more alumni
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:mt-16" data-reveal-group>
          {ALUMNI.map((alum) => (
            <figure
              key={alum.name}
              className="rounded-2xl border border-indigo-800/10 bg-paper-50 p-8 text-center shadow-sm"
            >
              <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-full bg-indigo-800/8 ring-4 ring-marigold-500">
                <Image
                  src={alum.photo}
                  alt={alum.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-6">
                <p className="font-display text-lg font-semibold text-indigo-900">
                  {alum.name}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{alum.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
