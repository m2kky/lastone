import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

function About() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    // Add JS loaded class
    if (rootRef.current) {
      rootRef.current.classList.add('js-loaded')
    }

    const ctx = gsap.context(() => {
      // Get elements
      const portrait = rootRef.current?.querySelector('.about-portrait')
      const titleEl = titleRef.current
      const bodyElements = rootRef.current?.querySelectorAll('.about-body')
      const ctaElements = rootRef.current?.querySelectorAll('.about-cta > *')

      // Split title into words for animation
      if (titleEl && titleEl.children.length === 0) {
        const titleText = titleEl.dataset.full || ''
        const accentWords = new Set(['AUTOMATION', 'TRAINER'])
        
        titleText.split(' ').forEach((word, index) => {
          const cleanWord = word.replace(/[^A-Z]/g, '')
          const span = document.createElement('span')
          span.className = 'word'
          
          if (accentWords.has(cleanWord)) {
            span.classList.add('accent')
          }
          if (cleanWord === 'PERFORMANCE') {
            span.classList.add('performance')
          }
          
          span.textContent = word + (index < titleText.split(' ').length - 1 ? ' ' : '')
          titleEl.appendChild(span)
        })
      }

      const titleWords = Array.from(titleEl?.querySelectorAll('.word') || [])

      // Set initial states
      gsap.set(portrait, { opacity: 1, scale: 1 })
      gsap.set(titleWords, { opacity: 0, y: 20 })
      gsap.set(bodyElements, { opacity: 0 })
      gsap.set(ctaElements, { opacity: 0, y: 30 })

      // Create scroll trigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      })

      // Phase 1: Portrait is already visible (0-10%)
      tl.addLabel('portrait')

      // Phase 2: Title words reveal (10-30%)
      if (titleWords.length > 0) {
        tl.to(titleWords, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.3,
          ease: 'power2.out'
        }, 'title')
        
        // Highlight PERFORMANCE word
        const performanceWord = titleEl?.querySelector('.word.performance')
        if (performanceWord) {
          tl.to(performanceWord, {
            '--hlw': 1,
            duration: 0.4,
            ease: 'power1.out'
          }, 'title+=0.2')
        }
      }

      // Phase 3: Body paragraphs with typing effect (30-80%)
      if (bodyElements && bodyElements.length > 0) {
        bodyElements.forEach((element, index) => {
          const content = element.dataset.full || ''
          
          tl.to(element, {
            opacity: 1,
            duration: 0.1
          }, `body-${index}`)
          
          tl.to(element, {
            text: content,
            duration: 0.6,
            ease: 'none',
            onStart: () => {
              element.textContent = ''
            }
          }, `body-${index}`)
        })
      }

      // Phase 4: CTA buttons (80-100%)
      if (ctaElements && ctaElements.length > 0) {
        tl.to(ctaElements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.3,
          ease: 'power2.out'
        }, 'cta')
      }

      // Fallback: If scroll trigger doesn't work, show elements after delay
      setTimeout(() => {
        if (titleWords.length > 0) {
          gsap.to(titleWords, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 })
        }
        if (bodyElements && bodyElements.length > 0) {
          bodyElements.forEach((element, index) => {
            const content = element.dataset.full || ''
            gsap.to(element, { opacity: 1, duration: 0.3, delay: index * 0.2 })
            gsap.to(element, { 
              text: content, 
              duration: 0.8, 
              ease: 'none',
              delay: index * 0.2 + 0.3,
              onStart: () => { element.textContent = '' }
            })
          })
        }
        if (ctaElements && ctaElements.length > 0) {
          gsap.to(ctaElements, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, delay: 1.5 })
        }
      }, 1000)

    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="about">
      <div className="about-stage">
        <div className="about-graphic">
          <img 
            className="about-portrait" 
            src="/images/mekky_about.png" 
            alt="Portrait of Muhammed Mekky"
          />
        </div>
        
        <div className="about-content">
          <h2 
            ref={titleRef} 
            className="about-title" 
            data-full="MARKETING AUTOMATION STRATEGIST AND PERFORMANCE TRAINER"
          />
          
          <div ref={bodyRef} className="about-body-group">
            <p 
              className="about-body" 
              data-full="Muhammed Mekky is a marketing automation strategist and performance trainer who helps businesses and individuals build smarter, scalable systems."
            />
            <p 
              className="about-body" 
              data-full="With years of experience across marketing, automation, and AI-driven workflows, Mekky has empowered startups and teams to grow efficiently and work intelligently."
            />
            <p 
              className="about-body" 
              data-full="He brings a unique mix of creative strategy, technical precision, and human-centered training—bridging the gap between marketing, technology, and people."
            />
            <p 
              className="about-body" 
              data-full="Beyond building systems, Mekky teaches them. Through his workshops and lectures, he shares practical frameworks for automating marketing, scaling performance, and integrating AI into real-world workflows. From startups to corporate teams, his sessions turn complex concepts into hands-on, actionable strategies."
            />
          </div>
          
          <div className="about-cta">
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={() => {
                const projectsSection = document.querySelector('.sticky-cards-section')
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              View Projects
              <span className="btn-arrow">
                <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                </svg>
              </span>
            </button>
            <Link to="/contact" className="btn btn-ghost">
              Get In Touch
              <span className="btn-arrow">
                <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About