"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./speaking.css";

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
        <motion.path d={d} stroke="#E31B23" strokeWidth="2" style={{ pathLength }} strokeLinecap="round" />
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

  // Enhanced animations matching the original
  const doctorImageY = useTransform(scrollYProgress, [0.1, 0.9], [20, -60]);
  const doctorImageScale = useTransform(scrollYProgress, [0.1, 0.9], [0.95, 1.1]);
  
  const audienceImageY = useTransform(scrollYProgress, [0.1, 0.9], [-20, 40]);
  const audienceImageScale = useTransform(scrollYProgress, [0.1, 0.9], [1, 0.9]);

  return (
    <section ref={sectionRef} className="speaking-section" role="region" aria-labelledby="speaking-title">
      {/* Background dimmed image */}
      <div className="speaking-bg" aria-hidden="true">
        <img src="/images/speaking/background.jpg" alt="Audience background" className="bg-img" />
      </div>

      <AnimatedSemicircle position="top-right" />
      <AnimatedSemicircle position="bottom-left" />

      <div className="speaking-container">
        {/* Left: images */}
        <div className="speaking-left">
          <motion.div style={{ y: doctorImageY, scale: doctorImageScale }} className="speaker-card">
            <img src="/images/speaking/speaker.jpg" alt="Dr. Mahmoud Bravo Speaking" className="speaker-img" />
          </motion.div>

          <motion.div style={{ y: audienceImageY, scale: audienceImageScale }} className="audience-card" aria-hidden="true">
            <img src="/images/speaking/audience.jpg" alt="Audience" className="audience-img" />
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
              Dr. Mahmoud Bravo, one of the MENA region's most influential healthcare marketing leaders, is ready to inspire and empower your audience. With 15+ years of experience across global pharma giants and 50+ keynote appearances, Dr. Bravo brings unmatched insights on leadership, innovation, and transformation.
            </p>

            <p>
              Whether addressing healthcare professionals, corporate teams, or university students, his talks blend strategy with storytelling – making complex ideas simple, practical, and actionable.
            </p>
          </div>

          <div className="speaking-ctas">
            <motion.a 
              href="/enquiries" 
              aria-label="Speaking enquiries" 
              className="btn btn-outline"
              whileHover={{ backgroundColor: "#E31B23", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Speaking Enquiries
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
