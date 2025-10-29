import { Routes, Route } from 'react-router-dom'
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
import { StickyCardsDemo } from './components/StickyCards.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import TrustedBy from './components/TrustedBy.jsx'
import SpeakingSection from './components/SpeakingSection.jsx'
import Newsletter from './components/Newsletter.jsx'
import SocialBar from './components/SocialBar.jsx'
import Footer from './components/Footer.jsx'
import Story from './components/Story.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ServicesSection />
      <StickyCardsDemo />
      <TrustedBy />
      <TestimonialsSection />
      <LecturesSection />
      <SpeakingSection />
      <Newsletter />
      <SocialBar />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
