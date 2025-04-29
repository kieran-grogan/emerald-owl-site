'use client';

import { motion } from 'framer-motion';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerType = 'circle' | 'dots' | 'pulse';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
  type?: SpinnerType;
  text?: string;
}

// Size mapping for different spinner sizes
const sizeMap = {
  sm: {
    height: '1.5rem',
    width: '1.5rem',
    text: 'text-xs'
  },
  md: {
    height: '2.5rem',
    width: '2.5rem',
    text: 'text-sm'
  },
  lg: {
    height: '4rem',
    width: '4rem',
    text: 'text-base'
  }
};

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'text-emerald-500', 
  type = 'circle',
  text
}: LoadingSpinnerProps) {
  const dimensions = sizeMap[size];
  
  // Render different spinner types
  const renderSpinner = () => {
    switch(type) {
      case 'dots':
        return <DotsSpinner dimensions={dimensions} color={color} />;
      case 'pulse':
        return <PulseSpinner dimensions={dimensions} color={color} />;
      case 'circle':
      default:
        return <CircleSpinner dimensions={dimensions} color={color} />;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      {renderSpinner()}
      {text && (
        <p className={`mt-2 ${dimensions.text} ${color}`}>{text}</p>
      )}
    </div>
  );
}

// Circle spinner with rotating animation
const CircleSpinner = ({ dimensions, color }: { dimensions: any, color: string }) => (
  <motion.div
    style={{
      height: dimensions.height,
      width: dimensions.width,
      borderRadius: '50%',
      border: '2px solid rgba(0, 0, 0, 0.1)',
      borderTopColor: 'currentColor',
    }}
    className={color}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Dots spinner with staggered animation
const DotsSpinner = ({ dimensions, color }: { dimensions: any, color: string }) => {
  const containerSize = dimensions.height;
  const dotSize = `calc(${containerSize} / 5)`;
  
  return (
    <div style={{ 
      width: dimensions.width, 
      height: dimensions.height 
    }} className="relative flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${color}`}
          style={{
            width: dotSize,
            height: dotSize,
            x: `calc(${i - 1} * ${dotSize} * 2)`
          }}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Pulse spinner with scale animation
const PulseSpinner = ({ dimensions, color }: { dimensions: any, color: string }) => (
  <motion.div
    style={{
      height: dimensions.height,
      width: dimensions.width,
      borderRadius: '50%',
    }}
    className={color}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.6, 0.8, 0.6]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
); 