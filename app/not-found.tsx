import Link from "next/link";

const schools = [
  ["Seedling Public School (SPS)", "https://sps.seedlingschools.com"],
  ["Seedling Modern High School (SMHS)", "https://smhs.seedlingschools.com"],
  ["Seedling International Academy (SIA)", "https://cambridge.seedlingschools.com/campuses/sia"],
  ["Seedling Modern International Academy (SMIA)", "https://cambridge.seedlingschools.com/campuses/smia"],
];

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-20 text-center">
      <p className="eyebrow text-marigold-500">Seedling Group of Schools</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-indigo-900">Page not found</h1>
      <p className="mt-4 text-ink-muted">Try one of our school websites or return to the group homepage.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-4">
        {schools.map(([name, href]) => <li key={href}><a className="text-indigo-800 underline underline-offset-4" href={href}>{name}</a></li>)}
      </ul>
      <Link className="mt-8 inline-block rounded-full bg-indigo-800 px-6 py-3 text-white" href="/">Group homepage</Link>
      <a className="ml-4 inline-block text-indigo-800 underline underline-offset-4" href="/#enquire">Enquiry form</a>
    </main>
  );
}
