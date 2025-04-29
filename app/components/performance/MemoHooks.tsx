'use client';

import { useMemo, useCallback, useState, useRef, useEffect, DependencyList } from 'react';

/**
 * Memoize an expensive computation with dependency tracking
 * Enhanced version of useMemo with timing metrics
 * @param computeFn Function to memoize
 * @param deps Dependencies array that triggers recomputation
 * @param name Optional name for logging
 * @returns Memoized value
 */
export function useTrackedMemo<T>(
  computeFn: () => T,
  deps: DependencyList,
  name: string = 'computation'
): T {
  const isFirstRender = useRef(true);
  const startTimeRef = useRef(0);
  
  if (isFirstRender.current) {
    startTimeRef.current = performance.now();
  }
  
  const result = useMemo(() => {
    // Start timing
    const startTime = performance.now();
    
    // Run the computation
    const result = computeFn();
    
    // End timing and log if slow
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 10) {
      console.warn(`[Performance] ${name} took ${duration.toFixed(2)}ms to compute`);
    }
    
    return result;
  }, deps);
  
  // Log initial render time
  useEffect(() => {
    if (isFirstRender.current) {
      const duration = performance.now() - startTimeRef.current;
      if (duration > 10) {
        console.log(`[Performance] Initial ${name} took ${duration.toFixed(2)}ms`);
      }
      isFirstRender.current = false;
    }
  }, [name]);
  
  return result;
}

/**
 * Hook for handling expensive lists with memoization
 * @param items Array of items to process
 * @param processFn Processing function to apply to each item
 * @param deps Additional dependencies for reprocessing
 * @returns Processed items array
 */
export function useMemoizedList<T, R>(
  items: T[],
  processFn: (item: T, index: number) => R,
  deps: DependencyList = []
): R[] {
  return useTrackedMemo(
    () => items.map(processFn),
    [items, ...deps],
    'list processing'
  );
}

/**
 * Custom hook for memoizing values with deep comparison
 * @param value Value to memoize
 * @param compareDepth How many levels deep to compare (default: 1)
 * @returns Memoized value that only changes when deeply changed
 */
export function useDeepMemo<T>(value: T, compareDepth: number = 1): T {
  const prevValueRef = useRef<T>(value);
  
  // Only update the value if it's deeply different
  const newValue = useMemo(() => {
    if (isDeepEqual(value, prevValueRef.current, compareDepth)) {
      return prevValueRef.current;
    }
    prevValueRef.current = value;
    return value;
  }, [value, compareDepth]);
  
  return newValue;
}

/**
 * Utility function to perform deep comparison
 */
function isDeepEqual(obj1: any, obj2: any, depth: number): boolean {
  if (obj1 === obj2) return true;
  
  if (depth <= 0 || typeof obj1 !== 'object' || typeof obj2 !== 'object' || 
      obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => {
    return isDeepEqual(obj1[key], obj2[key], depth - 1);
  });
}

/**
 * Hook to prevent expensive recomputations during animations
 * Delays heavy recalculations while animations are in progress
 * @param value Value to memoize
 * @param isAnimating Boolean to indicate if animation is in progress
 * @returns Memoized value that only updates when not animating
 */
export function useAnimationAwareMemo<T>(value: T, isAnimating: boolean): T {
  const [memoizedValue, setMemoizedValue] = useState<T>(value);
  const pendingValueRef = useRef<T | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // If not animating, update immediately
    if (!isAnimating) {
      if (pendingValueRef.current !== null) {
        setMemoizedValue(pendingValueRef.current);
        pendingValueRef.current = null;
      } else {
        setMemoizedValue(value);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      // Store the pending value and schedule update when animation ends
      pendingValueRef.current = value;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Fail-safe: update after 500ms even if isAnimating doesn't change
      timeoutRef.current = setTimeout(() => {
        if (pendingValueRef.current !== null) {
          setMemoizedValue(pendingValueRef.current);
          pendingValueRef.current = null;
        }
        timeoutRef.current = null;
      }, 500);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, isAnimating]);
  
  return memoizedValue;
}

// Performance budget thresholds
const PERFORMANCE_THRESHOLDS = {
  computation: 10, // ms
  listProcessing: 5, // ms per item
  deepComparison: 8, // ms
  animationFrame: 16 // ms (1 frame at 60fps)
};

// Comparison cache using WeakMap for memory efficiency
const comparisonCache = new WeakMap();
const MAX_COMPARE_DEPTH = 5;

/**
 * Enhanced deep comparison with caching and depth limits
 */
