import { motion } from 'framer-motion';

export default function SpeakerCard({ speaker }) {
  if (!speaker) return null;

  return (
    <section className="speaker-section">
      <div className="key-elements-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          المحاضر
        </motion.h2>
        <motion.div
          className="speaker-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img src={speaker.image} alt={speaker.name} className="speaker-image" />
          <div className="speaker-details">
            <h3 className="speaker-name">{speaker.name}</h3>
            <p className="speaker-role">{speaker.role}</p>
            <p className="speaker-bio">{speaker.bio}</p>
            {speaker.link && (
              <a href={speaker.link} target="_blank" rel="noopener noreferrer" className="speaker-link">
                عرض الملف الشخصي
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}