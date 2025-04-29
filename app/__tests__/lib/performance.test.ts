import * as perf from '../../lib/performance';

describe('performance.ts utility functions', () => {
  it('debounce returns a function', () => {
    const fn = jest.fn();
    const debounced = perf.debounce(fn, 10);
    expect(typeof debounced).toBe('function');
  });

  it('scheduleIdleTask can be called without error', () => {
    // Mock window.requestIdleCallback if not present
    const originalWindow = global.window;
    // @ts-ignore
    global.window = { requestIdleCallback: jest.fn() };
    expect(() => perf.scheduleIdleTask(() => {})).not.toThrow();
    global.window = originalWindow;
  });
}); 