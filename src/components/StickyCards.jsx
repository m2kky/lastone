import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './stickycards.css'

// Simple sticky stacked-cards section using GSAP + ScrollTrigger
// Props: cards: [{ id, image, alt, badge, title, subtitle }], className?: string
export default function StickyCards({ cards = [], className = '', tag, title, subtitle }) {
  const containerRef = useRef(null)
  const stackRef = useRef(null)
  const layerRefs = useRef([])

  useEffect(() => {
    if (!cards || cards.length === 0) return
    gsap.registerPlugin(ScrollTrigger)

    const images = layerRefs.current.filter(Boolean)
    if (!images[0]) return

    // initial state: first visible, others below
    gsap.set(images[0], { yPercent: 0, scale: 1, rotation: 0 })
    for (let i = 1; i < images.length; i++) {
      gsap.set(images[i], { yPercent: 100, scale: 1, rotation: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * (images.length - 1)}`,
        pin: true,
        scrub: 0.6,
        pinSpacing: true,
      },
    })

    for (let i = 0; i < images.length - 1; i++) {
      const current = images[i]
      const next = images[i + 1]
      const pos = i

      tl.to(
        current,
        { scale: 0.7, rotation: 5, duration: 1, ease: 'none' },
        pos
      ).to(
        next,
        { yPercent: 0, duration: 1, ease: 'none' },
        pos
      )
    }

    const resize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [cards])

  return (
    <section className={`sticky-cards-section ${className}`} ref={containerRef}>
      {(tag || title || subtitle) && (
        <div className="sticky-header">
          {tag && <span className="sticky-tag">{tag}</span>}
          {title && <h2 className="sticky-title">{title}</h2>}
          {subtitle && <p className="sticky-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="sticky-cards" ref={stackRef}>
        <div className="card-stack">
          {cards.map((card, i) => (
            <div
              key={card.id ?? i}
              className="card-layer"
              ref={el => (layerRefs.current[i] = el)}
            >
              <img
                src={card.image}
                alt={card.alt || ''}
                className="card-image"
              />
              <div className="card-content">
                {card.badge && <span className="card-badge">{card.badge}</span>}
                {card.title && <h3 className="card-title">{card.title}</h3>}
                {card.subtitle && <p className="card-subtitle">{card.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky-footer">
        <a href="/projects" className="view-all-btn">
          View All Projects
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>
  )
}

// Demo dataset for quick testing. Import and render <StickyCardsDemo /> if needed.
export function StickyCardsDemo() {
  const demoCards = [
    { id: 1, image: '/images/lectures/automation.png', title: 'Marketing Campaigns', badge: 'Campaigns', subtitle: 'Strategic campaigns that drive results' },
    { id: 2, image: '/images/lectures/notion.png', title: 'Social Media', badge: 'Social Media Management', subtitle: 'Building engaged communities online' },
    { id: 3, image: '/images/lectures/brandbuild.png', title: 'Brand Identity', badge: 'Branding', subtitle: 'Creating memorable brand experiences' },
    { id: 4, image: '/images/lectures/powerofprompts.png', title: 'AI Solutions', badge: 'AI & Automation', subtitle: 'Intelligent automation for modern workflows' },
    { id: 5, image: '/images/lectures/promptology.png', title: 'Team Training', badge: 'Training', subtitle: 'Empowering teams with practical skills' },
  ]
  return <StickyCards cards={demoCards} title="Projects" />
}


