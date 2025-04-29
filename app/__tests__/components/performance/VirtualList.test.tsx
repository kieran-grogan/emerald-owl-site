import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VirtualList, useShouldVirtualize } from '../../../components/performance/VirtualList';

function renderVirtualList(items: number[], containerHeight = 100, itemHeight = 20, overscan = 2) {
  return render(
    <VirtualList
      items={items}
      renderItem={(item) => <div data-testid={`item-${item}`}>{item}</div>}
      itemHeight={itemHeight}
      containerHeight={containerHeight}
      overscan={overscan}
    />
  );
}

describe('VirtualList', () => {
  it('renders only visible items plus overscan', () => {
    const items = Array.from({ length: 50 }, (_, i) => i);
    renderVirtualList(items, 100, 20, 2); // 5 visible + 2 overscan below at top
    const visible = screen.getAllByTestId(/item-/);
    // At scrollTop=0, overscan below is added, and the range is inclusive: 5 + 2 + 1 = 8
    expect(visible.length).toBe(8);
    // First visible item should be 0
    expect(visible[0]).toHaveTextContent('0');
  });

  it('renders all items if list is small', () => {
    const items = [1, 2, 3];
    renderVirtualList(items, 100, 20, 2);
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
    expect(screen.getByTestId('item-3')).toBeInTheDocument();
  });

  it('handles scroll and updates visible items', () => {
    const items = Array.from({ length: 100 }, (_, i) => i);
    renderVirtualList(items, 100, 20, 1);
    const container = screen.getByTestId('virtual-list');
    // Simulate scroll to item 10
    fireEvent.scroll(container, { target: { scrollTop: 200 } });
    // After scroll, the first visible item should be >= 9 (with overscan)
    // We can't guarantee exact DOM order, but at least item-9 should be present
    expect(screen.getByTestId('item-9')).toBeInTheDocument();
  });
});

describe('useShouldVirtualize', () => {
  it('returns true if itemCount > threshold', () => {
    expect(useShouldVirtualize(101)).toBe(true);
    expect(useShouldVirtualize(100)).toBe(false);
    expect(useShouldVirtualize(99)).toBe(false);
    expect(useShouldVirtualize(200, 150)).toBe(true);
    expect(useShouldVirtualize(100, 100)).toBe(false);
  });
}); 