'use client';

import { useEffect, useState, ReactNode } from 'react';

interface DynamicImportProps<T> {
  /**
   * Import function that loads the module
   */
  importFn: () => Promise<T>;
  /**
   * Render function that takes the loaded module and returns JSX
   */
  render: (mod: T) => ReactNode;
  /**
   * Fallback content shown while loading
   */
  fallback?: ReactNode;
  /**
   * Error content shown if loading fails
   */
  errorContent?: ReactNode;
}

/**
 * Component that dynamically imports modules only when needed
 * Used for importing heavy libraries or components only when they're required
 */
export function DynamicImport<T>({
  importFn,
  render,
  fallback = <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-20 w-full rounded" />,
  errorContent = <div className="text-red-500 p-4">Failed to load component</div>
}: DynamicImportProps<T>) {
  const [module, setModule] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    importFn()
      .then((mod) => {
        if (isMounted) {
          setModule(mod);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Dynamic import failed:', err);
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [importFn]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (error || !module) {
    return <>{errorContent}</>;
  }

  return <>{render(module)}</>;
}

/**
 * Helper function to create a dynamic import component with predefined render logic
 * @param importFn Function that imports the component
 * @param props Props to pass to the component once loaded
 * @returns A component that will render the imported component when loaded
 */
export function createDynamicComponent<T, P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  props: P,
  options: {
    fallback?: ReactNode;
    errorContent?: ReactNode;
  } = {}
) {
  return (
    <DynamicImport
      importFn={importFn}
      render={(mod) => {
        const Component = mod.default;
        return <Component {...props} />;
      }}
      fallback={options.fallback}
      errorContent={options.errorContent}
    />
  );
} 