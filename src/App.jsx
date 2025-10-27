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

function App() {
  return (
    <>
      <Hero />
      <About />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
    </>
  )
}

export default App
