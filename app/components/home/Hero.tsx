import Image from "next/image";

const STATS = [
  { figure: "20,000+", label: "Students" },
  { figure: "15:1", label: "Student–teacher ratio" },
  { figure: "5,000+", label: "Alumni network" },
  { figure: "50+", label: "Nations" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-indigo-900">
      {/* Campus photograph, dimmed to let the type carry the page */}
      <div className="absolute inset-0">
        <Image
          src="/campus/about-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="drift object-cover opacity-25"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-900/85 to-indigo-900"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-24">
        <div className="hero-seq mx-auto flex flex-col items-center">
          <p className="eyebrow flex items-center gap-3 text-marigold-400">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            Jaipur · Established 1992
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
          </p>

          <h1 className="mt-6 font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-paper-50 sm:text-5xl lg:text-6xl">
            The Journey From Nursery
            <br />{" "}
            <span className="text-marigold-400">to University</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-200">
            One group, five institutions, and a single unbroken path — from
            playgroup through Class XII, across CBSE and Cambridge, and out
            into the world.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#schools"
              className="rounded-full bg-indigo-800 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-700"
            >
              Find the right school
            </a>
          </div>

          {/* Provenance figures, set as data rather than decoration. */}
          <dl className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-paper-200/15 pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="mx-auto max-w-[9rem]">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-paper-50 lg:text-4xl">
                    {stat.figure}
                  </span>
                  <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-paper-200/70">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
