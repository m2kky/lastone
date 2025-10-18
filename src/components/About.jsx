import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
// Button component removed per user request; using simple buttons

function About() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    const ctx = gsap.context(() => {
      const stage = rootRef.current?.querySelector('.about-stage')
      const portrait = rootRef.current?.querySelector('.about-portrait')
      const heroVideo = document.querySelector('.hero-video')
      const heroOverlay = document.querySelector('.hero-overlay')

      // split title into words spans
      const titleEl = titleRef.current
      const titleText = titleEl?.dataset?.full || ''
      if (titleEl && titleEl.children.length === 0) {
        const accentSet = new Set(['AUTOMATION', 'TRAINER'])
        const words = titleText.split(' ')
        words.forEach((w, i) => {
          const clean = w.replace(/[^A-Z]/g, '')
          const span = document.createElement('span')
          let cls = 'word'
          if (accentSet.has(clean)) cls += ' accent'
          if (clean === 'PERFORMANCE') cls += ' performance'
          span.className = cls
          span.textContent = w + (i < words.length - 1 ? ' ' : '')
          titleEl.appendChild(span)
        })
      }
      const titleWords = Array.from(titleEl?.querySelectorAll('.word') || [])

      gsap.set([stage, portrait, titleWords, bodyRef.current], { willChange: 'transform' })
      gsap.set(rootRef.current, { backgroundColor: 'transparent' })
      gsap.set([portrait], { xPercent: 80, opacity: 0 })
      gsap.set(stage, { xPercent: 100 })
      gsap.set(titleWords, { opacity: 0, y: 12 })
      const bodies = Array.from(rootRef.current?.querySelectorAll('.about-body') || [])
      gsap.set(bodies, { opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=220%',
          scrub: true,
          pin: true,
        },
      })

      // Phase A: slide in About and push hero left
      tl.to(stage, { xPercent: 0, duration: 0.33 }, 'enter')
        .to(portrait, { xPercent: 0, opacity: 1, duration: 0.4 }, 'enter')
        .to([heroVideo, heroOverlay], { x: '-100vw', opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 'enter')
        .to(rootRef.current, { backgroundColor: '#0b0b0b', duration: 0.1 }, 'enter+=0.15')
        .set([heroVideo, heroOverlay], { display: 'none' }, 'enter+=0.5')

      // Phase B: headline words reveal
      tl.to(titleWords, { opacity: 1, y: 0, stagger: 0.08, duration: 0.2 }, 'words')
      const perf = titleEl?.querySelector('.word.performance')
      if (perf) { tl.to(perf, { '--hlw': 1, duration: 0.4, ease: 'power1.out' }, 'words+=0.2') }

      // Phase C: stick header (بدون رفع الصورة)
      tl.addLabel('stick')

      // Phase D: body reveal (typing-like)
      // Phase D: body paragraphs sequentially
      bodies.forEach((el, idx) => {
        const content = el.dataset.full || ''
        tl.to(el, { opacity: 1, duration: 0.1 }, idx === 0 ? 'body' : '>' )
          .to(el, { text: content, duration: 0.6, ease: 'none' }, '<')
      })

      // Phase E: CTA
      tl.from('.about-cta > *', { opacity: 0, y: 24, stagger: 0.1, duration: 0.2 }, 'cta')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="about">
      <div className="about-stage">
        <div className="about-graphic">
          <img className="about-portrait" src="/images/mekky_about.png" alt="Portrait of Muhammed Mekky"/>
        </div>
        <h2 ref={titleRef} className="about-title" data-full="MARKETING AUTOMATION STRATEGIST AND PERFORMANCE TRAINER"></h2>
        <div ref={bodyRef} className="about-body-group">
          <p className="about-body" data-full="Muhammed Mekky is a marketing automation strategist and performance trainer who helps businesses and individuals build smarter, scalable systems."></p>
          <p className="about-body" data-full="With years of experience across marketing, automation, and AI-driven workflows, Mekky has empowered startups and teams to grow efficiently and work intelligently."></p>
          <p className="about-body" data-full="He brings a unique mix of creative strategy, technical precision, and human-centered training—bridging the gap between marketing, technology, and people."></p>
        </div>
        <div className="about-cta">
          <button className="btn btn-primary" type="button">
            View Projects
            <span className="btn-arrow">
              <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
              </svg>
            </span>
          </button>
          <button className="btn btn-ghost" type="button">
            Get In touch
            <span className="btn-arrow">
              <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default About


