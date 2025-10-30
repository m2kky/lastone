import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../../styles/story.css'

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

  const events = [
    {
      year: '2017',
      title: 'THE SPARK',
      location: 'Cairo, Egypt',
      description: 'Started experimenting with marketing automation tools, discovering the power of AI-driven workflows that would change everything.',
      image: '/images/story/2017.jpg',
      side: 'left'
    },
    {
      year: '2019',
      title: 'FIRST BREAKTHROUGH',
      location: 'Remote',
      description: 'Delivered first major automation project, saving a startup 40+ hours per week. The moment I realized this was bigger than just efficiency.',
      image: '/images/story/2019.jpg',
      side: 'right'
    },
    {
      year: '2021',
      title: 'SCALING IMPACT',
      location: 'Multiple Cities',
      description: 'Launched workshop series, training 500+ professionals in AI-driven marketing systems. From individual projects to mass education.',
      image: '/images/story/2021.jpg',
      side: 'left'
    },
    {
      year: '2023',
      title: 'GLOBAL REACH',
      location: 'Worldwide',
      description: 'Worked with 50+ clients across 15 countries, delivering transformative marketing solutions that scaled businesses exponentially.',
      image: '/images/story/2023.jpg',
      side: 'right'
    },
    {
      year: '2024',
      title: 'THE FUTURE',
      location: 'Everywhere',
      description: 'Building the next generation of AI-powered marketing systems, one breakthrough at a time. The journey continues.',
      image: '/images/story/2024.jpg',
      side: 'left'
    }
  ]

  return (
    <div ref={timelineRef} className="interactive-timeline">
      <div className="timeline-line-wrapper">
        <div ref={lineRef} className="timeline-line" />
      </div>
      
      {events.map((event, index) => (
        <motion.div
          key={event.year}
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.story-text')
    
    paragraphs.forEach((p) => {
      const words = p.textContent.split(' ')
      p.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ')
      
      const wordElements = p.querySelectorAll('.word')
      
      gsap.fromTo(wordElements,
        { opacity: 0.3 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: p,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
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

      <section className="story-content">
        <div className="story-grid">
          <div className="story-chapter">
            <div className="story-text-block">
              <h2 className="story-chapter-title">The Beginning</h2>
              <p className="story-text">
                It started with a simple question: How can we make marketing smarter, faster, and more human? 
                Seven years ago, I was just another marketer drowning in repetitive tasks, wondering if there was a better way.
              </p>
              <p className="story-text">
                That curiosity led me down a rabbit hole of automation tools, AI experiments, and countless late nights 
                building systems that didn't exist yet. I wasn't trying to replace humans—I was trying to free them.
              </p>
            </div>
            <motion.div 
              className="story-image-block"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img src="/images/story/chapter1.jpg" alt="Early days" />
            </motion.div>
          </div>

          <div className="story-chapter reverse">
            <motion.div 
              className="story-image-block"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img src="/images/story/chapter2.jpg" alt="Growth phase" />
            </motion.div>
            <div className="story-text-block">
              <h2 className="story-chapter-title">The Breakthrough</h2>
              <p className="story-text">
                The turning point came when I realized automation wasn't just about efficiency—it was about empowerment. 
                Teams could focus on strategy while systems handled execution. Creativity flourished when repetition disappeared.
              </p>
              <p className="story-text">
                I started sharing what I learned. First with small teams, then startups, then corporations. 
                Each workshop taught me something new. Each project pushed the boundaries of what was possible.
              </p>
            </div>
          </div>

          <div className="story-stats">
            <div className="story-stat">
              <span className="story-stat-value">7+</span>
              <span className="story-stat-label">Years Experience</span>
            </div>
            <div className="story-stat">
              <span className="story-stat-value">84+</span>
              <span className="story-stat-label">Projects Delivered</span>
            </div>
            <div className="story-stat">
              <span className="story-stat-value">50+</span>
              <span className="story-stat-label">Clients Worldwide</span>
            </div>
            <div className="story-stat">
              <span className="story-stat-value">3,000+</span>
              <span className="story-stat-label">People Trained</span>
            </div>
          </div>

          {/* Timeline Section */}
          <TimelineSection />
        </div>

        {/* Let's Keep Connected */}
        <KeepConnectedForm />

        <div className="story-cta">
          <h2 className="story-cta-title">Let's Build Something Together</h2>
          <p className="story-cta-text">Ready to transform your marketing with AI-driven systems?</p>
          <a href="/contact" className="story-cta-button">
            Get In Touch
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
