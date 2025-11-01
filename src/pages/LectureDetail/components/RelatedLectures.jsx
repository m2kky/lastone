import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RelatedLectures({ lectures }) {
  if (!lectures || lectures.length === 0) return null;

  return (
    <section className="related-lectures-section">
      <div className="key-elements-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          محاضرات ذات صلة
        </motion.h2>
        <div className="key-elements-grid">
          {lectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/lectures/${lecture.id}`} className="related-lecture-card">
                <h3 className="related-lecture-title">{lecture.title}</h3>
                <p className="related-lecture-subtitle">{lecture.subtitle || lecture.summary}</p>
                <span className="related-lecture-arrow">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}