import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Benefits from './components/Benefits'
import Machines from './components/Machines'
import Statistics from './components/Statistics'
import DemoDashboard from './components/DemoDashboard'
import Technology from './components/Technology'
import VideoGallery from './components/VideoGallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        {/* BLOQUE 1 — COMERCIAL */}
        <Hero />
        <About />
        <Benefits />
        {/* BLOQUE 2 — TECNOLÓGICO */}
        <Machines />
        <Statistics />
        <DemoDashboard />
        <Technology />
        {/* BLOQUE 3 — AUDIOVISUAL */}
        <VideoGallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
