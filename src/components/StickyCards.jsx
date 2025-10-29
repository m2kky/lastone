import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './stickycards.css'

// Simple sticky stacked-cards section using GSAP + ScrollTrigger
// Props: cards: [{ id, image, alt }], className?: string
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
              {card.badge && <span className="card-badge">{card.badge}</span>}
              <img
                src={card.image}
                alt={card.alt || ''}
                className="card-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Demo dataset for quick testing. Import and render <StickyCardsDemo /> if needed.
export function StickyCardsDemo() {
  const demoCards = [
    { id: 1, image: '/images/lectures/automation.png', badge: 'Campaigns' },
    { id: 2, image: '/images/lectures/notion.png', badge: 'Social Media Management' },
    { id: 3, image: '/images/lectures/brandbuild.png', badge: 'Branding' },
    { id: 4, image: '/images/lectures/powerofprompts.png', badge: 'AI & Automation' },
    { id: 5, image: '/images/lectures/promptology.png', badge: 'Training' },
  ]
  return <StickyCards cards={demoCards} />
}


