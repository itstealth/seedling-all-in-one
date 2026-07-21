import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import SchoolsShowcase from './components/home/SchoolsShowcase'
import Leadership from './components/home/Leadership'
import AlumniSpotlight from './components/home/AlumniSpotlight'
import Footer from './components/home/Footer'

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <SchoolsShowcase />
      <Leadership />
      <AlumniSpotlight />
      <Footer />
    </main>
  )
}
