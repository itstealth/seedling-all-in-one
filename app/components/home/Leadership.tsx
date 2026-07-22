import Image from "next/image";

const LEADERS = [
  {
    name: "Late Ms. Mohini Bakshi",
    designation: "Founder Director",
    photo: "/people/mohini.png",
  },
  {
    name: "Dr. Sandeep Bakshi",
    designation: "CEO & Director, Seedling Group of Institutions",
    photo: "/people/sandeep.png",
  },
  {
    name: "Dr. Preeti Bakshi",
    designation: "Executive Director, Seedling Group of Institutions",
    photo: "/people/preeti.png",
  },
  {
    name: "Ms. Akansha Bakshi",
    designation: "Joint Director",
    photo: "/people/akansha.png",
  },
  {
    name: "Ms. Aishwarya Bakshi",
    designation: "Joint Director",
    photo: "/people/aishwarya.png",
  },
] as const;

export default function Leadership() {
  return (
    <section id="leadership" className="bg-paper-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-banyan-600">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            Our torchbearers
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-banyan-900 sm:text-4xl lg:text-5xl">
            Our Leadership
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            One family has run these schools since 1992 — which is why a
            standard set in the founding years still holds in the classrooms
            today.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
          {LEADERS.map((leader) => (
            <figure key={leader.name}>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-banyan-800/8">
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 1024px) 18vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-base font-semibold leading-snug text-banyan-900">
                  {leader.name}
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted">
                  {leader.designation}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
