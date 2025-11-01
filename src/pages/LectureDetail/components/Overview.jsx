import { motion } from 'framer-motion';

export default function Overview({ overview }) {
  return (
    <section className="lecture-overview">
      <div className="overview-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          نظرة عامة
        </motion.h2>
        
        <motion.div
          className="overview-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {overview}
        </motion.div>
      </div>
    </section>
  );
}