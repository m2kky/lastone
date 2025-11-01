import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

function Hero() {
  const rootRef = useRef(null)
  const wordsRef = useRef(null)
  const sigRef = useRef(null)
  const subtitleRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(TextPlugin)
      
      const hasSeenIntro = sessionStorage.getItem('heroAnimationSeen')
      
      if (hasSeenIntro) {
        // Show final state immediately
        gsap.set([sigRef.current, subtitleRef.current], { opacity: 1 })
        if (sigRef.current) sigRef.current.src = '/images/sig2.png'
        if (subtitleRef.current) subtitleRef.current.textContent = 'Create, Automate and grow'
        if (wordsRef.current) {
          const children = Array.from(wordsRef.current.querySelectorAll('[data-word]'))
          gsap.set(children, { opacity: 0 })
        }
        return
      }

      // First visit - run animation
      // initial states
      gsap.set([sigRef.current, subtitleRef.current], { opacity: 0 })
      if (wordsRef.current) {
        const children = Array.from(wordsRef.current.querySelectorAll('[data-word]'))
        gsap.set(children, { opacity: 0, y: 0, skewY: 0 })
      }

      // lock scroll
      const prevOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      const words = wordsRef.current ? Array.from(wordsRef.current.querySelectorAll('[data-word]')) : []

      tl.addLabel('start', 0)
        // signature reveal after 0.5s
        .to(sigRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 }, 'sigReveal')
        // glitch words sequentially: each ~0.66s, with CSS pseudo-layers for RGB split
        .to(words[0], { opacity: 1, duration: 0.08, onStart: () => words[0].classList.add('glitch') }, 'glitch')
        .to(words[0], { y: 6, skewY: 6, duration: 0.1 })
        .to(words[0], { y: -6, skewY: -6, duration: 0.1 })
        .to(words[0], { y: 0, skewY: 0, duration: 0.12, onComplete: () => words[0].classList.remove('glitch') })
        .to(words[0], { opacity: 0, duration: 0.08 })

        .to(words[1], { opacity: 1, duration: 0.08, onStart: () => words[1].classList.add('glitch') })
        .to(words[1], { y: -7, skewY: -7, duration: 0.1 })
        .to(words[1], { y: 7, skewY: 7, duration: 0.1 })
        .to(words[1], { y: 0, skewY: 0, duration: 0.12, onComplete: () => words[1].classList.remove('glitch') })
        .to(words[1], { opacity: 0, duration: 0.08 })

        .to(words[2], { opacity: 1, duration: 0.08, onStart: () => words[2].classList.add('glitch') })
        .to(words[2], { y: 8, skewY: 8, duration: 0.1 })
        .to(words[2], { y: -8, skewY: -8, duration: 0.1 })
        .to(words[2], { y: 0, skewY: 0, duration: 0.12, onComplete: () => words[2].classList.remove('glitch') })
        .to(words[2], { opacity: 0, duration: 0.08 })
        // swap signature with blur while typing subtitle starts
        .to(sigRef.current, { filter: 'blur(10px)', opacity: 0.0, duration: 0.35 }, 'swap')
        .call(() => { if (sigRef.current) sigRef.current.src = '/images/sig2.png' })
        .to(sigRef.current, { filter: 'blur(0px)', opacity: 1, duration: 0.35 }, 'swap+=0.02')
        .to(subtitleRef.current, { opacity: 1, duration: 0.1 }, 'swap')
        .to(subtitleRef.current, { text: 'Create, Automate and grow', duration: 1.9, ease: 'none' }, 'swap')

      tl.eventCallback('onStart', () => {
        console.time('hero-seq')
      })
      tl.eventCallback('onUpdate', () => {
        // placeholder for runtime monitoring if needed
      })
      tl.eventCallback('onComplete', () => {
        document.documentElement.style.overflow = prevOverflow || 'auto'
        sessionStorage.setItem('heroAnimationSeen', 'true')
        console.timeEnd('hero-seq')
      })
    }, rootRef)

    return () => {
      ctx.revert()
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  return (
    <section ref={rootRef} className="hero">
      <video className="hero-video" src="/video/herovid.mp4" autoPlay muted playsInline loop></video>

      <div className="hero-overlay">
        <div ref={wordsRef} className="hero-words" aria-label="glitch words">
          <span data-word>CREATE</span>
          <span data-word>AUTOMATE</span>
          <span data-word>GROW</span>
        </div>

        <img ref={sigRef} className="hero-signature" src="/images/sig.png" alt="signature" />

        <p ref={subtitleRef} className="hero-subtitle" aria-live="polite"></p>
      </div>
    </section>
  )
}

export default Hero


