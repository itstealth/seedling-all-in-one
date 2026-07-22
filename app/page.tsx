import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import Journey from './components/home/Journey'
import SchoolsShowcase from './components/home/SchoolsShowcase'
import Cambridge from './components/home/Cambridge'
import Pillars from './components/home/Pillars'
import DirectorMessage from './components/home/DirectorMessage'
import VisionMission from './components/home/VisionMission'
import Leadership from './components/home/Leadership'
import AlumniSpotlight from './components/home/AlumniSpotlight'
import Footer from './components/home/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Journey />
        <SchoolsShowcase />
        <Cambridge />
        <Pillars />
        <DirectorMessage />
        <VisionMission />
        <Leadership />
        <AlumniSpotlight />
      </main>
      <Footer />
    </>
  )
}
