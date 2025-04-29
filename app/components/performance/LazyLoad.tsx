'use client';

import { Suspense, lazy, ComponentType, ReactNode, useState, useEffect } from 'react';

interface LazyLoadProps {
  /**
   * Children to render as fallback while the component is loading
   */
  fallback?: ReactNode;
  /**
   * Whether to skip lazy loading (useful for SSR critical components)
   */
  skipLazy?: boolean;
}

/**
 * Higher-order component for lazily loading components to improve initial load performance
 * @param importFn - Dynamic import function for the component
 * @returns A wrapped component that will be lazy loaded
 */
export const withLazyLoading = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: LazyLoadProps = {}
) => {
  const LazyComponent = lazy(importFn);
  
  const WrappedComponent = (props: P) => {
    const { fallback = <div role="status" className="min-h-[200px] animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" />, skipLazy = false } = options;
    
    if (skipLazy) {
      // For critical UI components that shouldn't be lazy loaded
      // We use dynamic import without lazy() when skipLazy is true
      const [Component, setComponent] = useState<ComponentType<P> | null>(null);
      
      useEffect(() => {
        let isMounted = true;
        importFn().then(module => {
          if (isMounted) {
            setComponent(() => module.default);
          }
        });
        return () => { isMounted = false; };
      }, []);
      
      return Component ? <Component {...props} /> : fallback;
    }

    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return WrappedComponent;
};

/**
 * Component for lazily loading below-the-fold content
 */
export const LazyContent = ({ 
  children, 
  fallback = <div role="status" className="min-h-[200px] animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" /> 
}: { 
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}; 