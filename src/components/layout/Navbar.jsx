// Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './navbar.css'

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false)
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY || 0

      // أي حركة للأسفل (حتى 1px) => compact
      if (current > lastScrollYRef.current) {
        setIsCompact(true)
      }
      // أي حركة للأعلى => full
      else if (current < lastScrollYRef.current) {
        setIsCompact(false)
      }

      lastScrollYRef.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // أغلق الموبايل مِنو عند تغيير المسار
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/story' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' }
  ]

  return (
    <>
      <motion.nav
        initial={false}
        animate={{}}
        className={`navbar ${isCompact ? 'navbar--compact' : 'navbar--full'}`}
      >
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="navbar-avatar">
              <img src="/images/avatar.png" alt="Avatar" />
            </div>
            <Link to="/contact" className="navbar-status">
              <span className="status-text">Available for work</span>
              <span className="status-dot" aria-hidden="true"></span>
            </Link>
          </div>

          <div className="navbar-links" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <Link to="/contact" className="navbar-contact-btn">Contact</Link>

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="mobile-menu-links">
                {navLinks.map((link, idx) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}>
                    <Link to={link.path} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <Link to="/contact" className="mobile-contact-btn">Contact Me</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
