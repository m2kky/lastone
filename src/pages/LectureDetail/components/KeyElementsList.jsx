import { motion } from 'framer-motion';

export default function KeyElementsList({ elements }) {
  return (
    <section className="key-elements-section">
      <div className="key-elements-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          العناصر الرئيسية
        </motion.h2>

        <div className="key-elements-grid">
          {elements.map((element, index) => (
            <motion.div
              key={index}
              className="key-element-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="key-element-text">{element}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}