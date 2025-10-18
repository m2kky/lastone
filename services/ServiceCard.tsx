"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/data/services';
import Image from 'next/image';

interface ServiceCardProps {
  service: Service;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

export function ServiceCard({ service, isOpen, onClick, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      checkIsDesktop();
      window.addEventListener('resize', checkIsDesktop);
      
      return () => window.removeEventListener('resize', checkIsDesktop);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    
    // Get mouse position relative to the element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setIsHovered(false);
    }
  };

  return (
    <div className="relative">
      {/* Service Card */}
      <div
        className={`
          relative overflow-hidden
          transition-all duration-300 ease-out cursor-pointer
          hover:scale-[1.02]
          ${isOpen ? '' : ''}
        `}
        onClick={onClick}
      >
        {/* Card Header */}
        <div 
          className="p-6 lg:p-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Service Icon */}
              <div className="text-2xl lg:text-3xl">
                {service.icon}
              </div>
              
              {/* Service Title */}
              <div>
                <h3 className={`text-lg lg:text-xl font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                  (isHovered && isDesktop) || isOpen ? 'text-[#eb5e28]' : 'text-[#efeeea]'
                }`}>
                  {index + 1}. {service.title}
                </h3>
              </div>
            </div>

            {/* Expand/Collapse Arrow - نفس شكل الاسكرين شوت */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#efeeea] text-xl"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 lg:px-8 pb-6 lg:pb-8 space-y-4">
                {/* Service Points */}
                <div className="space-y-3">
                  {service.points.map((point, pointIndex) => (
                    <motion.div
                      key={pointIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: pointIndex * 0.1,
                        ease: "easeOut"
                      }}
                      className="flex items-start gap-3"
                    >
                      {/* Check Mark */}
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#eb5e28] flex items-center justify-center mt-0.5">
                        <svg 
                          className="w-3 h-3 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                      
                      {/* Point Text */}
                      <p className="text-[#efeeea]/80 text-sm lg:text-base leading-relaxed">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Glow Effect - شيلناه */}
      </div>

      {/* Hover Image Preview - Desktop Only */}
      <AnimatePresence>
        {isHovered && isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none lg:block hidden"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y + 10,
            }}
          >
            <div className="relative w-48 h-32 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium truncate">
                  {service.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
