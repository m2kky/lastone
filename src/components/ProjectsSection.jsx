// src/components/ProjectsSection.jsx
// Full image cards with grayscale hover effect + filters
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/projects.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'ai-automation', label: 'AI & Automation' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'web-design', label: 'Web Design' },
    { id: 'community', label: 'Community Management' },
    { id: 'team-enablement', label: 'Team Enablement & Workflow' }
  ];

  const projects = [
    {
      id: "next-level-biker",
      title: "NEXT LEVEL BIKER",
      subtitle: "Rebuilding brand credibility and driving sales for an outdoor & biker gear brand in the Saudi market.",
      badge: "Social Media Strategy",
      category: "digital-marketing",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "irok-goalkeeper",
      title: "IROK GOALKEEPER",
      subtitle: "Refocusing a brand's audience from international to a sales-driven, Saudi-based customer base for goalkeeper gear.",
      badge: "Audience Targeting",
      category: "digital-marketing",
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "toleen-fashion",
      title: "TOLEEN FASHION",
      subtitle: "Reigniting a luxury fashion brand's social presence and achieving viral organic growth after a one-year hiatus.",
      badge: "Content Creation",
      category: "community",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "sumu-alanaqh",
      title: "SUMU ALANAQH",
      subtitle: "Boosting customer trust and showcasing product quality for a traditional Saudi men's fashion brand.",
      badge: "Brand Trust",
      category: "web-design",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Clean up any existing triggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            A selection of projects where I blended strategy with creativity to drive engagement, growth, and real-world results for my clients.
          </p>
        </div>

        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card" 
              data-description={project.subtitle}
            >
              <div 
                className="project-image"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="project-overlay">
                  <span className="project-badge">{project.badge}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a href="#all-projects" className="cta-button">
            BROWSE ALL PROJECTS
            <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
