import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/lectures.css'

const LecturesSection = () => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const carouselRef = useRef(null)
  const galleryRef = useRef(null)

  const lectures = [
    {
      id: "ai-automation-kickstart",
      title: "Automate Your Life Workshop",
      description:
        "A practical workshop introducing youth to no-code automation. Use tools like Make.com to streamline daily tasks, connect apps, and build powerful workflows without code.",
      image: "/images/lectures/automation.png",
      hoverImage: "/images/lectures/automation.png"
    },
    {
      id: "notion-productivity",
      title: "Introduction to Notion",
      description:
        "Unlock productivity with Notion. Learn pages, databases, and building a personal dashboard. Explore using ChatGPT to generate structured content for your workspace.",
      image: "/images/lectures/notion.png",
      hoverImage: "/images/lectures/notion.png"
    },
    {
      id: "build-your-brand-chatgpt",
      title: "Build Your Brand Using ChatGPT",
      description:
        "Leverage ChatGPT for personal and professional branding. Hands-on training for content creation, social media strategy, and consistent brand voice with AI.",
      image: "/images/lectures/brandbuild.png",
      hoverImage: "/images/lectures/brandbuild.png"
    },
    {
      id: "power-of-prompts",
      title: "The Power of Prompts: From Prompt to Profit",
      description:
        "Deep-dive into prompt engineering. Techniques and frameworks to craft effective prompts that generate valuable, accurate, and profitable outcomes from generative AI.",
      image: "/images/lectures/powerofprompts.png",
      hoverImage: "/images/lectures/powerofprompts.png"
    },
    {
      id: "promptology-unlocked",
      title: "Promptology: Models, Methods and Use-Cases",
      description:
        "Write effective prompts and understand AI model types. Learn Prompt Engineering basics, Flagship LLMs, Thinking Models, Research Agents, and when to use each.",
      image: "/images/lectures/promptology.png",
      hoverImage: "/images/lectures/promptology.png"
    },
    {
      id: "portfolio-that-converts",
      title: "Portfolio That Converts",
      description:
        "A comprehensive guide to a standout professional portfolio: selecting best work, structuring projects, visual layout, and compelling case studies that attract clients.",
      image: "/images/lectures/Portfolio.png",
      hoverImage: "/images/lectures/Portfolio.png"
    }
  ]

  const handleMouseEnter = (index) => {
    setIsHovered(index)
  }

  const handleMouseLeave = () => {
    setIsHovered(null)
  }

  const handleLectureClick = (lectureId) => {
    navigate(`/lectures/${lectureId}`)
  }

  // Handle scroll for desktop gallery
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect()
        const scrollThreshold = window.innerHeight * 0.3
        
        if (rect.top < scrollThreshold && rect.bottom > scrollThreshold) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX
    const carousel = carouselRef.current
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX
      const diffX = startX - currentX
      
      if (carousel) {
        carousel.style.transform = `translateX(${-activeIndex * 85 + (diffX / 10)}%)`
      }
    }

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX
      const diffX = startX - endX
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && activeIndex < lectures.length - 1) {
          setActiveIndex(activeIndex + 1)
        } else if (diffX < 0 && activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
        }
      }
      
      if (carousel) {
        carousel.style.transform = `translateX(-${activeIndex * 85}%)`
      }
      
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <section className="lectures-section">
      <div className="container">
        {/* Desktop Gallery Grid */}
        <div 
          ref={galleryRef}
          className={`lectures-gallery desktop-only ${isScrolled ? 'scrolled' : ''}`}
        >
          {/* First Row */}
          <div className="gallery-row">
            {lectures.slice(0, 3).map((lecture, index) => (
              <div
                key={lecture.id}
                className={`gallery-item ${isHovered === index ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleLectureClick(lecture.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="gallery-image">
                  <img
                    src={lecture.image}
                    alt={lecture.title}
                    className="main-image"
                  />
                  <img
                    src={lecture.hoverImage}
                    alt={lecture.title}
                    className="hover-image"
                  />
                </div>
                
                <div className="gallery-overlay">
                  <h3 className="gallery-title">{lecture.title}</h3>
                  <div className="gallery-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="gallery-row">
            {lectures.slice(3, 6).map((lecture, index) => (
              <div
                key={lecture.id}
                className={`gallery-item ${isHovered === index + 3 ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(index + 3)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleLectureClick(lecture.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="gallery-image">
                  <img
                    src={lecture.image}
                    alt={lecture.title}
                    className="main-image"
                  />
                  <img
                    src={lecture.hoverImage}
                    alt={lecture.title}
                    className="hover-image"
                  />
                </div>
                
                <div className="gallery-overlay">
                  <h3 className="gallery-title">{lecture.title}</h3>
                  <div className="gallery-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lectures-carousel mobile-only">
          <div
            ref={carouselRef}
            className="carousel-container"
            onTouchStart={handleTouchStart}
            style={{ transform: `translateX(-${activeIndex * 85}%)` }}
          >
            {lectures.map((lecture, index) => (
              <div 
                key={lecture.id} 
                className="carousel-item"
                onClick={() => handleLectureClick(lecture.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="carousel-image">
                  <img
                    src={lecture.image}
                    alt={lecture.title}
                  />
                </div>
                
                <div className="carousel-overlay">
                  <h3 className="carousel-title">{lecture.title}</h3>
                  <div className="carousel-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LecturesSection
