'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  domComplete: number;
  loadEvent: number;
}

interface PerformanceMonitorProps {
  /**
   * Component or element to monitor
   */
  children: React.ReactNode;
  /**
   * Whether to display monitoring information
   */
  showMetrics?: boolean;
  /**
   * Callback when metrics are calculated
   */
  onMetricsCalculated?: (metrics: PerformanceMetrics) => void;
  /**
   * Class name for the wrapper
   */
  className?: string;
  /**
   * Label for identifying the component in metrics
   */
  componentName?: string;
}

/**
 * Component that measures and displays performance metrics for its children
 * Useful for identifying slow-rendering components during development
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  children,
  showMetrics = false,
  onMetricsCalculated,
  className = '',
  componentName = 'Component'
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const renderStart = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize metrics once component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    renderStart.current = Date.now();
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Schedule metrics calculation after component renders
    timerRef.current = setTimeout(() => {
      const perfEntries = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (!perfEntries) return;
      
      const currentMetrics: PerformanceMetrics = {
        renderTime: Date.now() - renderStart.current,
        firstPaint: 0,
        firstContentfulPaint: 0,
        domComplete: perfEntries.domComplete,
        loadEvent: perfEntries.loadEventEnd
      };
      
      // Get paint metrics
      const paintMetrics = window.performance.getEntriesByType('paint');
      paintMetrics.forEach((entry) => {
        if (entry.name === 'first-paint') {
          currentMetrics.firstPaint = entry.startTime;
        } else if (entry.name === 'first-contentful-paint') {
          currentMetrics.firstContentfulPaint = entry.startTime;
        }
      });
      
      setMetrics(currentMetrics);
      
      if (onMetricsCalculated) {
        onMetricsCalculated(currentMetrics);
      }

      // Log performance issues
      if (currentMetrics.renderTime > 100) {
        console.warn(`[Performance] ${componentName} took ${currentMetrics.renderTime}ms to render (slow)`);
      }
    }, 0);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [componentName, onMetricsCalculated]);

  // Format time in ms for display
  const formatTime = useCallback((time: number): string => {
    return `${Math.round(time)}ms`;
  }, []);

  return (
    <div className={`perf-monitor ${className}`}>
      {children}
      
      {showMetrics && metrics && (
        <div className="perf-metrics text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 font-mono">
          <div className="font-semibold mb-1">{componentName} Performance:</div>
          <div>Render: {formatTime(metrics.renderTime)}</div>
          {metrics.firstPaint > 0 && (
            <div>First Paint: {formatTime(metrics.firstPaint)}</div>
          )}
          {metrics.firstContentfulPaint > 0 && (
            <div>First Contentful Paint: {formatTime(metrics.firstContentfulPaint)}</div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * HOC to wrap a component with performance monitoring
 * @param Component Component to monitor
 * @param options Configuration options
 * @returns Wrapped component with performance monitoring
 */
export const withPerformanceTracking = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    showMetrics?: boolean;
    componentName?: string;
    onMetricsCalculated?: (metrics: PerformanceMetrics) => void;
  } = {}
) => {
  const { 
    showMetrics = process.env.NODE_ENV === 'development',
    componentName = Component.displayName || Component.name || 'Component',
    onMetricsCalculated
  } = options;
  
  const WithPerformanceTracking = (props: P) => {
    return (
      <PerformanceMonitor 
        showMetrics={showMetrics}
        componentName={componentName}
        onMetricsCalculated={onMetricsCalculated}
      >
        <Component {...props} />
      </PerformanceMonitor>
    );
  };
  
  WithPerformanceTracking.displayName = `WithPerformanceTracking(${componentName})`;
  
  return WithPerformanceTracking;
}; 