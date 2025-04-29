'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface VirtualListProps<T> {
  /**
   * Items to render in the virtualized list
   */
  items: T[];
  /**
   * Function to render each item
   */
  renderItem: (item: T, index: number) => ReactNode;
  /**
   * Height of each item in pixels
   */
  itemHeight: number;
  /**
   * Height of the container in pixels
   */
  containerHeight: number;
  /**
   * Optional className for the container
   */
  className?: string;
  /**
   * Number of items to render as buffer above and below the visible area
   */
  overscan?: number;
}

/**
 * Virtualized list component for efficiently rendering large lists
 * Only renders items that are visible in the viewport plus a buffer
 */
export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  className = '',
  overscan = 3
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate which items should be rendered
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      className={`virtual-list-container ${className}`}
      data-testid="virtual-list"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offsetY, left: 0, right: 0 }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Use this hook to determine if a list is large enough to benefit from virtualization
 * @param itemCount The number of items in the list
 * @param threshold The threshold at which to use virtualization (default: 100)
 * @returns Boolean indicating whether virtualization should be used
 */
export function useShouldVirtualize(itemCount: number, threshold = 100): boolean {
  return itemCount > threshold;
} 