"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';
import { ServiceCard } from './ServiceCard';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const handleCardClick = (serviceId: string) => {
    setOpenCardId(prevId => prevId === serviceId ? null : serviceId);
  };

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !subtitleRef.current || !cardsRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;
    const cardElements = cards.children;

    // Set initial states
    gsap.set([header, subtitle], { 
      opacity: 0, 
      y: 50 
    });

    gsap.set(cardElements, { 
      opacity: 0, 
      y: 80,
      scale: 0.95
    });

    // Create timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate header first
    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    // Then subtitle
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    // Then stagger the cards
    .to(cardElements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.2");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen bg-black pt-32 pb-12 lg:pt-40 lg:pb-16 px-4 lg:px-8 relative overflow-hidden mt-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#eb5e28] rounded-full" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-[#eb5e28] rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#eb5e28]/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div ref={headerRef}>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#efeeea] uppercase tracking-[0.15em] mb-6">
              What I Can{' '}
              <span className="relative inline-block">
                Do
                <div className="absolute inset-0 bg-[#eb5e28] -z-10 transform -skew-x-12 animate-draw-highlight" style={{ animationDelay: '0.5s' }}></div>
              </span>
              {' '}For{' '}
              <span className="relative inline-block">
                You
                <div className="absolute inset-0 bg-[#eb5e28] -z-10 transform -skew-x-12 animate-draw-highlight" style={{ animationDelay: '0.8s' }}></div>
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-lg lg:text-xl text-[#efeeea]/80 max-w-3xl leading-relaxed">
              Good content speaks. Great content listens first. I don't just write — I shape how brands are seen, heard, and remembered.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Left Column - Services Cards */}
          <div ref={cardsRef} className="space-y-4 lg:space-y-6">
            {services.map((service, index) => (
              <div key={service.id}>
                <ServiceCard
                  service={service}
                  isOpen={openCardId === service.id}
                  onClick={() => handleCardClick(service.id)}
                  index={index}
                />
                {/* خط فاصل بين الخدمات */}
                {index < services.length - 1 && (
                  <div className="w-full h-px bg-[#efeeea]/10 mt-4 lg:mt-6" />
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Stats & Contact Info */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32">
              <div className="space-y-12">
                
                {/* Statistics */}
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#eb5e28] mb-2">7</div>
                    <div className="text-[#efeeea] text-lg font-medium">Years of Experience</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#eb5e28] mb-2">150</div>
                    <div className="text-[#efeeea] text-lg font-medium">Completed Projects</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#eb5e28] mb-2">78+</div>
                    <div className="text-[#efeeea] text-lg font-medium">Clients on Worldwide</div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6 pt-8 border-t border-[#eb5e28]/20">
                  <div>
                    <div className="text-[#efeeea] text-sm mb-1">Call Today :</div>
                    <a 
                      href="tel:+201226695816" 
                      className="text-[#eb5e28] text-lg font-medium hover:text-[#d54e1f] transition-colors"
                    >
                      +201226695816
                    </a>
                  </div>
                  
                  <div>
                    <div className="text-[#efeeea] text-sm mb-1">Email :</div>
                    <a 
                      href="mailto:mekky@example.com" 
                      className="text-[#efeeea] text-sm hover:text-[#eb5e28] transition-colors break-all"
                    >
                      mekky@example.com
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="pt-4">
                  <a 
                    href="https://linkedin.com/in/muhammed-mekky" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 bg-[#0077b5] rounded-lg hover:bg-[#005885] transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>

                {/* My Story Button */}
                <div className="pt-8">
                  <button className="group relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-[#eb5e28] w-32 h-32 group-hover:scale-110 transition-transform duration-300"></div>
                    <span className="text-[#eb5e28] font-bold text-sm uppercase tracking-wider group-hover:text-[#d54e1f] transition-colors duration-300">
                      MY STORY
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#eb5e28]/10 rounded-full border border-[#eb5e28]/30">
            <span className="text-[#efeeea] font-medium">Ready to get started?</span>
            <div className="w-2 h-2 bg-[#eb5e28] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
