import { useState, useEffect } from 'react'
import '../../styles/customcursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      // فقط العناصر دي اللي المؤشر يتغير عليها
      const isSpecialElement = target.closest('.project-card, .card-layer, .carousel-card, .more-project-card, .gallery-image, video, .clickable')
      setIsHovering(!!isSpecialElement)
    }

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isHovering && (
        <svg viewBox="0 0 24 24" fill="none" className="cursor-arrow">
          <path d="M5 12h14m0 0l-7-7m7 7l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}
