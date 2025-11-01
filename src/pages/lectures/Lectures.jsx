import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/layout/Footer.jsx'
import { lecturesData, categories as lectureCategories } from '../../data/lectureData.js'
import './lectures.css'

const Lectures = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [isHovered, setIsHovered] = useState(null)

  const lectures = lecturesData

  const categories = [
    { id: 'all', name: 'All Lectures' },
    ...lectureCategories.filter(cat => cat !== 'All').map(cat => ({
      id: cat.toLowerCase().replace(/\s+/g, '-').replace('&', ''),
      name: cat
    }))
  ]

  const filteredLectures = activeFilter === 'all' 
    ? lectures 
    : lectures.filter(lecture => lecture.category.toLowerCase().replace(/\s+/g, '-').replace('&', '') === activeFilter)

  const handleLectureClick = (lectureId) => {
    navigate(`/lectures/${lectureId}`)
  }

  return (
    <div className="lectures-page">
      <div className="lectures-hero">
        <div className="container">
          <h1 className="lectures-hero-title">
            Workshops & <span className="accent">Lectures</span>
          </h1>
          <p className="lectures-hero-subtitle">
            Practical sessions on AI, automation, and productivity. Learn frameworks you can implement immediately.
          </p>
        </div>
      </div>

      <div className="lectures-content">
        <div className="container">
          <div className="lectures-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="lectures-grid">
            {filteredLectures.map((lecture, index) => (
              <div
                key={lecture.id}
                className={`lecture-card ${isHovered === index ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => handleLectureClick(lecture.id)}
              >
                <div className="lecture-image">
                  <img src={lecture.image} alt={lecture.title} />
                  <div className="lecture-overlay">
                    <div className="lecture-meta">
                      <span className="duration">{lecture.duration}</span>
                      <span className="level">{lecture.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lecture-content">
                  <h3 className="lecture-title">{lecture.title}</h3>
                  <p className="lecture-description">{lecture.subtitle || lecture.overview?.substring(0, 150) + '...'}</p>
                  
                  <div className="lecture-footer">
                    <span className="learn-more">Learn More</span>
                    <div className="lecture-arrow">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Lectures