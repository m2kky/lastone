import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './notfound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <motion.div
          className="notfound-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="notfound-number">404</div>
          <h1 className="notfound-title">PAGE NOT FOUND</h1>
          <p className="notfound-description">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <div className="notfound-actions">
            <Link to="/" className="btn-primary">
              Back to Home
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link to="/projects" className="btn-secondary">
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;