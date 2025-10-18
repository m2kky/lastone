import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    points: [
      'Designing custom automations to handle repetitive tasks and boost productivity.',
      'Integrating tools like Make, Zapier, and ChatGPT into daily workflows.',
      'Building AI-powered systems for data handling, content generation, and optimization.',
      'Advising on the best AI tools for each project’s needs.',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    points: [
      'Executing targeted ad campaigns on Instagram, TikTok, and Snapchat.',
      'Driving conversions, profile visits, and sales.',
      'Running A/B tests and performance analysis for continuous optimization.',
      'Implementing automation in funnels to increase efficiency.',
    ],
  },
  {
    id: 'web-design',
    title: 'Web Design',
    points: [
      'Designing clean, responsive websites that reflect the brand’s identity.',
      'Building user-focused landing pages optimized for conversions.',
      'Integrating analytics, forms, and automation tools into websites.',
      'Ensuring fast load times, accessibility, and SEO best practices.',
    ],
  },
  {
    id: 'community',
    title: 'Community Management',
    points: [
      'Building and nurturing engaged communities (Discord, Telegram, etc.).',
      'Crafting content and engagement strategies to grow presence.',
      'Moderating discussions and creating events that boost participation.',
      'Developing systems for onboarding, tracking, and retention.',
    ],
  },
  {
    id: 'team-enablement',
    title: 'Team Enablement & Workflow',
    points: [
      'Setting up efficient systems and tools (Notion, ClickUp, Slack, etc.).',
      'Automating recurring processes to save time and improve consistency.',
      'Providing tool training, resources, and documentation for teams.',
      'Acting as the operational bridge across teams and departments.',
    ],
  },
]

function Icon({ type }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'ai-automation':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1"/>
        </svg>
      )
    case 'digital-marketing':
      return (
        <svg {...common}>
          <path d="M3 11v2a2 2 0 0 0 2 2h3l5 4V5l-5 4H5a2 2 0 0 0-2 2z"/>
          <path d="M19 12a2 2 0 1 1 0 4"/>
        </svg>
      )
    case 'web-design':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2"/>
          <path d="M3 9h18M8 13h8"/>
        </svg>
      )
    case 'community':
      return (
        <svg {...common}>
          <path d="M7 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/>
          <circle cx="12" cy="7" r="3"/>
        </svg>
      )
    case 'team-enablement':
      return (
        <svg {...common}>
          <path d="M5 12h4l1 3 3-8 2 5h4"/>
          <circle cx="5" cy="19" r="1"/>
          <circle cx="12" cy="19" r="1"/>
          <circle cx="19" cy="19" r="1"/>
        </svg>
      )
    default:
      return null
  }
}

