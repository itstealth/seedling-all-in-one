import Image from "next/image";
import InquiryForm from "./InquiryForm";
import { BASE_PATH } from "./links";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-indigo-900">
      {/* Campus photograph, dimmed to let the type carry the page */}
      <div className="absolute inset-0">
        <Image
          src={`${BASE_PATH}/campus/about-banner.jpg`}
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

      <div className="relative mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="hero-seq">
            <p className="eyebrow flex items-center gap-3 text-paper-100">
              <span className="h-px w-8 bg-paper-100" aria-hidden="true" />
              Jaipur · Established 1992
            </p>

            <h1 className="mt-6 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-paper-50 sm:text-6xl lg:text-7xl">
              The Journey From Nursery
              <br className="hidden sm:block" />{" "}
              <span className="italic text-paper-100">to University</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper-200">
              One group, five institutions, and a single unbroken path — from
              playgroup through Class XII, across CBSE and Cambridge, and out
              into the world.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#schools"
                className="rounded-full bg-indigo-800 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-indigo-700"
              >
                Find the right school
              </a>
            </div>
          </div>

          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
