import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} Muhammed Mekky. All rights reserved.
        </p>
        <p className="footer-tagline">
          Create, Automate & Grow
        </p>
      </div>
    </footer>
  )
}
