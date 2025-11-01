import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { projects } from '../../data/projects.js'
import './projectdetail.css'

function Counter({ value, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, latest => {
    // Extract number from string like "40+ hrs/week" or "+150%"
    const match = value.match(/([\d,]+)/)
    if (!match) return value
    const num = parseInt(match[1].replace(/,/g, ''))
    const current = Math.round(latest)
    return value.replace(/[\d,]+/, current.toLocaleString())
  })

  useEffect(() => {
    if (isInView) {
      const match = value.match(/([\d,]+)/)
      if (match) {
        const target = parseInt(match[1].replace(/,/g, ''))
        const controls = animate(motionValue, target, { duration })
        return controls.stop
      }
    }
  }, [isInView, value, duration, motionValue])

  return <motion.span ref={ref}>{rounded}</motion.span>
}



export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [visibleProjects, setVisibleProjects] = useState(4)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const otherProjects = projects.filter(p => p.id !== slug)

  useEffect(() => {
    const projectData = projects.find(p => p.id === slug)
    if (projectData) {
      setProject(projectData)
    }
  }, [slug])

  if (!project) {
    return (
      <div className="project-detail-loading">
        <h1>Project not found</h1>
        <Link to="/projects" className="back-link">← Back to Projects</Link>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
      <div className="project-detail">
      {/* Hero Section */}
      <section className="project-hero">
        <motion.div
          className="project-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="project-meta">
            <span className="project-year">{project.year}</span>
            <span className="project-category">{project.category}</span>
          </div>
          <h1 className="project-title">{project.title}</h1>
        </motion.div>

        <motion.div
          className="project-hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img src={project.image} alt={project.title} />
        </motion.div>
      </section>

      {/* Project Info */}
      <section className="project-info">
        <div className="project-info-grid">
          <motion.div
            className="project-description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>{project.shortDescription}</p>
          </motion.div>

          <motion.div
            className="project-details"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="detail-item">
              <h3>Client</h3>
              <p>{project.client}</p>
            </div>
            <div className="detail-item">
              <h3>Year</h3>
              <p>{project.year}</p>
            </div>
            <div className="detail-item">
              <h3>Services</h3>
              <p>{project.services.join(', ')}</p>
            </div>
            <div className="detail-item">
              <h3>Duration</h3>
              <p>{project.duration}</p>
            </div>
            {project.link && (
              <div className="detail-item">
                <h3>Link</h3>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Live →
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="project-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">The Challenge</h2>
          <p className="section-text">{project.challenge}</p>
        </motion.div>
      </section>

      {/* Solution */}
      <section className="project-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">The Solution</h2>
          <p className="section-text">{project.solution}</p>
        </motion.div>
      </section>

      {/* Visual Gallery */}
      <section className="project-gallery">
        <motion.div
          className="gallery-image"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <img src={project.image} alt={project.title} />
        </motion.div>
      </section>

      {/* Results */}
      <section className="project-results">
        <motion.h2
          className="results-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Results & Impact
        </motion.h2>
        <motion.p
          className="results-summary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The implementation delivered measurable results across all key performance indicators, 
          significantly exceeding initial project goals and establishing new benchmarks for success.
        </motion.p>
        <div className="results-grid">
          {project.metrics.map((result, index) => (
            <motion.div
              key={index}
              className="result-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="result-value">
                <Counter value={result.value} />
              </div>
              <div className="result-label">{result.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Projects */}
      <section className="more-projects">
        <div className="more-projects-header">
          <motion.h2
            className="more-projects-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            More Projects
          </motion.h2>
          <motion.div
            className="more-projects-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="more-projects-grid">
          {otherProjects.slice(0, visibleProjects).map((proj, index) => (
            <motion.div
              key={proj.id}
              className="more-project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/projects/${proj.id}`} className="more-project-link">
                <div className="more-project-image">
                  <img src={proj.image} alt={proj.title} />
                </div>
                <div className="more-project-info">
                  <span className="more-project-category">{proj.category}</span>
                  <h3 className="more-project-title">{proj.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {visibleProjects < otherProjects.length && (
          <motion.div
            className="load-more-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button
              className="load-more-btn"
              onClick={() => setVisibleProjects(prev => prev + 4)}
            >
              Load More
            </button>
          </motion.div>
        )}
      </section>

      {/* Back to Projects */}
      <div className="back-to-projects">
        <Link to="/projects" className="back-link">
          ← Back to All Projects
        </Link>
      </div>
    </div>
    </>
  )
}
