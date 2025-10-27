"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./speaking.css";

/**
 * SpeakingSection.jsx
 * - Uses framer-motion for scroll-linked micro animations.
 * - Import speaking.css for styles.
 *
 * Notes:
 * - Replace image src paths with your real assets.
 * - Implement openVideoModal if you want clicking the big image to open a modal video.
 */

const AnimatedSemicircle = ({ position }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  const d = position === "top-right" ? "M 0 200 A 200 200 0 0 1 200 0" : "M 200 0 A 200 200 0 0 1 0 200";

  return (
    <div
      ref={ref}
      className={`semicircle ${position === "top-right" ? "sr-topright" : "sr-bottomleft"}`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" preserveAspectRatio="none" role="img" aria-hidden="true">
        <motion.path d={d} stroke="#EB5E28" strokeWidth="2" style={{ pathLength }} strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default function SpeakingSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });

  // motion transforms
  const speakerY = useTransform(scrollYProgress, [0.1, 0.9], [20, -40]);
  const speakerScale = useTransform(scrollYProgress, [0.1, 0.9], [0.98, 1.02]);

  const audienceY = useTransform(scrollYProgress, [0.1, 0.9], [-10, 30]);
  const audienceScale = useTransform(scrollYProgress, [0.1, 0.9], [1, 0.96]);

  return (
    <section id="speaking" ref={sectionRef} className="speaking-section" role="region" aria-labelledby="speaking-title">
      {/* Background dimmed image - Audience as background */}
      <div className="speaking-bg" aria-hidden="true">
        <img src="/images/speaking/audience.jpg" alt="Audience background" className="bg-img" />
      </div>

      <AnimatedSemicircle position="top-right" />
      <AnimatedSemicircle position="bottom-left" />

      <div className="speaking-container">
        {/* Left: images */}
        <div className="speaking-left">
          <motion.div style={{ y: speakerY, scale: speakerScale }} className="speaker-card">
            <button
              className="speaker-btn"
              type="button"
              aria-label="Play highlight video"
              // onClick={() => openVideoModal('/videos/highlight.mp4')}
            >
              <img src="/images/speaking/speaker.jpg" alt="Muhammed Mekky speaking" className="speaker-img" />
            </button>
          </motion.div>

          <motion.div style={{ y: audienceY, scale: audienceScale }} className="audience-card" aria-hidden="true">
            <img src="/images/speaking/speaker2.jpg" alt="Speaker headshot" className="audience-img" />
          </motion.div>
        </div>

        {/* Right: text */}
        <div className="speaking-right">
          <h2 id="speaking-title" className="speaking-title">
            SPEAKING
            <br />
            ENGAGEMENTS
          </h2>

          <div className="speaking-copy">
            <p>
              Muhammed Mekky delivers keynotes and workshops that empower teams to design smarter, AI-driven marketing systems.
              With 7+ years across marketing, automation and AI workflows, and dozens of speaking appearances, he brings practical
              frameworks teams can implement immediately.
            </p>

            <p>
              Whether addressing startups, corporate teams, or university audiences, his sessions blend strategy with storytelling —
              turning complex systems into actionable, human-centered practices.
            </p>
          </div>

          <div className="speaking-stats" aria-hidden="false">
            <div className="stat">
              <div className="stat-number">+7</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Speaking Events</div>
            </div>
            <div className="stat">
              <div className="stat-number">3,000+</div>
              <div className="stat-label">Professionals Trained</div>
            </div>
          </div>

          <div className="speaking-ctas">
            <motion.a 
              href="/book-workshop" 
              aria-label="Book a workshop" 
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.98 }}
            >
              Book a Workshop
            </motion.a>

            <motion.a 
              href="/speaking" 
              aria-label="View speaking sessions" 
              className="btn btn-outline"
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.98 }}
            >
              View Sessions
            </motion.a>
          </div>

          <blockquote className="speaking-quote" aria-label="Testimonial">
            "Muhammed's session restructured our team's approach to automation — from concept to delivery. Practical, clear and actionable."
            <cite className="quote-by">— Lina A., Head of Growth</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
