import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import './projects.css'

const projects = [
  {
    id: 1,
    title: 'AI Marketing Automation',
    category: 'AI & Automation',
    description: 'Automated marketing workflows saving 40+ hours per week',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['AI', 'Automation', 'Marketing']
  },
  {
    id: 2,
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description: 'Viral campaign reaching 2M+ impressions in 30 days',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    tags: ['Social Media', 'Campaigns', 'Growth']
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web Design',
    description: 'Modern e-commerce site with 3x conversion rate',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['Web Design', 'E-Commerce', 'UX']
  },
  {
    id: 4,
    title: 'Discord Community',
    category: 'Community Management',
    description: 'Built engaged community of 5,000+ active members',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
    tags: ['Community', 'Discord', 'Engagement']
  },
  {
    id: 5,
    title: 'Team Workflow System',
    category: 'Team Enablement',
    description: 'Notion-based system improving team efficiency by 60%',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    tags: ['Notion', 'Workflow', 'Productivity']
  },
  {
    id: 6,
    title: 'AI Workshop Series',
    category: 'Training & Workshops',
    description: 'Trained 500+ professionals in AI-driven marketing',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    tags: ['Training', 'AI', 'Workshops']
  }
]

function FAQsSection() {
  const [openIndex, setOpenIndex] = useState(null)
  
  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'I specialize in AI & Automation, Digital Marketing, Web Design, Community Management, Team Enablement, and Training & Workshops. Each service is tailored to help businesses scale efficiently.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. Small projects typically take 2-4 weeks, while larger implementations can take 2-3 months. I always provide a detailed timeline during our initial consultation.'
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Absolutely! I work with clients across 15+ countries. All communication is done remotely through video calls, project management tools, and regular updates to ensure seamless collaboration.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Pricing depends on project scope, complexity, and timeline. I offer both project-based and retainer options. Contact me for a custom quote tailored to your specific needs.'
    },
    {
      question: 'Can you help with ongoing support and maintenance?',
      answer: 'Yes! I offer ongoing support packages for all services. This includes regular updates, optimization, troubleshooting, and strategic consulting to ensure continued success.'
    },
    {
      question: 'What makes your approach different?',
      answer: 'I combine AI-driven automation with human creativity. My focus is on delivering measurable results, not just deliverables. Every solution is data-backed and designed to scale with your business.'
    }
  ]

  return (
    <section className="faqs-section">
      <div className="faqs-container">
        <motion.h2 
          className="faqs-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.h2>
        
        <div className="faqs-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className="faq-icon"
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRequestForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', companySize: '', website: '', linkedin: '', service: '', customService: '', budget: '', customBudget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="project-request-form">
      <div className="form-container">
        <motion.h2
          className="form-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          START YOUR PROJECT
        </motion.h2>
        <motion.p
          className="form-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Fill out the form below and let's bring your vision to life
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="form-row">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <select
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
            >
              <option value="">Company Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="url"
              placeholder="Website URL (optional)"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <input
              type="url"
              placeholder="LinkedIn URL (optional)"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>

          <div className="form-row">
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value, customService: '' })}
              required
            >
              <option value="">Select Service</option>
              <option value="ai">AI & Automation</option>
              <option value="marketing">Digital Marketing</option>
              <option value="web">Web Design</option>
              <option value="community">Community Management</option>
              <option value="team">Team Enablement</option>
              <option value="training">Training & Workshops</option>
              <option value="other">Other</option>
            </select>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value, customBudget: '' })}
              required
            >
              <option value="">Budget Range</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k+">$25,000+</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.service === 'other' && (
            <input
              type="text"
              placeholder="Please specify your service"
              value={formData.customService}
              onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
              required
            />
          )}

          {formData.budget === 'other' && (
            <input
              type="text"
              placeholder="Please specify your budget"
              value={formData.customBudget}
              onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
              required
            />
          )}

          <textarea
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="6"
            required
          />

          <button type="submit" className="form-submit-btn">
            {submitted ? 'Request Sent!' : 'Submit Request'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}

function ProjectsCarousel() {
  return (
    <div className="projects-carousel-section">
      <h2 className="carousel-title">Featured Projects</h2>
      
      <Swiper
        effect="creative"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        className="projects-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="carousel-card">
              <img src={project.image} alt={project.title} />
              <div className="carousel-card-overlay">
                <h3>{project.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const categories = ['All', 'AI & Automation', 'Digital Marketing', 'Web Design', 'Community Management', 'Team Enablement', 'Training & Workshops']
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero">
        <motion.h1 
          className="projects-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          FEATURED PROJECTS
        </motion.h1>
        <motion.p 
          className="projects-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transforming ideas into AI-driven solutions
        </motion.p>
        
        <motion.div 
          className="projects-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="projects-stat">
            <span className="stat-value">84+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="projects-stat">
            <span className="stat-value">50+</span>
            <span className="stat-label">Clients</span>
          </div>
          <div className="stat-divider" />
          <div className="projects-stat">
            <span className="stat-value">15</span>
            <span className="stat-label">Countries</span>
          </div>
        </motion.div>
      </section>

      {/* Carousel */}
      <ProjectsCarousel />

      {/* Filters */}
      <section className="projects-filters">
        <div className="filters-wrapper">
          <div className="filters-container">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="projects-grid-section">
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <a href="#" className="project-link">
                  View Details
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <FAQsSection />

      {/* Project Request Form */}
      <ProjectRequestForm />
    </div>
  )
}
