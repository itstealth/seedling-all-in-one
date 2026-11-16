import type { Metadata } from "next";
import Nav from "../components/home/Nav";
import Footer from "../components/home/Footer";
export const metadata: Metadata = {
  title: "Careers at Seedling Group of Schools", description: "Explore teaching and school careers at Seedling schools in Jaipur. Contact the CBSE or Cambridge school teams about current opportunities.",
  alternates: { canonical: "https://seedlingschools.com/career" },
  openGraph: { title: "Careers at Seedling Group of Schools", description: "Explore teaching and school careers at Seedling schools in Jaipur. Contact the CBSE or Cambridge school teams about current opportunities.", url: "https://seedlingschools.com/career", images: ["/og-group-campus.jpg"] },
  twitter: { card: "summary_large_image", title: "Careers at Seedling Group of Schools", description: "Explore teaching and school careers at Seedling schools in Jaipur. Contact the CBSE or Cambridge school teams about current opportunities.", images: ["/og-group-campus.jpg"] },
};
export default function Page() { return <><Nav /><main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20"><h1 className="font-display text-4xl font-semibold text-indigo-900">Careers at Seedling Group of Schools</h1><p className="my-8 max-w-2xl text-lg leading-relaxed text-ink-muted">Explore opportunities with our school teams. Visit the relevant school’s careers page for current openings and application details.</p><ul className="mt-8 space-y-4"><li><a className="underline" href="https://sps.seedlingschools.com/career">Seedling Public School careers</a></li><li><a className="underline" href="https://smhs.seedlingschools.com/career">Seedling Modern High School careers</a></li><li><a className="underline" href="https://cambridge.seedlingschools.com/career">SIA &amp; SMIA careers</a></li></ul></main><Footer /></>; }