function enhancedDeepEqual(obj1: any, obj2: any, depth: number): boolean {
  if (depth > MAX_COMPARE_DEPTH) {
    console.warn('[Performance] Deep comparison exceeded maximum depth');
    return false;
  }
  
  if (obj1 === obj2) return true;
  
  if (depth <= 0 || typeof obj1 !== 'object' || typeof obj2 !== 'object' || 
      obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  
  // Check cache
  const cacheKey = [obj1, obj2].toString();
  if (comparisonCache.has(cacheKey)) {
    return comparisonCache.get(cacheKey);
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    comparisonCache.set(cacheKey, false);
    return false;
  }
  
  const result = keys1.every(key => 
    enhancedDeepEqual(obj1[key], obj2[key], depth - 1)
  );
  
  comparisonCache.set(cacheKey, result);
  return result;
}

/**
 * Hook for processing large lists with chunking support
 */
export function useChunkedMemoizedList<T, R>(
  items: T[],
  processFn: (item: T, index: number) => R,
  chunkSize: number = 100,
  deps: DependencyList = []
): R[] {
  return useTrackedMemo(
    () => {
      const startTime = performance.now();
      
      if (items.length <= chunkSize) {
        const result = items.map(processFn);
        const duration = performance.now() - startTime;
        
        if (duration / items.length > PERFORMANCE_THRESHOLDS.listProcessing) {
          console.warn(
            `[Performance] List processing took ${duration.toFixed(2)}ms ` +
            `(${(duration / items.length).toFixed(2)}ms per item)`
          );
        }
        
        return result;
      }
      
      // Process in chunks
      const chunks: R[][] = [];
      let processedItems = 0;
      
      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize).map(processFn);
        chunks.push(chunk);
        processedItems += chunk.length;
        
        // Check processing time per chunk
        const currentDuration = performance.now() - startTime;
        if (currentDuration / processedItems > PERFORMANCE_THRESHOLDS.listProcessing) {
          console.warn(
            `[Performance] Chunk processing is slow: ` +
            `${(currentDuration / processedItems).toFixed(2)}ms per item`
          );
        }
      }
      
      return chunks.flat();
    },
    [items, chunkSize, ...deps],
    'chunked list processing'
  );
}

/**
 * Enhanced version of useDeepMemo with better performance characteristics
 */
export function useEnhancedDeepMemo<T>(
  value: T, 
  compareDepth: number = 1
): T {
  const prevValueRef = useRef<T>(value);
  const startTimeRef = useRef<number>(0);
  
  // Only update the value if it's deeply different
  const newValue = useMemo(() => {
    startTimeRef.current = performance.now();
    
    if (enhancedDeepEqual(value, prevValueRef.current, compareDepth)) {
      return prevValueRef.current;
    }
    
    const duration = performance.now() - startTimeRef.current;
    if (duration > PERFORMANCE_THRESHOLDS.deepComparison) {
      console.warn(
        `[Performance] Deep comparison took ${duration.toFixed(2)}ms ` +
        `at depth ${compareDepth}`
      );
    }
    
    prevValueRef.current = value;
    return value;
  }, [value, compareDepth]);
  
  return newValue;
}

/**
 * Enhanced animation-aware memo with frame timing optimization
 */
export function useEnhancedAnimationAwareMemo<T>(
  value: T, 
  isAnimating: boolean,
  options = { 
    debounceMs: PERFORMANCE_THRESHOLDS.animationFrame,
    maxDelay: 500 
  }
): T {
  const [memoizedValue, setMemoizedValue] = useState<T>(value);
  const pendingValueRef = useRef<T | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isAnimating) {
      // Use requestAnimationFrame for smoother updates
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(() => {
        if (pendingValueRef.current !== null) {
          setMemoizedValue(pendingValueRef.current);
          pendingValueRef.current = null;
        } else {
          setMemoizedValue(value);
        }
        frameIdRef.current = null;
      });
    } else {
      // Store pending value and schedule update
      pendingValueRef.current = value;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Fail-safe: update after maxDelay even if isAnimating doesn't change
      timeoutRef.current = setTimeout(() => {
        if (pendingValueRef.current !== null) {
          // Use RAF for the actual update
          frameIdRef.current = requestAnimationFrame(() => {
            setMemoizedValue(pendingValueRef.current!);
            pendingValueRef.current = null;
            frameIdRef.current = null;
          });
        }
        timeoutRef.current = null;
      }, options.maxDelay);
    }
    
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, isAnimating, options.maxDelay]);
  
  return memoizedValue;
} 