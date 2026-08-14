const STAGES = [
  {
    stage: "Play group – KG",
    name: "Seedling Wonderland Kids League",
    board: "Early years",
    note: "First classrooms, first friendships. Play-led learning that makes school somewhere a child wants to be.",
  },
  {
    stage: "Class I – XII",
    name: "Seedling Public School",
    board: "CBSE",
    note: "The foundation years, where reading, reasoning and curiosity are built into daily habit.",
  },
  {
    stage: "Class I – XII",
    name: "Seedling Modern High School",
    board: "CBSE",
    note: "Senior schooling with board preparation, streams and the beginnings of a career direction.",
  },
  {
    stage: "Class I – XII",
    name: "Seedling International Academy",
    board: "Cambridge",
    note: "An internationally benchmarked route for families planning study abroad.",
  },
  {
    stage: "Class I – XII",
    name: "Seedling Modern International Academy",
    board: "Cambridge",
    note: "A second Cambridge campus in Durgapura, extending the international route.",
  },
  {
    stage: "Beyond school",
    name: "University, and what follows",
    board: "50+ nations",
    note: "Alumni in engineering, defence, design and enterprise across the world.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="bg-paper-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal>
          <p className="eyebrow flex items-center gap-3 text-marigold-500">
            <span className="h-px w-8 bg-marigold-500" aria-hidden="true" />
            The through-line
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-snug tracking-tight text-indigo-900 sm:text-4xl lg:text-5xl">
            A child joins us at three. We are still here at eighteen.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Most families change schools two or three times. Within the Seedling
            Group, each stage hands over to the next — same standards, same
            people, no restarting.
          </p>
        </div>

        {/* The spine: a continuous line the stages hang from */}
        <ol className="relative mt-14 lg:mt-20" data-reveal-group>
          <div
            className="spine-line absolute left-[0.4375rem] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-marigold-500 via-indigo-500 to-indigo-800/20 lg:left-1/2"
            aria-hidden="true"
          />

          {STAGES.map((item, index) => (
            <li
              key={item.name}
              className={`relative pb-12 pl-9 last:pb-0 lg:w-1/2 lg:pl-0 ${
                index % 2 === 0
                  ? "lg:pr-14 lg:text-right"
                  : "lg:ml-auto lg:pl-14"
              }`}
            >
              <span
                className={`absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-marigold-500 bg-paper-50 ${
                  index % 2 === 0
                    ? "lg:left-auto lg:-right-[0.4375rem]"
                    : "lg:-left-[0.4375rem]"
                }`}
                aria-hidden="true"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                {item.stage}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-indigo-900 lg:text-2xl">
                {item.name}
              </h3>
              <p className="mt-1.5 inline-block rounded-full bg-indigo-800/8 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-indigo-700">
                {item.board}
              </p>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted lg:inline-block">
                {item.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
