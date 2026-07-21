const LEADERS = [
  {
    name: 'Dr. Sandeep Bakshi',
    designation: 'CEO & Director, Seedling Group of Institutions',
  },
  {
    name: 'Dr. Preeti Bakshi',
    designation: 'Executive Director, Seedling Group of Institutions',
  },
] as const

export default function Leadership() {
  return (
    <section className="px-6 py-16 md:px-12">
      <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
        Our Leadership
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {LEADERS.map((leader) => (
          <div
            key={leader.name}
            className="rounded-2xl border border-gray-200 p-8 text-center"
          >
            <p className="text-lg font-semibold">{leader.name}</p>
            <p className="mt-2 text-sm text-gray-600">{leader.designation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
