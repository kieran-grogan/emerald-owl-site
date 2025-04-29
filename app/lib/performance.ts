import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

interface DynamicImportOptions {
  ssr?: boolean;
  loading?: ComponentType;
  suspense?: boolean;
}

/**
 * Utility function to dynamically import components with consistent loading states
 */
export function dynamicComponent<T>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicImportOptions = {}
) {
  const {
    ssr = true,
    loading: LoadingComponent,
    suspense = false,
  } = options;

  return dynamic(importFunc, {
    ssr,
    loading: LoadingComponent,
    suspense,
  });
}

/**
 * Utility function to preload components
 */
export function preloadComponent(componentPath: string): void {
  const script = document.createElement('link');
  script.rel = 'modulepreload';
  script.href = componentPath;
  document.head.appendChild(script);
}

/**
 * Utility function to defer non-critical resources
 */
export function deferResource(url: string, type: 'script' | 'style'): void {
  if (typeof window === 'undefined') return;

  if (type === 'script') {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    document.body.appendChild(script);
  } else {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  }
}

/**
 * Utility function to optimize images with blur placeholder
 */
export function getImageProps(src: string, width: number, height: number) {
  return {
    src,
    width,
    height,
    loading: 'lazy' as const,
    placeholder: 'blur',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj06MzI+RUFEWll6Xl5meGVlgYF4eXj/2wBDARUXFx4aHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  };
}

/**
 * Hook to defer component mounting until after initial render
 */
export function useDeferredMount(callback: () => void, delay: number = 0) {
  if (typeof window === 'undefined') return;

  const timeoutId = setTimeout(() => {
    callback();
  }, delay);

  return () => clearTimeout(timeoutId);
}

/**
 * Constants for performance optimization
 */
export const PERFORMANCE_CONFIG = {
  // Image sizes for different breakpoints
  imageSizes: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Lazy loading thresholds
  lazyLoadThreshold: '100px',
  
  // Preload critical resources
  criticalResources: [
    '/fonts/main.woff2',
    '/css/critical.css',
  ],
  
  // Defer non-critical resources
  deferredResources: {
    scripts: [
      '/js/analytics.js',
      '/js/chat-widget.js',
    ],
    styles: [
      '/css/print.css',
      '/css/animations.css',
    ],
  },
}; 