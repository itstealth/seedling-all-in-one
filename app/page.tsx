import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import SchoolsShowcase from './components/home/SchoolsShowcase'
import Journey from './components/home/Journey'
import DirectorMessage from './components/home/DirectorMessage'
import Principal from './components/home/Principal'
import AlumniSpotlight from './components/home/AlumniSpotlight'
import GroupCta from './components/home/GroupCta'
import Footer from './components/home/Footer'
import MobileActionBar, { MOBILE_BAR_SPACER } from './components/home/MobileActionBar'
import OrganizationJsonLd from './components/home/OrganizationJsonLd'
import type { Metadata } from 'next'
import { canonicalFor } from './site-metadata'

// Title and description come from the root layout.
export const metadata: Metadata = {
  ...canonicalFor('/'),
}

export default function Page() {
  return (
    <>
      <OrganizationJsonLd />
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
        <GroupCta />
      </main>
      <Footer />
      {/* Keeps the end of the footer clear of the phone-only action bar. */}
      <div className={`${MOBILE_BAR_SPACER} bg-indigo-950 md:hidden`} aria-hidden="true" />
      <MobileActionBar />
    </>
  )
}
