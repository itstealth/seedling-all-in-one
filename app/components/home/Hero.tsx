import Image from "next/image";

const STATS = [
  { figure: "20,000+", label: "Students" },
  { figure: "15:1", label: "Student–teacher ratio" },
  { figure: "5,000+", label: "Alumni network" },
  { figure: "50+", label: "Nations" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-banyan-900">
      {/* Campus photograph, dimmed to let the type carry the page */}
      <div className="absolute inset-0">
        <Image
          src="/campus/about-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-banyan-950/80 via-banyan-900/85 to-banyan-900"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28">
        <p className="eyebrow flex items-center gap-3 text-marigold-400">
          <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
          Ghaziabad · Established 1992
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-paper-50 sm:text-6xl lg:text-7xl">
          The Journey From Nursery
          <br className="hidden sm:block" />{" "}
          <span className="text-marigold-400">to University</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper-200">
          One group, five institutions, and a single unbroken path — play group
          through Class XII, on CBSE and Cambridge, and out into the world.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#journey"
            className="rounded-full bg-marigold-500 px-6 py-3.5 text-sm font-semibold text-banyan-950 transition-colors hover:bg-marigold-400"
          >
            Follow the journey
          </a>
          <a
            href="#schools"
            className="rounded-full border border-paper-200/30 px-6 py-3.5 text-sm font-semibold text-paper-100 transition-colors hover:border-paper-200/60 hover:bg-paper-50/5"
          >
            Find the right school
          </a>
        </div>

        {/* Provenance figures, set as data rather than decoration */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper-200/15 pt-9 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
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
    </section>
  );
}
