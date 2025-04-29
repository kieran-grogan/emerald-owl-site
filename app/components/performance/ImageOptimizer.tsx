'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageOptimizerProps {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt: string;
  /**
   * Width of the image in pixels
   */
  width?: number;
  /**
   * Height of the image in pixels
   */
  height?: number;
  /**
   * CSS class names
   */
  className?: string;
  /**
   * Priority loading for LCP images (above the fold)
   */
  priority?: boolean;
  /**
   * Loading strategy (lazy or eager)
   */
  loading?: 'lazy' | 'eager';
  /**
   * Whether to use blur effect while loading
   */
  useBlur?: boolean;
  /**
   * Fill container (used with aspect ratio containers)
   */
  fill?: boolean;
  /**
   * Object fit property
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /**
   * OnLoad callback
   */
  onLoad?: () => void;
}

/**
 * Optimized image component that extends Next.js Image with additional features
 * Handles lazy loading, blur placeholders, and error states
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading,
  useBlur = true,
  fill = false,
  objectFit = 'cover',
  onLoad,
  ...props
}: ImageOptimizerProps & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height' | 'loading'>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    // Fallback to a placeholder for error state
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          position: fill ? 'absolute' : 'relative',
        }}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div
      className={`relative ${!isLoaded && useBlur ? 'overflow-hidden' : ''} ${className}`}
      style={{ width: fill ? '100%' : undefined, height: fill ? '100%' : undefined }}
    >
      {!isLoaded && useBlur && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ zIndex: 1 }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        fill={fill}
        style={{ objectFit: fill ? objectFit : undefined }}
        className={`${className} ${fill ? 'object-' + objectFit : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

/**
 * Hook to determine if an image should load with priority based on viewport
 * Helps optimize LCP (Largest Contentful Paint) for critical images
 */
export const usePriorityImage = (isAboveTheFold: boolean): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, we prioritize more images due to slower connections
  // On desktop, we only prioritize truly above-the-fold images
  return isAboveTheFold || (isMobile && isAboveTheFold);
}; 