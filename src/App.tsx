import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { AreasMarquee } from './components/AreasMarquee'
import { Services } from './components/Services'
import { WellDiagram } from './components/WellDiagram'
import { Rigs } from './components/Rigs'
import { Calculator } from './components/Calculator'
import { Steps } from './components/Steps'
import { Works } from './components/Works'
import { FAQ } from './components/FAQ'
import { LeadForm } from './components/LeadForm'
import { Footer, MobileBar } from './components/Footer'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const [prefill, setPrefill] = useState('')
  useReveal()
  return (
    <div id="top" className="flex flex-col bg-page">
      <div className="min-h-[100svh] flex flex-col overflow-hidden relative">
        <Navbar />
        <Hero />
      </div>
      <Intro />
      <AreasMarquee />
      <Services />
      <WellDiagram />
      <Rigs />
      <Calculator onRequest={setPrefill} />
      <Steps />
      <Works />
      <FAQ />
      <LeadForm prefill={prefill} />
      <Footer />
      <MobileBar />
    </div>
  )
}
