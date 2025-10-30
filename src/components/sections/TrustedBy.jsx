import { useEffect, useRef } from 'react'
import '../../styles/trustedby.css'

export default function TrustedBy() {
  const scrollRef = useRef(null)

  const companies = [
    { id: 1, name: 'Curva', logo: '/images/trusted/curva.svg' },
    { id: 2, name: 'Dar Al Maajim', logo: '/images/trusted/daralmaajim.svg' },
    { id: 3, name: 'Forbes', logo: '/images/trusted/forbed.svg' },
    { id: 4, name: 'Glocal', logo: '/images/trusted/glocal.svg' },
    { id: 5, name: 'Omar', logo: '/images/trusted/omar.svg' },
    { id: 6, name: 'Qudraat', logo: '/images/trusted/qudraat.svg' },
    { id: 7, name: 'Scarpe', logo: '/images/trusted/scarpe.svg' },
    { id: 8, name: 'Sleep Zone', logo: '/images/trusted/sleepzone.svg' },
    { id: 9, name: 'Teleperformance', logo: '/images/trusted/teleperformance.svg' },
  ]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollAmount += scrollSpeed
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0
      }
      scrollContainer.scrollLeft = scrollAmount
      requestAnimationFrame(scroll)
    }

    const animation = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animation)
  }, [])

  return (
    <section className="trusted-by">
      <div className="trusted-container">
        <h2 className="trusted-title">Trusted By</h2>
        <div className="trusted-carousel" ref={scrollRef}>
          <div className="trusted-track">
            {[...companies, ...companies].map((company, index) => (
              <div key={`${company.id}-${index}`} className="trusted-item">
                <img src={company.logo} alt={company.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
