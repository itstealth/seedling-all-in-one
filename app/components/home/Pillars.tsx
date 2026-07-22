const PILLARS = [
  {
    title: "Aligned with the National Education Policy",
    body: "Curriculum and assessment mapped to the NEP, not retrofitted to it.",
  },
  {
    title: "State-of-the-art facilities",
    body: "Modern classrooms, science and computing labs, and outdoor space at every campus.",
  },
  {
    title: "Technology-integrated teaching",
    body: "Interactive boards and digital coursework used where they add something, not everywhere.",
  },
  {
    title: "Experiential learning",
    body: "Hands-on work that asks students to test an idea rather than memorise it.",
  },
  {
    title: "An honest feedback loop",
    body: "Timely, specific feedback to students and a direct line to parents.",
  },
  {
    title: "Well-being of every stakeholder",
    body: "Academic, emotional, social and physical growth treated as one brief.",
  },
];

export default function Pillars() {
  return (
    <section className="bg-banyan-900 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-marigold-400">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            What holds it together
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-paper-50 sm:text-4xl lg:text-5xl">
            Six commitments, kept across every campus.
          </h2>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="border-t border-paper-200/15 pt-6"
            >
              <h3 className="font-display text-lg font-semibold leading-snug text-paper-50">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-paper-200/75">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
