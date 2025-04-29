import { pageCache, apiCache, imageCache, withCache } from '../../lib/cache';

describe('MemoryCache', () => {
  beforeEach(() => {
    // Clear caches before each test
    pageCache.clear();
    apiCache.clear();
    imageCache.clear();
  });

  test('set and get values from cache', () => {
    // Set a value in the cache
    pageCache.set('test-key', 'test-value');
    
    // Get the value from the cache
    const value = pageCache.get('test-key');
    
    // Check that the value was stored correctly
    expect(value).toBe('test-value');
  });

  test('respects expiry time for cached values', () => {
    jest.useFakeTimers();
    
    // Set a value with a short expiry time (100ms)
    pageCache.set('expiring-key', 'expiring-value', 100);
    
    // Value should be available immediately
    expect(pageCache.get('expiring-key')).toBe('expiring-value');
    
    // Advance time beyond expiry
    jest.advanceTimersByTime(101);
    
    // Value should no longer be available
    expect(pageCache.get('expiring-key')).toBeUndefined();
    
    jest.useRealTimers();
  });

  test('delete removes values from cache', () => {
    // Set a value
    pageCache.set('delete-key', 'delete-value');
    
    // Value should be available
    expect(pageCache.get('delete-key')).toBe('delete-value');
    
    // Delete the value
    pageCache.delete('delete-key');
    
    // Value should no longer be available
    expect(pageCache.get('delete-key')).toBeUndefined();
  });

  test('clear removes all values from cache', () => {
    // Set multiple values
    pageCache.set('key1', 'value1');
    pageCache.set('key2', 'value2');
    
    // Values should be available
    expect(pageCache.get('key1')).toBe('value1');
    expect(pageCache.get('key2')).toBe('value2');
    
    // Clear the cache
    pageCache.clear();
    
    // Values should no longer be available
    expect(pageCache.get('key1')).toBeUndefined();
    expect(pageCache.get('key2')).toBeUndefined();
  });

  test('keys returns all keys in cache', () => {
    // Set multiple values
    pageCache.set('key1', 'value1');
    pageCache.set('key2', 'value2');
    
    // Get all keys
    const keys = pageCache.keys();
    
    // Check that all keys are returned
    expect(keys).toHaveLength(2);
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
  });

  test('cleanup removes expired items', () => {
    jest.useFakeTimers();
    
    // Set values with different expiry times
    pageCache.set('expire-soon', 'value1', 100);
    pageCache.set('expire-later', 'value2', 1000);
    
    // All values should be available immediately
    expect(pageCache.get('expire-soon')).toBe('value1');
    expect(pageCache.get('expire-later')).toBe('value2');
    
    // Advance time past first expiry
    jest.advanceTimersByTime(101);
    
    // Run cleanup
    pageCache.cleanup();
    
    // First value should be removed, second still available
    expect(pageCache.get('expire-soon')).toBeUndefined();
    expect(pageCache.get('expire-later')).toBe('value2');
    
    jest.useRealTimers();
  });
});

describe('withCache', () => {
  test('caches function results and returns cached values on subsequent calls', async () => {
    // Mock function that returns a different result each time
    let counter = 0;
    const mockFn = jest.fn().mockImplementation(async () => {
      counter++;
      return `result-${counter}`;
    });
    
    // Create cached version of the function
    const cachedFn = withCache(
      mockFn,
      () => 'constant-key'
    );
    
    // First call should execute the function
    const result1 = await cachedFn();
    expect(result1).toBe('result-1');
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Second call with same args should return cached result
    const result2 = await cachedFn();
    expect(result2).toBe('result-1'); // Still the first result
    expect(mockFn).toHaveBeenCalledTimes(1); // Function not called again
  });

  test('generates different cache keys for different arguments', async () => {
    // Mock function that returns its argument
    const mockFn = jest.fn().mockImplementation(async (arg) => `result-${arg}`);
    
    // Create cached version of the function with a key generator
    const cachedFn = withCache(
      mockFn,
      (arg) => `key-${arg}`
    );
    
    // Call with first argument
    const result1 = await cachedFn('a');
    expect(result1).toBe('result-a');
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    // Call with second argument (different cache key)
    const result2 = await cachedFn('b');
    expect(result2).toBe('result-b');
    expect(mockFn).toHaveBeenCalledTimes(2); // Function called again
    
    // Call with first argument again
    const result3 = await cachedFn('a');
    expect(result3).toBe('result-a');
    expect(mockFn).toHaveBeenCalledTimes(2); // Function not called again
  });
}); 