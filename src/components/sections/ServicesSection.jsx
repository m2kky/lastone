import { useLayoutEffect, useEffect, useRef, useState } from 'react'
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
  {
    id: 'training-workshops',
    title: 'Training & Workshops',
    points: [
      'Conducting hands-on workshops on marketing automation and AI integration.',
      'Teaching practical frameworks for scaling performance and growth.',
      'Delivering corporate training sessions for teams and departments.',
      'Creating actionable strategies from complex concepts and theories.',
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
    case 'training-workshops':
      return (
        <svg {...common}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          <circle cx="12" cy="9" r="1"/>
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
      
      // Map service IDs to correct image names
      const imageMap = {
        'ai-automation': 'ai-automation.png',
        'digital-marketing': 'digital-marketing.png',
        'web-design': 'web-design.png',
        'community': 'community-management.png',
        'team-enablement': 'team-enablement.png',
        'training-workshops': 'training-workshops.png'
      }
      
      img.src = `/images/services/${imageMap[service.id] || service.id + '.png'}`
      
      // Position image using same logic as handleMouseMove
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Responsive sizing
      let imgWidth, imgHeight
      if (viewportWidth >= 1367) {
        imgWidth = 320
        imgHeight = 220
      } else if (viewportWidth >= 1024) {
        imgWidth = 280
        imgHeight = 190
      } else {
        imgWidth = 240
        imgHeight = 160
      }
      
      const offset = 30
      
      // Calculate initial position (prefer right side of cursor)
      let left = e.clientX + offset
      let top = e.clientY - (imgHeight / 2)
      
      // Check if image fits on the right side
      if (left + imgWidth > viewportWidth - 20) {
        // Try left side of cursor
        left = e.clientX - imgWidth - offset
        
        // If still doesn't fit on left, center it horizontally
        if (left < 20) {
          left = Math.max(20, (viewportWidth - imgWidth) / 2)
        }
      }
      
      // Ensure image doesn't go off screen to the left
      if (left < 20) {
        left = 20
      }
      
      // Ensure image doesn't go off screen to the right
      if (left + imgWidth > viewportWidth - 20) {
        left = viewportWidth - imgWidth - 20
      }
      
      // Adjust vertical position
      if (top + imgHeight > viewportHeight - 20) {
        top = viewportHeight - imgHeight - 20
      }
      if (top < 20) {
        top = 20
      }
      
      img.style.left = `${left}px`
      img.style.top = `${top}px`
      
      // Beautiful entrance animation
      img.style.opacity = '0'
      img.style.transform = 'scale(0.8) translateY(20px)'
      
      // Trigger the animation after a tiny delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          img.style.opacity = '1'
          img.style.transform = 'scale(1) translateY(0)'
        })
      })
    }
  }

  const handleMouseMove = (e) => {
    if (hoverImageRef.current) {
      const img = hoverImageRef.current
      
      // Position image with bounds checking using mouse cursor position
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Responsive sizing
      let imgWidth, imgHeight
      if (viewportWidth >= 1367) {
        imgWidth = 320
        imgHeight = 220
      } else if (viewportWidth >= 1024) {
        imgWidth = 280
        imgHeight = 190
      } else {
        imgWidth = 240
        imgHeight = 160
      }
      
      const offset = 30
      
      // Calculate initial position (prefer right side of cursor)
      let left = e.clientX + offset
      let top = e.clientY - (imgHeight / 2)
      
      // Check if image fits on the right side
      if (left + imgWidth > viewportWidth - 20) {
        // Try left side of cursor
        left = e.clientX - imgWidth - offset
        
        // If still doesn't fit on left, center it horizontally
        if (left < 20) {
          left = Math.max(20, (viewportWidth - imgWidth) / 2)
        }
      }
      
      // Ensure image doesn't go off screen to the left
      if (left < 20) {
        left = 20
      }
      
      // Ensure image doesn't go off screen to the right
      if (left + imgWidth > viewportWidth - 20) {
        left = viewportWidth - imgWidth - 20
      }
      
      // Adjust vertical position
      if (top + imgHeight > viewportHeight - 20) {
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
        }, 400)
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
      // Set initial states
      gsap.set([headerRef.current, subRef.current], { opacity: 1, y: 0 })
      gsap.set(listRef.current?.children, { opacity: 1, y: 0 })
      gsap.set(statsRef.current, { opacity: 1, y: 0 })
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
          
          // Hide after animation completes
          setTimeout(() => {
            img.style.display = 'none'
          }, 400)
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

  // Separate useEffect for counter animation like testimonials
  useEffect(() => {
    if (!rootRef.current) return

    // Counter animation for stats
    const nums = statsRef.current?.querySelectorAll('.num') || []
    console.log('Found numbers:', nums.length) // Debug log
    
    nums.forEach((el, index) => {
      const target = Number(el.getAttribute('data-target') || '0')
      const prefix = el.getAttribute('data-prefix') || ''
      const suffix = el.getAttribute('data-suffix') || ''
      console.log(`Number ${index}: target=${target}, prefix=${prefix}, suffix=${suffix}`) // Debug log
      
      const obj = { val: 0 }
      
      // Set initial text content
      el.textContent = `${prefix}0${suffix}`
      
      gsap.to(obj, {
        val: target,
        duration: Math.min(2.2, 0.02 * target + 0.8),
        ease: 'power1.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          const v = Math.round(obj.val)
          el.textContent = `${prefix}${v}${suffix}`
        },
        onComplete: () => {
          console.log(`Animation completed for number ${index}: ${prefix}${target}${suffix}`) // Debug log
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
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
          
          {/* MY Story CTA */}
          <div className="svc-story-cta">
            <p className="story-tagline">Want to know more about my journey?</p>
            <a href="/story" className="my-story-link">
              Discover My Story
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
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


