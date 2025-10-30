import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
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

// Sample project data - replace with your actual data
const projectsData = {
  'ai-marketing-automation': {
    title: 'AI Marketing Automation',
    year: '2024',
    category: 'AI & Automation',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
    description: 'A comprehensive AI-powered marketing automation system that transformed how the client manages their digital campaigns, saving 40+ hours per week while increasing conversion rates by 150%.',
    client: 'Tech Startup Inc.',
    services: ['AI Integration', 'Workflow Automation', 'Marketing Strategy'],
    duration: '3 months',
    link: 'https://example.com',
    challenge: 'The client was struggling with manual marketing processes that consumed excessive time and resources. Their team spent over 40 hours weekly on repetitive tasks like email campaigns, social media posting, and lead nurturing. This inefficiency prevented them from scaling their marketing efforts and focusing on strategic initiatives.',
    solution: 'We implemented a comprehensive AI-driven automation system that streamlined their entire marketing workflow. The solution included automated email sequences, intelligent lead scoring, social media scheduling with AI-generated content suggestions, and real-time analytics dashboards. We integrated multiple tools into a unified system that required minimal manual intervention.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80'
    ],
    results: [
      { label: 'Time Saved', value: '40+ hrs/week' },
      { label: 'Conversion Rate', value: '+150%' },
      { label: 'ROI Increase', value: '+200%' },
      { label: 'Lead Quality', value: '+85%' }
    ],
    nextProject: {
      slug: 'social-media-campaign',
      title: 'Social Media Campaign'
    }
  },
  'social-media-campaign': {
    title: 'Social Media Campaign',
    year: '2024',
    category: 'Digital Marketing',
    heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80',
    description: 'A viral social media campaign that reached 2M+ impressions in 30 days, driving unprecedented engagement and brand awareness for a growing e-commerce brand.',
    client: 'Fashion Brand Co.',
    services: ['Social Media Strategy', 'Content Creation', 'Community Management'],
    duration: '2 months',
    link: null,
    challenge: 'The brand had minimal social media presence and struggled to stand out in a saturated market. Their content was inconsistent, engagement was low, and they lacked a clear strategy to connect with their target audience.',
    solution: 'We developed a data-driven social media strategy focused on authentic storytelling and user-generated content. Created a content calendar with diverse formats (Reels, Stories, Posts), implemented influencer partnerships, and launched interactive campaigns that encouraged audience participation.',
    images: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1600&q=80',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1600&q=80'
    ],
    results: [
      { label: 'Impressions', value: '2M+' },
      { label: 'Engagement Rate', value: '+320%' },
      { label: 'Followers Growth', value: '+450%' },
      { label: 'Sales Increase', value: '+180%' }
    ],
    nextProject: {
      slug: 'ai-marketing-automation',
      title: 'AI Marketing Automation'
    }
  }
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

  const allProjects = [
    { id: 1, slug: 'ai-marketing-automation', title: 'AI Marketing Automation', category: 'AI & Automation', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80' },
    { id: 2, slug: 'social-media-campaign', title: 'Social Media Campaign', category: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80' },
    { id: 3, slug: 'ecommerce-platform', title: 'E-Commerce Platform', category: 'Web Design', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
    { id: 4, slug: 'discord-community', title: 'Discord Community', category: 'Community Management', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600&q=80' },
    { id: 5, slug: 'team-workflow', title: 'Team Workflow System', category: 'Team Enablement', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
    { id: 6, slug: 'ai-workshop', title: 'AI Workshop Series', category: 'Training & Workshops', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' }
  ]

  const otherProjects = allProjects.filter(p => p.slug !== slug)

  useEffect(() => {
    const projectData = projectsData[slug]
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
          <img src={project.heroImage} alt={project.title} />
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
            <p>{project.description}</p>
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
        {project.images.map((image, index) => (
          <motion.div
            key={index}
            className="gallery-image"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <img src={image} alt={`${project.title} - Image ${index + 1}`} />
          </motion.div>
        ))}
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
          {project.results.map((result, index) => (
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
              <Link to={`/projects/${proj.slug}`} className="more-project-link">
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
