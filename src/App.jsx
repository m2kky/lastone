import './App.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ServicesSection from './components/ServicesSection.jsx'

function App() {
  return (
    <>
      <Hero />
      <About />
      <ServicesSection />
    </>
  )
}

export default App
