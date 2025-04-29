import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  useTrackedMemo,
  useMemoizedList,
  useDeepMemo,
  useAnimationAwareMemo,
  useChunkedMemoizedList,
  useEnhancedDeepMemo,
  useEnhancedAnimationAwareMemo
} from '../../../components/performance/MemoHooks';

function TrackedMemoTest({ value }: { value: number }) {
  const result = useTrackedMemo(() => value * 2, [value], 'test-memo');
  return <div data-testid="tracked-memo">{result}</div>;
}

function MemoizedListTest({ items }: { items: number[] }) {
  const result = useMemoizedList(items, (item) => item + 1);
  return <div data-testid="memoized-list">{result.join(',')}</div>;
}

function DeepMemoTest({ value }: { value: { a: number } }) {
  const result = useDeepMemo(value, 1);
  return <div data-testid="deep-memo">{result.a}</div>;
}

function AnimationAwareMemoTest({ value, isAnimating }: { value: number; isAnimating: boolean }) {
  const result = useAnimationAwareMemo(value, isAnimating);
  return <div data-testid="animation-aware">{result}</div>;
}

describe('MemoHooks', () => {
  it('useTrackedMemo returns correct memoized value', () => {
    render(<TrackedMemoTest value={5} />);
    expect(screen.getByTestId('tracked-memo')).toHaveTextContent('10');
  });

  it('useMemoizedList returns processed list', () => {
    render(<MemoizedListTest items={[1, 2, 3]} />);
    expect(screen.getByTestId('memoized-list')).toHaveTextContent('2,3,4');
  });

  it('useDeepMemo returns deeply memoized value', () => {
    render(<DeepMemoTest value={{ a: 42 }} />);
    expect(screen.getByTestId('deep-memo')).toHaveTextContent('42');
  });

  it('useAnimationAwareMemo updates value only when not animating', () => {
    const { rerender } = render(<AnimationAwareMemoTest value={1} isAnimating={false} />);
    expect(screen.getByTestId('animation-aware')).toHaveTextContent('1');
    rerender(<AnimationAwareMemoTest value={2} isAnimating={true} />);
    // Value should not update immediately
    expect(screen.getByTestId('animation-aware')).toHaveTextContent('1');
    rerender(<AnimationAwareMemoTest value={2} isAnimating={false} />);
    // Value should update after animation ends
    expect(screen.getByTestId('animation-aware')).toHaveTextContent('2');
  });
});

describe('useChunkedMemoizedList', () => {
  it('processes lists in chunks when size exceeds chunk size', () => {
    const items = Array.from({ length: 250 }, (_, i) => i);
    const processFn = jest.fn(x => x * 2);
    
    function TestComponent({ items }: { items: number[] }) {
      const processed = useChunkedMemoizedList(items, processFn, 100);
      return <div data-testid="result">{processed.join(',')}</div>;
    }
    
    render(<TestComponent items={items} />);
    
    // Verify all items were processed
    const result = screen.getByTestId('result').textContent;
    expect(result?.split(',').length).toBe(250);
    expect(result?.split(',')[0]).toBe('0');
    expect(result?.split(',')[249]).toBe('498');
  });
  
  it('processes small lists without chunking', () => {
    const items = Array.from({ length: 50 }, (_, i) => i);
    const processFn = jest.fn(x => x * 2);
    
    function TestComponent({ items }: { items: number[] }) {
      const processed = useChunkedMemoizedList(items, processFn, 100);
      return <div data-testid="result">{processed.join(',')}</div>;
    }
    
    render(<TestComponent items={items} />);
    
    // Verify all items were processed in one go
    expect(processFn).toHaveBeenCalledTimes(50);
  });
});

describe('useEnhancedDeepMemo', () => {
  it('memoizes values with deep comparison', () => {
    const initialValue = { a: 1, b: { c: 2 } };
    const updatedValue = { a: 1, b: { c: 2 } }; // Same structure, different reference
    
    function TestComponent({ value }: { value: typeof initialValue }) {
      const memoized = useEnhancedDeepMemo(value, 2);
      return <div data-testid="result">{JSON.stringify(memoized)}</div>;
    }
    
    const { rerender } = render(<TestComponent value={initialValue} />);
    
    // First render
    expect(screen.getByTestId('result').textContent).toBe(JSON.stringify(initialValue));
    
    // Re-render with new reference but same values
    rerender(<TestComponent value={updatedValue} />);
    
    // Should keep the memoized value
    expect(screen.getByTestId('result').textContent).toBe(JSON.stringify(initialValue));
  });
  
  it('updates when deep values change', () => {
    const initialValue = { a: 1, b: { c: 2 } };
    const updatedValue = { a: 1, b: { c: 3 } }; // Changed nested value
    
    function TestComponent({ value }: { value: typeof initialValue }) {
      const memoized = useEnhancedDeepMemo(value, 2);
      return <div data-testid="result">{JSON.stringify(memoized)}</div>;
    }
    
    const { rerender } = render(<TestComponent value={initialValue} />);
    
    // Re-render with changed value
    rerender(<TestComponent value={updatedValue} />);
    
    // Should update to new value
    expect(screen.getByTestId('result').textContent).toBe(JSON.stringify(updatedValue));
  });
});

describe('useEnhancedAnimationAwareMemo', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  it('delays updates during animation', () => {
    function TestComponent({ value, isAnimating }: { value: number; isAnimating: boolean }) {
      const memoized = useEnhancedAnimationAwareMemo(value, isAnimating);
      return <div data-testid="result">{memoized}</div>;
    }
    
    const { rerender } = render(<TestComponent value={1} isAnimating={false} />);
    expect(screen.getByTestId('result').textContent).toBe('1');
    
    // Update during animation
    rerender(<TestComponent value={2} isAnimating={true} />);
    expect(screen.getByTestId('result').textContent).toBe('1'); // Should not update yet
    
    // End animation
    rerender(<TestComponent value={2} isAnimating={false} />);
    
    // Should update after animation ends
    act(() => {
      jest.runAllTimers();
    });
    
    expect(screen.getByTestId('result').textContent).toBe('2');
  });
  
  it('updates after max delay even if still animating', () => {
    function TestComponent({ value, isAnimating }: { value: number; isAnimating: boolean }) {
      const memoized = useEnhancedAnimationAwareMemo(value, isAnimating, { maxDelay: 100 });
      return <div data-testid="result">{memoized}</div>;
    }
    
    const { rerender } = render(<TestComponent value={1} isAnimating={true} />);
    
    // Update during animation
    rerender(<TestComponent value={2} isAnimating={true} />);
    expect(screen.getByTestId('result').textContent).toBe('1');
    
    // Wait for max delay
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Should update after max delay
    expect(screen.getByTestId('result').textContent).toBe('2');
  });
}); 