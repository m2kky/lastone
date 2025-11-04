// src/components/TestimonialsSection.jsx
// Client testimonials section with responsive design + counter animation
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/testimonials.css";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const testimonials = [
    {
      id: "Mahmoud-Sobhy Abd",
      name: "Mahmoud Sobhy Abd ElFattah",
      role: "CTO at TechFlow Solutions",
      quote: "Thank you, Mekky! Honestly, I learned so much from your session. It completely changed how I see AI — in a way I never imagined before. You really opened my mind. Wishing you all the success, always! ❤️",
      avatar: "images/testimonials/mahmoud.jpg",
      rating: 5
    },
    {
      id: "MuhammedAladawy",
      name: "Muhammed Aladawy", 
      role: "Copywriter & Trainer",
      quote: "“An amazing session! Even though I was exhausted from work, I had to join just to see this brilliance. You truly lit up our minds, my friend! 💚💚”",
      avatar: "images/testimonials/MuhammedAladawy.jpg",
      rating: 5
    },
    {
      id: "Muhammed-Saeed",
      name: "Muhammed Saeed",
      role: "Media Buyer", 
      quote: "“It was a world-class session! For the first time, I learned about something called a ‘Framework’ — I even tried it in my own work, and it gave me incredible results! ❤️🔥”",
      avatar: "/images/testimonials/muhammedsaeed.jpg",
      rating: 5
    },
    {
      id: "Samia",
      name: "Samia Eltayib Arafa",
      role: "Training & Development Director",
      quote: "“I really enjoyed the session! Every single thing you shared was valuable and useful. Thank you so much for such an inspiring experience. 🤍”",
      avatar: "/images/testimonials/samia.jpg", 
      rating: 5
    }
  ];

  const stats = [
    {
      id: "satisfaction",
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "I've worked with 50+ happy clients",
      color: "white"
    },
    {
      id: "growth", 
      value: 200,
      suffix: "%",
      label: "Growth",
      description: "My work helped clients grow their revenue by 200%",
      color: "red"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Counter animation for stats only
    const statsElements = statsRef.current?.querySelectorAll('.stats-value') || [];
    statsElements.forEach((el, index) => {
      const target = stats[index].value;
      const suffix = stats[index].suffix;
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: target,
        duration: Math.min(2.2, 0.02 * target + 0.8),
        ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          const v = Math.round(obj.val);
          el.textContent = `${v}${suffix}`;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [stats]);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="star">★</span>
    ));
  };

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">WHAT MY CLIENTS SAY</h2>
          <p className="testimonials-description">
            Here's what my clients have shared about their experiences working with me. Their trust and satisfaction motivate me to continue delivering designs that make an impact.
          </p>
        </div>

        <div ref={statsRef} className="testimonials-grid">
          {/* Desktop: 2x3 grid, Mobile: 1 column */}
          <div className="testimonial-card">
            <div className="stars">{renderStars(5)}</div>
            <p className="quote">"{testimonials[0].quote}"</p>
            <div className="client-info">
              <img src={testimonials[0].avatar} alt={testimonials[0].name} className="avatar" />
              <div className="client-details">
                <h4 className="client-name">{testimonials[0].name}</h4>
                <p className="client-role">{testimonials[0].role}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">{renderStars(5)}</div>
            <p className="quote">"{testimonials[1].quote}"</p>
            <div className="client-info">
              <img src={testimonials[1].avatar} alt={testimonials[1].name} className="avatar" />
              <div className="client-details">
                <h4 className="client-name">{testimonials[1].name}</h4>
                <p className="client-role">{testimonials[1].role}</p>
              </div>
            </div>
          </div>

          <div className={`stats-card ${stats[0].color}`}>
            <p className="stats-description">{stats[0].description}</p>
            <div className="stats-value">0{stats[0].suffix}</div>
            <p className="stats-label">{stats[0].label}</p>
          </div>

          <div className={`stats-card ${stats[1].color}`}>
            <p className="stats-description">{stats[1].description}</p>
            <div className="stats-value">0{stats[1].suffix}</div>
            <p className="stats-label">{stats[1].label}</p>
          </div>

          <div className="testimonial-card">
            <div className="stars">{renderStars(5)}</div>
            <p className="quote">"{testimonials[2].quote}"</p>
            <div className="client-info">
              <img src={testimonials[2].avatar} alt={testimonials[2].name} className="avatar" />
              <div className="client-details">
                <h4 className="client-name">{testimonials[2].name}</h4>
                <p className="client-role">{testimonials[2].role}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">{renderStars(5)}</div>
            <p className="quote">"{testimonials[3].quote}"</p>
            <div className="client-info">
              <img src={testimonials[3].avatar} alt={testimonials[3].name} className="avatar" />
              <div className="client-details">
                <h4 className="client-name">{testimonials[3].name}</h4>
                <p className="client-role">{testimonials[3].role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
