export default function Hero() {
  return (
    <section className="px-6 py-16 text-center md:px-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        The Journey From Nursery to University
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
        Seedling Group of Schools takes every child through a single,
        connected path — from SPS, to SMHS, to the Cambridge programme —
        under one educational vision.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://sps.seedlingschools.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          Explore SPS
        </a>
        <a
          href="https://smhs.seedlingschools.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black px-6 py-3 text-sm font-semibold"
        >
          Explore SMHS
        </a>
        <a
          href="https://seedling-international-academy.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black px-6 py-3 text-sm font-semibold"
        >
          Explore Cambridge
        </a>
      </div>
    </section>
  )
}
