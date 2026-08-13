import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import SchoolsShowcase from './components/home/SchoolsShowcase'
import Journey from './components/home/Journey'
import DirectorMessage from './components/home/DirectorMessage'
import Principal from './components/home/Principal'
import AlumniSpotlight from './components/home/AlumniSpotlight'
import GroupCta from './components/home/GroupCta'
import Footer from './components/home/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        {/* Seedling Group of Schools */}
        <Hero />
        {/* SPS — SMHS — Cambridge */}
        <SchoolsShowcase />
        {/* The journey from Nursery to University */}
        <Journey />
        {/* Dr. Sandeep Bakshi */}
        <DirectorMessage />
        {/* Dr. Preeti Bakshi */}
        <Principal />
        {/* Alumni */}
        <AlumniSpotlight />
        {/* The Admissions panel is hidden for now — each campus site carries its
            own admissions flow, and the group nav already routes there.
            components/home/Admissions.tsx is kept so it can be dropped back in. */}
        <GroupCta />
      </main>
      <Footer />
    </>
  )
}
