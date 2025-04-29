'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// FadeIn component for simple fade in animations
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = ''
}: { 
  children: ReactNode; 
  delay?: number; 
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

// ScaleIn component for scale in animations
export const ScaleIn = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// HoverScale component that scales on hover
export const HoverScale = ({ 
  children, 
  scale = 1.05 
}: { 
  children: ReactNode; 
  scale?: number;
}) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {children}
  </motion.div>
);

// SectionEntrance component that triggers when section comes into view
export const SectionEntrance = ({ 
  children, 
  direction = "up",
  delay = 0,
  className = ''
}: { 
  children: ReactNode; 
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) => {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 50 };
      case "down": return { opacity: 0, y: -50 };
      case "left": return { opacity: 0, x: 50 };
      case "right": return { opacity: 0, x: -50 };
      default: return { opacity: 0, y: 50 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up": case "down": return { opacity: 1, y: 0 };
      case "left": case "right": return { opacity: 1, x: 0 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Main PageTransition component
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 