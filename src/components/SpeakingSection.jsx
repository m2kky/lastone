"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./speaking.css";

// Past sessions data
const pastSessions = [
  {
    id: 1,
    title: "AI-Driven Marketing Automation",
    event: "TechCrunch Disrupt 2024",
    thumbnail: "/images/speaking/speaker.jpg",
    duration: "45 min"
  },
  {
    id: 2,
    title: "Building Scalable Growth Systems",
    event: "Startup Grind Global",
    thumbnail: "/images/speaking/speaker2.jpg",
    duration: "30 min"
  },
  {
    id: 3,
    title: "Performance Marketing in 2024",
    event: "Marketing Land Summit",
    thumbnail: "/images/speaking/audience.jpg",
    duration: "60 min"
  },
  {
    id: 4,
    title: "Team Enablement Strategies",
    event: "HR Tech Conference",
    thumbnail: "/images/speaking/speaker.jpg",
    duration: "40 min"
  }
];

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="scroll-indicator"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 13l3 3 3-3M7 6l3 3 3-3"/>
      </svg>
    </motion.div>
  );
};

export default function SpeakingSection() {
  const sectionRef = useRef(null);
  const [showSessions, setShowSessions] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spotlight animation - stays longer
  const spotlightScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  
  // Content animations - fade out later
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Sessions grid animation - starts later
  const sessionsY = useTransform(scrollYProgress, [0.4, 0.9], [100, 0]);
  const sessionsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} className="speaking-section" role="region" aria-labelledby="speaking-title">
      {/* Dark background with audience */}
      <div className="speaking-bg" aria-hidden="true">
        <img src="/images/speaking/audience.jpg" alt="Audience background" className="bg-img" />
      </div>

      {/* Spotlight effect */}
      <motion.div 
        className="spotlight"
        style={{ 
          scale: spotlightScale,
          opacity: spotlightOpacity
        }}
      />

      {/* Main content - centered */}
      <div className="speaking-container">
        <motion.div 
          className="speaking-hero"
          style={{ 
            y: contentY,
            opacity: contentOpacity
          }}
        >
          {/* Speaker image with spotlight */}
          <div className="speaker-spotlight">
            <img 
              src="/images/speaking/speaker.jpg" 
              alt="Muhammed Mekky" 
              className="speaker-image"
            />
          </div>

          {/* Title and content */}
          <h1 className="speaking-title">
            SPEAKING
            <br />
            ENGAGEMENTS
          </h1>

          <p className="speaking-tagline">
            Inspiring teams to work smarter through automation, AI, and performance strategy.
          </p>

          {/* Action buttons */}
          <div className="speaking-actions">
            <motion.a 
              href="/watch-highlights" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Highlights
            </motion.a>

            <motion.a 
              href="/book-workshop" 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Workshop
            </motion.a>
          </div>

          {/* Scroll indicator */}
          <ScrollIndicator />
        </motion.div>

        {/* Past sessions grid - appears on scroll */}
        <motion.div 
          className="sessions-grid"
          style={{ 
            y: sessionsY,
            opacity: sessionsOpacity
          }}
        >
          <h3 className="sessions-title">Recent Sessions</h3>
          <div className="sessions-list">
            {pastSessions.map((session) => (
              <motion.div 
                key={session.id}
                className="session-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="session-thumbnail">
                  <img src={session.thumbnail} alt={session.title} />
                  <div className="session-duration">{session.duration}</div>
                </div>
                <div className="session-info">
                  <h4 className="session-title">{session.title}</h4>
                  <p className="session-event">{session.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
