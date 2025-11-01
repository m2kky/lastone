import { motion } from 'framer-motion';

export default function ExamplesGallery({ examples }) {
  if (!examples || examples.length === 0) return null;

  return (
    <section className="examples-section">
      <div className="key-elements-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          أمثلة عملية
        </motion.h2>
        <div className="key-elements-grid">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className="key-element-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="example-title">{example.title}</h3>
              <p className="key-element-text">{example.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}