import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timelineData, timelineSummary } from '../../data/timelineData'
import './story.css'

gsap.registerPlugin(ScrollTrigger)

function KeepConnectedForm() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('success')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="keep-connected">
      <div className="keep-connected-content">
        <h2 className="keep-connected-title">LET'S KEEP CONNECTED</h2>
        <p className="keep-connected-text">
          Fill in the form below to stay up-to-date with the latest news, insights and updates from Muhammed Mekky.
        </p>
        
        <form className="keep-connected-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
              className="form-input"
            />
          </div>
          
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="form-input form-input-full"
          />
          
          <button type="submit" className="form-submit">
            SUBSCRIBE
          </button>
          
          {status === 'success' && (
            <p className="form-success">✓ Thanks for subscribing!</p>
          )}
        </form>
      </div>
    </div>
  )
}

function TimelineSection() {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return

    const line = lineRef.current
    const timeline = timelineRef.current

    gsap.fromTo(line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  // Show all timeline data with real images
  const getImagePath = (title) => {
    const imageMap = {
      'Born': 'BORN.png',
      'Marketing Representative': 'Content Creator.png',
      'Digital Marketing Trainee': 'Digital Marketing Trainee.png',
      'Diploma in Commerce': 'Diploma in Commerce.png',
      'Content Creator (Philogimia)': 'Content Creator.png',
      'Social Media Specialist (Curva Sportswear)': 'Social Media Specialist.png',
      'Media Buyer (Center Eltekya)': 'Media Buyer (Center Eltekya.png',
      'Media Buyer (Asl-Alhaloub)': 'Media Buyer (Asl-Alhaloub.png',
      'Content Creator & Planner (The Glocal)': 'Content Creator & Planner (The Glocal.png',
      'Marketing Operations Manager (Scarpe)': 'Marketing Operations Manager (Scarpe.png',
      'Personal Branding Content Creator (Qudraat – Dr. Muhammed Harby)': 'Personal Branding Content Creator.png',
      'Shopify Developer (Forbed)': 'Shopify Developer.png',
      'Content Strategy & Media Buyer (Cabalo)': 'Content Strategy & Media Buyer.png',
      'AI Specialist (Qudraat)': 'AI Specialist (Qudraat.png',
      'Automation Specialist (Ausrah)': 'Automation Specialist (Ausrah.png',
      'Social Media Specialist (Qudraat)': 'Social Media Specialist (Qudraat.png',
      'Event Planner (Youth Qudraat)': 'Event Planner (Youth Qudraat.png',
      'AI & Automation Internship (Qudraat)': 'AI & Automation Internship (Qudraat.png'
    }
    return imageMap[title] || 'Content Creator.png'
  }

  const events = timelineData.map((item, index) => ({
    year: item.date.split(' ')[1] || item.date.split(' ')[0],
    title: item.title.toUpperCase(),
    location: item.location,
    description: item.description,
    image: `/images/Timeline/${getImagePath(item.title)}`,
    side: index % 2 === 0 ? 'left' : 'right'
  }))

  return (
    <div ref={timelineRef} className="interactive-timeline">
      <motion.div 
        className="timeline-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="timeline-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0 }}
        >
          Every chapter <span className="timeline-highlight">left a mark</span>.
        </motion.h2>
        <div className="timeline-divider"></div>
        <motion.p 
          className="timeline-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Here's how it all unfolded — one spark at a time.
        </motion.p>
      </motion.div>
      
      <div className="timeline-line-wrapper">
        <div ref={lineRef} className="timeline-line" />
      </div>
      
      {events.map((event, index) => (
        <motion.div
          key={`${event.year}-${index}`}
          className={`timeline-event ${event.side}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          <div className="timeline-year-marker">{event.year}</div>
          
          <div className="timeline-event-content">
            <div className="timeline-image">
              <img src={event.image} alt={event.title} />
            </div>
            
            <div className="timeline-text">
              <h3 className="timeline-event-title">{event.title}</h3>
              <div className="timeline-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {event.location}
              </div>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}


export default function Story() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const storyContentRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storyContentRef,
    offset: ["start end", "end start"]
  })

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const textSections = document.querySelectorAll('.story-text-section')
    
    textSections.forEach((section) => {
      gsap.fromTo(section,
        { filter: 'blur(5px)', opacity: 0.5 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      )
      
      gsap.fromTo(section,
        { filter: 'blur(0px)', opacity: 1 },
        {
          filter: 'blur(5px)',
          opacity: 0.5,
          scrollTrigger: {
            trigger: section,
            start: 'bottom 60%',
            end: 'bottom 30%',
            scrub: 0.5,
          }
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div ref={containerRef} className="story-page">
      <motion.section 
        ref={heroRef}
        className="story-hero"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <div className="story-hero-content">
          <h1 className="story-hero-title">MEKKY'S STORY</h1>
          <p className="story-hero-subtitle">From curiosity to creation</p>
        </div>
        <div className="story-hero-image">
          <img src="/images/story/hero.jpg" alt="Muhammed Mekky" />
        </div>
      </motion.section>

      <section ref={storyContentRef} className="story-content">
        <div className="story-parallax-container">
          <div className="story-fixed-image">
            <img src="/images/story/main-story.jpg" alt="Mekky's Journey" />
          </div>
          
          <div className="story-text-sections">
            <div className="story-text-section">
              <h2 className="story-chapter-title">THE BEGINNING</h2>
              <p className="story-text">
                It all started with a frustration.
              </p>
              <p className="story-text">
                Marketing felt broken — repetitive, time-consuming, and soulless. I wanted to make marketing smarter, faster, and, most importantly, more human.
              </p>
              <p className="story-text">
                Back then, I was just another marketer juggling endless campaigns and spreadsheets. But curiosity pushed me deeper. What if technology could handle the grind so people could focus on creativity and connection?
              </p>
              <p className="story-text">
                That question became an obsession — late nights, failed experiments, and endless cups of coffee — until I started building automation systems that worked with people, not instead of them.
              </p>
            </div>

            <div className="story-text-section">
              <h2 className="story-chapter-title">THE BREAKTHROUGH</h2>
              <p className="story-text">
                The turning point came when I realized automation isn't just about efficiency — it's about empowerment.
              </p>
              <p className="story-text">
                When marketers and teams stopped wasting time on repetitive work, something amazing happened: creativity flourished. Strategy got sharper. Results got bigger.
              </p>
              <p className="story-text">
                That's when I started sharing what I'd learned — first with small teams, then startups, then major companies. Each project taught me something new, each workshop opened new perspectives.
              </p>
              <p className="story-text">
                Today, I help entrepreneurs, marketers, and organizations design systems that think, freeing them to do what humans do best — imagine, create, and grow.
              </p>
            </div>

            <div className="story-text-section">
              <h2 className="story-chapter-title">THE MISSION</h2>
              <p className="story-text">
                My work now is about scaling that impact.
              </p>
              <p className="story-text">
                I train people and build frameworks that merge human creativity with intelligent automation — helping teams move from chaos to clarity, from manual to meaningful.
              </p>
              <p className="story-text">
                Whether I'm working with a founder on their first funnel or training a corporate team on marketing automation strategy, my mission stays the same:
              </p>
              <p className="story-text">
                to make marketing feel less mechanical and more magical.
              </p>
            </div>

            <div className="story-text-section">
              <h2 className="story-chapter-title">THE FUTURE</h2>
              <p className="story-text">
                I believe the next generation of marketing won't be about more tools — it'll be about better humans using better systems.
              </p>
              <p className="story-text">
                And I'm here to help shape that shift — one workshop, one strategy, one bold idea at a time.
              </p>
            </div>
          </div>
        </div>
        
        <div className="story-grid">

          {/* Timeline Section */}
          <TimelineSection />
        </div>

        <div className="story-cta">
          <h2 className="story-cta-title">You’ve seen the story</h2>
          <p className="story-cta-text">Ready to transform your marketing with AI-driven systems?</p>
          <a href="/contact" className="story-cta-button">
            Get In Touch
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        {/* Let's Keep Connected */}
        <KeepConnectedForm />
      </section>
    </div>
  )
}
