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
          <h1 className="notfound-title">الصفحة غير موجودة</h1>
          <p className="notfound-description">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر
          </p>
          
          <div className="notfound-actions">
            <Link to="/" className="btn-primary">
              العودة للرئيسية
            </Link>
            <Link to="/projects" className="btn-secondary">
              تصفح المشاريع
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          className="notfound-animation"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="floating-elements">
            <div className="element element-1"></div>
            <div className="element element-2"></div>
            <div className="element element-3"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;