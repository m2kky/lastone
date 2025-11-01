import { motion } from 'framer-motion';

export default function Hero({ lecture }) {
  return (
    <section className="lecture-hero">
      <div className="lecture-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lecture-category">محاضرة</div>
          <h1 className="lecture-title">{lecture.title}</h1>
          <p className="lecture-subtitle">{lecture.subtitle}</p>
        </motion.div>

        <motion.div
          className="lecture-meta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="meta-item">
            <span className="meta-label">المدة</span>
            <span className="meta-value">{lecture.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">السنة</span>
            <span className="meta-value">{lecture.year}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">المستوى</span>
            <span className="meta-value">{lecture.level}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">اللغة</span>
            <span className="meta-value">{lecture.language}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}