'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopProps {
  threshold?: number;
  position?: 'bottom-right' | 'bottom-left';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: {
    button: 'w-8 h-8',
    icon: 'w-4 h-4',
    spacing: 'bottom-4 right-4'
  },
  md: {
    button: 'w-10 h-10',
    icon: 'w-5 h-5',
    spacing: 'bottom-6 right-6'
  },
  lg: {
    button: 'w-12 h-12',
    icon: 'w-6 h-6',
    spacing: 'bottom-8 right-8'
  }
};

export default function ScrollToTop({ 
  threshold = 300, 
  position = 'bottom-right',
  color = 'bg-emerald-500 hover:bg-emerald-600 text-white',
  size = 'md'
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sizeValues = sizeMap[size];
  
  // Determine position classes
  const positionClasses = position === 'bottom-left' 
    ? sizeValues.spacing.replace('right', 'left')
    : sizeValues.spacing;

  useEffect(() => {
    // Show button when page is scrolled down
    const toggleVisibility = () => {
      window.scrollY > threshold 
        ? setIsVisible(true)
        : setIsVisible(false);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed ${positionClasses} ${sizeValues.button} ${color} rounded-full flex items-center justify-center shadow-lg z-50`}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <svg 
            className={`${sizeValues.icon}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 