function ServiceCard({ service, isOpen, onToggle, hoverImageRef, globalHideTimeout }) {
  const handleMouseEnter = (e) => {
    // Clear any pending hide timeout
    if (globalHideTimeout.current) {
      clearTimeout(globalHideTimeout.current)
      globalHideTimeout.current = null
    }

    if (hoverImageRef.current) {
      const img = hoverImageRef.current
      img.style.display = 'block'
      img.src = `/images/services/${service.id}.jpg`
      
      // Beautiful entrance animation
      img.style.opacity = '0'
      img.style.transform = 'scale(0.8) translateY(20px)'
      
      // Trigger the animation after a tiny delay
      setTimeout(() => {
        img.style.opacity = '1'
        img.style.transform = 'scale(1) translateY(0)'
      }, 10)
    }
  }

  const handleMouseMove = (e) => {
    if (hoverImageRef.current) {
      const img = hoverImageRef.current
      const rect = e.currentTarget.getBoundingClientRect()
      
      // Position image with bounds checking
      const imgWidth = 320
      const imgHeight = 220
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      let left = rect.right + 20
      let top = rect.top
      
      // Adjust if image would go off screen
      if (left + imgWidth > viewportWidth) {
        left = rect.left - imgWidth - 20
      }
      if (top + imgHeight > viewportHeight) {
        top = viewportHeight - imgHeight - 20
      }
      if (top < 20) {
        top = 20
      }
      
      img.style.left = `${left}px`
      img.style.top = `${top}px`
    }
  }

  const handleMouseLeave = () => {
    // Set a timeout to hide the image after a short delay
    globalHideTimeout.current = setTimeout(() => {
      if (hoverImageRef.current) {
        const img = hoverImageRef.current
        // Beautiful exit animation
        img.style.opacity = '0'
        img.style.transform = 'scale(0.8) translateY(20px)'
        
        // Hide after animation completes
        setTimeout(() => {
          img.style.display = 'none'
        }, 150)
      }
    }, 200) // 200ms delay before hiding
  }

  return (
    <div className={`svc-card ${isOpen ? 'open' : ''}`}>
      <button 
        className="svc-head" 
        onClick={onToggle} 
        aria-expanded={isOpen}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="svc-icon" aria-hidden><Icon type={service.id} /></span>
        <span className="svc-title">{service.title}</span>
        <span className={`svc-arrow ${isOpen ? 'open' : ''}`} aria-hidden>▾</span>
      </button>
      <div className={`svc-body ${isOpen ? 'open' : ''}`}>
        <ul>
          {service.points.map((p, i) => (
            <li key={i}><span className="tick"/> {p}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ServicesSection() {
  const rootRef = useRef(null)
  const headerRef = useRef(null)
  const subRef = useRef(null)
  const listRef = useRef(null)
  const statsRef = useRef(null)
  const hoverImageRef = useRef(null)
  const globalHideTimeout = useRef(null)
  const [openId, setOpenId] = useState(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, subRef.current], { opacity: 0, y: 24 })
      gsap.set(listRef.current?.children, { opacity: 0, y: 32 })
      gsap.set(statsRef.current, { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to(listRef.current?.children, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, '-=0.1')
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.6, onComplete: () => {
          const nums = statsRef.current?.querySelectorAll('.num') || []
          nums.forEach((el) => {
            const target = Number(el.getAttribute('data-target') || '0')
            const prefix = el.getAttribute('data-prefix') || ''
            const suffix = el.getAttribute('data-suffix') || ''
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: Math.min(2.2, 0.02 * target + 0.8),
              ease: 'power1.out',
              onUpdate: () => {
                const v = Math.round(obj.val)
                el.textContent = `${prefix}${v}${suffix}`
              },
            })
          })
        } }, '>-0.1')
    }, rootRef)

    // Add mouse leave listener to the entire services section
    const handleSectionMouseLeave = (e) => {
      // Only hide if we're actually leaving the section (not moving to a child)
      if (!rootRef.current.contains(e.relatedTarget)) {
        // Clear any pending timeout
        if (globalHideTimeout.current) {
          clearTimeout(globalHideTimeout.current)
          globalHideTimeout.current = null
        }
        
        if (hoverImageRef.current) {
          const img = hoverImageRef.current
          // Faster exit animation
          img.style.opacity = '0'
          img.style.transform = 'scale(0.8) translateY(20px)'
          
          // Hide after animation completes - faster timing
          setTimeout(() => {
            img.style.display = 'none'
          }, 150)
        }
      }
    }

    const sectionElement = rootRef.current
    if (sectionElement) {
      sectionElement.addEventListener('mouseleave', handleSectionMouseLeave)
    }

    return () => {
      ctx.revert()
      if (sectionElement) {
        sectionElement.removeEventListener('mouseleave', handleSectionMouseLeave)
      }
    }
  }, [])

  return (
    <section ref={rootRef} className="services">
      <div className="svc-wrap">
        <div className="svc-content">
          <div ref={headerRef} className="svc-header">What I can <span className="svc-accent">do</span><br className="mob-br"/> for <span className="svc-accent">you</span><span className="svc-q">?</span></div>
          <p ref={subRef} className="svc-sub">I help teams design scalable systems and growth engines.</p>
          <div ref={listRef} className="svc-list">
            {services.map((s, idx) => (
              <div key={s.id}>
                <ServiceCard 
                  service={s} 
                  isOpen={openId===s.id} 
                  onToggle={() => setOpenId(prev=>prev===s.id?null:s.id)}
                  hoverImageRef={hoverImageRef}
                  globalHideTimeout={globalHideTimeout}
                />
                {idx < services.length - 1 && <div className="svc-divider" />}
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="svc-stats">
          <div className="stat">
            <div className="num" data-target="7" data-prefix="+ ">0</div>
            <div className="label">Years of Experience</div>
          </div>
          <div className="stat">
            <div className="num" data-target="84" data-prefix="+ ">0</div>
            <div className="label">Completed Projects</div>
          </div>
          <div className="stat">
            <div className="num" data-target="50" data-suffix="+">0</div>
            <div className="label">Clients on Worldwide</div>
          </div>
          <div className="stat">
            <div className="num" data-target="500" data-prefix="+">0</div>
            <div className="label">People Impacted</div>
          </div>
          
          {/* Social Media Icons */}
          <div className="svc-social">
            <a href="https://www.facebook.com/muhammedmekky" target="_blank" rel="noopener noreferrer" className="social-link facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/muhammedm2kky/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/muhammedmekky/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@muhammedm2kky" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="mailto:Muhammedmekky4@gmail.com" className="social-link email">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            
            {/* MY Story Link */}
            <a href="#" className="my-story-link">
              MY Story
              <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Hover Image */}
      <img 
        ref={hoverImageRef}
        className="svc-hover-image" 
        alt="Service preview" 
        style={{ display: 'none' }}
      />
    </section>
  )
}

export default ServicesSection


