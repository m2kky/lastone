import { motion } from 'framer-motion'

const STAGGER = 0.025

export default function TextRoll({ children, className = '', hoverColor = '#EB5E28' }) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative overflow-hidden ${className}`}
      style={{ display: 'inline-block', lineHeight: 1.2, whiteSpace: 'nowrap' }}
    >
      <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {children.split('').map((l, i) => (
          <motion.span
            key={`top-${i}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: '-110%', color: hoverColor }
            }}
            transition={{
              ease: 'easeInOut',
              delay: STAGGER * i,
              duration: 0.3
            }}
            style={{ display: 'inline-block' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </span>
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap', width: '100%' }}>
        {children.split('').map((l, i) => (
          <motion.span
            key={`bottom-${i}`}
            variants={{
              initial: { y: '110%' },
              hovered: { y: 0, color: hoverColor }
            }}
            transition={{
              ease: 'easeInOut',
              delay: STAGGER * i,
              duration: 0.3
            }}
            style={{ display: 'inline-block' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </span>
    </motion.span>
  )
}
