import Link from "next/link";
import type { Metadata } from "next";
import Nav from "../components/home/Nav";
import Footer from "../components/home/Footer";
export const metadata: Metadata = {
  title: "Seedling Wonderland Kids League", description: "Explore early learning at Seedling Wonderland Kids League and contact the admissions team for current age groups, availability and campus details.",
  alternates: { canonical: "https://seedlingschools.com/wonderland" },
  openGraph: { title: "Seedling Wonderland Kids League", description: "Explore early learning at Seedling Wonderland Kids League and contact the admissions team for current age groups, availability and campus details.", url: "https://seedlingschools.com/wonderland", images: ["/og-group-campus.jpg"] },
  twitter: { card: "summary_large_image", title: "Seedling Wonderland Kids League", description: "Explore early learning at Seedling Wonderland Kids League and contact the admissions team for current age groups, availability and campus details.", images: ["/og-group-campus.jpg"] },
};
export default function Page() { return <><Nav /><main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20"><h1 className="font-display text-4xl font-semibold text-indigo-900">Seedling Wonderland Kids League</h1><p className="my-8 max-w-2xl text-lg leading-relaxed text-ink-muted">Seedling Wonderland Kids League is the group’s early years offering. Contact our admissions team to discuss your child’s age, the current programmes and campus availability.</p><Link className="underline text-indigo-800" href="/#enquire">Enquire about early years</Link></main><Footer /></>; }
