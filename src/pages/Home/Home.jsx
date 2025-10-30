import Hero from '../../components/sections/Hero.jsx'
import About from '../../components/sections/About.jsx'
import ServicesSection from '../../components/sections/ServicesSection.jsx'
import { StickyCardsDemo } from '../../components/common/StickyCards.jsx'
import TrustedBy from '../../components/sections/TrustedBy.jsx'
import TestimonialsSection from '../../components/sections/TestimonialsSection.jsx'
import LecturesSection from '../../components/sections/LecturesSection.jsx'
import SpeakingSection from '../../components/sections/SpeakingSection.jsx'
import Newsletter from '../../components/sections/Newsletter.jsx'
import SocialBar from '../../components/common/SocialBar.jsx'
import Footer from '../../components/layout/Footer.jsx'

export default function Home() {
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
