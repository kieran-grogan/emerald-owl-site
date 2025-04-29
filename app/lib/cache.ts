/**
 * Simple in-memory cache implementation
 */
class MemoryCache<T> {
  private cache: Map<string, { value: T; expiry: number }> = new Map();
  
  /**
   * Set a value in the cache with optional expiration time
   * @param key Cache key
   * @param value Value to store
   * @param ttlMs Time to live in milliseconds (optional, defaults to no expiration)
   */
  set(key: string, value: T, ttlMs?: number): void {
    const expiry = ttlMs ? Date.now() + ttlMs : Number.MAX_SAFE_INTEGER;
    this.cache.set(key, { value, expiry });
  }
  
  /**
   * Get a value from the cache
   * @param key Cache key
   * @returns The cached value or undefined if not found or expired
   */
  get(key: string): T | undefined {
    const item = this.cache.get(key);
    
    if (!item) return undefined;
    
    // Check if item is expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value;
  }
  
  /**
   * Delete a value from the cache
   * @param key Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Get all keys in the cache
   * @returns Array of cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
  
  /**
   * Clean expired items from the cache
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Create global cache instances
export const pageCache = new MemoryCache<any>();
export const apiCache = new MemoryCache<any>();
export const imageCache = new MemoryCache<string>();

/**
 * Wrapper for async functions to cache their results
 * @param fn Function to cache
 * @param keyFn Function to generate a cache key from arguments
 * @param cacheDuration Cache duration in milliseconds
 * @param cacheInstance Cache instance to use
 * @returns Wrapped function with caching
 */
export function withCache<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  keyFn: (...args: Args) => string,
  cacheDuration: number = 5 * 60 * 1000, // 5 minutes default
  cacheInstance: MemoryCache<T> = pageCache as unknown as MemoryCache<T>
): (...args: Args) => Promise<T> {
  return async (...args: Args): Promise<T> => {
    const cacheKey = keyFn(...args);
    const cachedResult = cacheInstance.get(cacheKey);
    
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    
    const result = await fn(...args);
    cacheInstance.set(cacheKey, result, cacheDuration);
    
    return result;
  };
}

/**
 * Schedule regular cache cleanup to prevent memory leaks
 */
if (typeof window !== 'undefined') {
  // Run cleanup every 5 minutes
  setInterval(() => {
    pageCache.cleanup();
    apiCache.cleanup();
    imageCache.cleanup();
  }, 5 * 60 * 1000);
} 