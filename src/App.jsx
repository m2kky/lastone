import './App.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/projects.css'
import './styles/testimonials.css'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import LecturesSection from './components/LecturesSection.jsx'
import StickyCards, { StickyCardsDemo } from './components/StickyCards.jsx'

function App() {
  return (
    <>
      <Hero />
      <About />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <LecturesSection />
      {/* StickyCards demo section; replace with <StickyCards cards={...} /> as needed */}
      <StickyCardsDemo />
    </>
  )
}

export default App
