import Link from "next/link";
import type { Metadata } from "next";
import Nav from "../components/home/Nav";
import Footer from "../components/home/Footer";
const title = "Admissions | Seedling Group of Schools";
const description = "Explore admissions at four Seedling schools in Jaipur. Choose a CBSE or Cambridge pathway, enquire with the school team or apply online.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "https://seedlingschools.com/admissions" },
  openGraph: { title, description, url: "https://seedlingschools.com/admissions", images: ["/og-group-campus.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-group-campus.jpg"] },
};
const schools = [
  ["Seedling Public School · CBSE", "https://sps.seedlingschools.com/admissions"],
  ["Seedling Modern High School · CBSE", "https://smhs.seedlingschools.com/admissions"],
  ["Seedling International Academy · Cambridge", "https://cambridge.seedlingschools.com/campuses/sia"],
  ["Seedling Modern International Academy · Cambridge", "https://cambridge.seedlingschools.com/campuses/smia"],
];
export default function AdmissionsPage() {
  return <><Nav /><main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20">
    <h1 className="font-display text-4xl font-semibold text-indigo-900">Admissions at Seedling</h1>
    <p className="my-8 max-w-2xl text-lg leading-relaxed text-ink-muted">Choose your school to explore its admissions process. Our team can help with current class availability, eligibility, fees and campus visits.</p>
    <ul className="space-y-4">{schools.map(([name, href]) => <li key={name}><Link className="underline text-indigo-800" href={href}>{name}</Link></li>)}</ul>
    <div className="mt-10 flex flex-wrap gap-6"><Link className="rounded-full bg-indigo-800 px-6 py-3 text-white" href="/admissions/apply">Apply online</Link><Link className="py-3 underline text-indigo-800" href="/#enquire">Ask the admissions team</Link></div>
  </main><Footer /></>;
}
