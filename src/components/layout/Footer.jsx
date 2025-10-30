import '../../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">Muhammed Mekky</h3>
            <p className="footer-tagline">Create, Automate & Grow</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#speaking">Speaking</a>
          </div>

          <div className="footer-links">
            <h4>Connect</h4>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="mailto:hello@mekky.com">hello@mekky.com</a>
            <a href="tel:+201234567890">+20 123 456 7890</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Muhammed Mekky. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
