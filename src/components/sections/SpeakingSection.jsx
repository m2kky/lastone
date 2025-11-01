import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoModal from '../common/VideoModal.jsx'
import '../../styles/speaking.css'

export default function SpeakingSection() {
  const sectionRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [200, -200])
  const thumbnailY = useTransform(scrollYProgress, [0, 1], [-150, 150])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.08, 0.95])
  const thumbnailScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dataLayer?.push({ event: 'view_speaking_section' })
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleWatchClick = () => {
    setIsModalOpen(true)
    window.dataLayer?.push({ event: 'click_watch_highlight' })
  }

  const handleBookClick = () => {
    window.dataLayer?.push({ event: 'click_book_workshop' })
  }

  return (
    <section ref={sectionRef} className="speaking-section" role="region" aria-labelledby="speaking-title">
      <div className="speaking-bg">
        <img className="speaking-bg-image" src="/images/speaking/background.jpg" alt="" />
        <div className="speaking-overlay" />
        <div className="speaking-spotlight" />
      </div>

      <div className="speaking-container">
        <motion.div className="speaking-images" style={{ y: imageY, scale: imageScale }}>
          <div className="speaking-hero-image" onClick={handleWatchClick} role="button" tabIndex={0} aria-label="Watch speaking highlights">
            <img src="/images/speaking/speaker.jpg" alt="Muhammed Mekky speaking on stage" loading="lazy" />
            <div className="video-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Watch Highlights</span>
            </div>
            <div className="play-overlay">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="rgba(235, 94, 40, 0.9)" />
                <path d="M26 20L44 32L26 44V20Z" fill="white" />
              </svg>
            </div>
          </div>
          <motion.div className="speaking-thumbnail" style={{ y: thumbnailY, scale: thumbnailScale }}>
            <img src="/images/speaking/audience.jpg" alt="Engaged audience" loading="lazy" />
          </motion.div>
        </motion.div>

        <div className="speaking-content">
          <h2 id="speaking-title" className="speaking-title">
            SPEAKING<br />ENGAGEMENTS
          </h2>

          <p className="speaking-lead">
            Muhammed Mekky delivers keynotes and workshops that empower teams to design smarter, AI-driven marketing systems. With 7+ years across marketing, automation and AI workflows, he brings practical frameworks teams can implement immediately.
          </p>

          <p className="speaking-lead">
            Whether addressing startups, corporate teams, or university audiences, his sessions blend strategy with storytelling — turning complex systems into actionable, human-centered practices.
          </p>

          <div className="speaking-stats">
            <div className="stat-item">
              <span className="stat-value">+7</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Speaking Events</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">3,000+</span>
              <span className="stat-label">Professionals Trained</span>
            </div>
          </div>

          <div className="speaking-ctas">
            <a 
              href="/book-workshop" 
              className="cta-primary" 
              onClick={handleBookClick}
              aria-label="Book a workshop with Muhammed Mekky"
            >
              Book a Workshop
            </a>
            <a 
              href="/lectures" 
              className="cta-secondary"
              aria-label="View all speaking sessions"
            >
              View Sessions
            </a>
          </div>

          <blockquote className="speaking-testimonial">
            <p>"Muhammed's session restructured our team's approach to automation — from concept to delivery. Practical, clear and actionable."</p>
            <cite>— Dr. Samar Mahmoud., Marketing Manager</cite>
          </blockquote>
        </div>
      </div>

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        videoUrl="/video/herovid.mp4"
      />
    </section>
  )
}
