const ALUMNI = [
  { name: 'Harshil Mathur', title: 'CEO, Razorpay' },
  { name: 'Abhishek Tripathi', title: 'Wing Commander' },
  { name: 'Shashank Jain', title: 'Head of Architecture & Design' },
] as const

export default function AlumniSpotlight() {
  return (
    <section className="px-6 py-16 text-center md:px-12">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        The Pride of Seedling
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {ALUMNI.map((alum) => (
          <div key={alum.name} className="rounded-2xl border border-gray-200 p-8">
            <p className="text-lg font-semibold">{alum.name}</p>
            <p className="mt-2 text-sm text-gray-600">{alum.title}</p>
          </div>
        ))}
      </div>
      <a
        href="https://seedlingschools.com/alumni.php"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block text-sm font-semibold underline"
      >
        See more alumni
      </a>
    </section>
  )
}
