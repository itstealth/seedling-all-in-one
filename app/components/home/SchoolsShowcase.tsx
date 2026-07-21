import Image from 'next/image'

const SCHOOLS = [
  {
    name: 'SPS',
    logoSrc: '/logos/sps-logo.png',
    logoAlt: 'SPS logo',
    description: 'The foundation years — early learning that builds curiosity and confidence.',
    href: 'https://sps.seedlingschools.com',
  },
  {
    name: 'SMHS',
    logoSrc: '/logos/smhs-logo.webp',
    logoAlt: 'SMHS logo',
    description: 'Middle and senior schooling that carries students toward board and career readiness.',
    href: 'https://smhs.seedlingschools.com',
  },
  {
    name: 'Cambridge',
    logoSrc: '/logos/cambridge-shield.webp',
    logoAlt: 'Cambridge shield logo',
    description: 'An internationally benchmarked Cambridge curriculum pathway.',
    href: 'https://seedling-international-academy.vercel.app',
  },
] as const

export default function SchoolsShowcase() {
  return (
    <section className="grid gap-8 px-6 py-16 md:grid-cols-3 md:px-12">
      {SCHOOLS.map((school) => (
        <div
          key={school.name}
          className="flex flex-col items-center rounded-2xl border border-gray-200 p-8 text-center"
        >
          <div className="relative h-16 w-40">
            <Image
              src={school.logoSrc}
              alt={school.logoAlt}
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-6 text-sm text-gray-600">{school.description}</p>
          <a
            href={school.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-sm font-semibold underline"
          >
            Visit {school.name}
          </a>
        </div>
      ))}
    </section>
  )
}
