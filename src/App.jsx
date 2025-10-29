import './App.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/testimonials.css'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import LecturesSection from './components/LecturesSection.jsx'
import StickyCards, { StickyCardsDemo } from './components/StickyCards.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import TrustedBy from './components/TrustedBy.jsx'
import SpeakingSection from './components/SpeakingSection.jsx'
import SocialBar from './components/SocialBar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <About />
      <ServicesSection />
      {/* StickyCards demo section; replace with <StickyCards cards={...} /> as needed */}
      <StickyCardsDemo />
      <TrustedBy />
      <TestimonialsSection />
      <LecturesSection />
      <SpeakingSection />
      <SocialBar />
      <Footer />
    </>
  )
}

export default App
