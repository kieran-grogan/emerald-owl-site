import dynamic from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

/**
 * Default loading component for lazy-loaded components
 */
const DefaultLoading = () => (
  <div role="status" className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
);

/**
 * Configuration for lazy loading
 */
export interface LazyLoadConfig {
  ssr?: boolean;
  loading?: ComponentType;
  suspense?: boolean;
  priority?: boolean;
}

/**
 * Lazy load a component with default configuration
 */
export function lazyLoad<T = any>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  config: LazyLoadConfig = {}
) {
  const {
    ssr = true,
    loading = DefaultLoading,
    suspense = false,
    priority = false
  } = config;

  return dynamic(importFunc, {
    ssr,
    loading,
    suspense
  });
}

/**
 * Lazy load a media component (image, video, etc.)
 */
export function lazyLoadMedia(path: string): Promise<string> {
  if (!path.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i)) {
    return Promise.resolve(path);
  }

  return new Promise((resolve) => {
    const media = path.match(/\.(mp4|webm)$/i)
      ? document.createElement('video')
      : new Image();

    media.onload = () => resolve(path);
    media.onerror = () => resolve(path); // Resolve anyway to prevent blocking
    if ('src' in media) media.src = path;
  });
}

/**
 * Lazy load components based on viewport visibility
 */
export function createLazyComponent<P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: ReactNode
) {
  return lazyLoad(importFunc, {
    suspense: true,
    loading: () => <>{fallback || <DefaultLoading />}</>
  });
}

/**
 * Preload a component for faster subsequent loading
 */
export function preloadComponent(path: string): void {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = path;
  document.head.appendChild(link);
}

/**
 * Map of components that should always be preloaded
 */
export const PRELOAD_COMPONENTS = [
  '/components/navigation/Header',
  '/components/navigation/Footer',
  '/components/content/PageContent',
  '/components/media/ImageGallery',
  '/components/forms/ContactForm'
];

/**
 * Initialize preloading of critical components
 */
export function initializePreloading(): void {
  if (typeof window === 'undefined') return;
  
  // Preload critical components
  PRELOAD_COMPONENTS.forEach(preloadComponent);
  
  // Preload components based on user interaction
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.dataset.preload) {
      preloadComponent(target.dataset.preload);
    }
  });
} 