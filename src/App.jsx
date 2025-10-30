import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/testimonials.css'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import ServicesSection from './components/sections/ServicesSection.jsx'
import TestimonialsSection from './components/sections/TestimonialsSection.jsx'
import LecturesSection from './components/sections/LecturesSection.jsx'
import { StickyCardsDemo } from './components/common/StickyCards.jsx'
import CustomCursor from './components/common/CustomCursor.jsx'
import TrustedBy from './components/sections/TrustedBy.jsx'
import SpeakingSection from './components/sections/SpeakingSection.jsx'
import Newsletter from './components/sections/Newsletter.jsx'
import SocialBar from './components/common/SocialBar.jsx'
import Footer from './components/layout/Footer.jsx'
import Story from './components/sections/Story.jsx'
import Projects from './components/sections/Projects.jsx'
import Contact from './components/sections/Contact.jsx'

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
