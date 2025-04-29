import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withLazyLoading, LazyContent } from '../../../components/performance/LazyLoad';

// Mock component to be lazy loaded
const TestComponent = () => <div data-testid="lazy-loaded">Lazy Loaded!</div>;

describe('withLazyLoading HOC', () => {
  it('renders fallback and then the lazy-loaded component', async () => {
    const importFn = () => Promise.resolve({ default: TestComponent });
    const LazyLoaded = withLazyLoading(importFn);
    render(<LazyLoaded />);
    // Fallback should be present initially
    expect(screen.getByRole('status')).toBeInTheDocument();
    // Wait for lazy-loaded component
    await waitFor(() => expect(screen.getByTestId('lazy-loaded')).toBeInTheDocument());
  });

  it('renders immediately when skipLazy is true', async () => {
    const importFn = () => Promise.resolve({ default: TestComponent });
    const LazyLoaded = withLazyLoading(importFn, { skipLazy: true });
    render(<LazyLoaded />);
    // Should render the component immediately
    expect(await screen.findByTestId('lazy-loaded')).toBeInTheDocument();
  });
});

describe('LazyContent', () => {
  it('renders children inside Suspense', () => {
    render(
      <LazyContent>
        <div data-testid="lazy-content-child">Child</div>
      </LazyContent>
    );
    expect(screen.getByTestId('lazy-content-child')).toBeInTheDocument();
  });
}); 