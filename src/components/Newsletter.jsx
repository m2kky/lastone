import { useState } from 'react';
import { motion } from 'framer-motion';
import './newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-subtitle">
            Get the latest insights, tips, and exclusive content delivered to your inbox
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>

          {status === 'success' && (
            <motion.p
              className="newsletter-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Thanks for subscribing!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
