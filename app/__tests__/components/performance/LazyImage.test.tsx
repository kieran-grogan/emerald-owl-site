import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => (props: any) => <img {...props} data-testid="lazy-image" />);
// Mock intersection loader and lazy loading support
jest.mock('@/app/lib/performance', () => ({
  useIntersectionLoader: () => ({ ref: jest.fn(), isVisible: true }),
  useLazyLoadingSupport: () => true,
}));
// Mock getImagePath
jest.mock('@/app/lib/image-utils', () => ({
  getImagePath: (src: string) => src,
}));

import LazyImage from '../../../components/performance/LazyImage';

describe('LazyImage', () => {
  it('renders placeholder before image is loaded', () => {
    // Override isVisible to false
    jest.mock('@/app/lib/performance', () => ({
      useIntersectionLoader: () => ({ ref: jest.fn(), isVisible: false }),
      useLazyLoadingSupport: () => true,
    }));
    render(<LazyImage src="/img.jpg" alt="test" />);
    // Placeholder should be present (look for the placeholder class)
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders image when visible', () => {
    render(<LazyImage src="/img.jpg" alt="test" />);
    expect(screen.getByTestId('lazy-image')).toBeInTheDocument();
    expect(screen.getByTestId('lazy-image')).toHaveAttribute('src', '/img.jpg');
    expect(screen.getByTestId('lazy-image')).toHaveAttribute('alt', 'test');
  });

  it('renders error fallback on error', () => {
    render(<LazyImage src="/img.jpg" alt="test" />);
    const img = screen.getByTestId('lazy-image');
    fireEvent.error(img);
    expect(screen.getByText(/Image failed to load/i)).toBeInTheDocument();
  });

  it('renders with priority', () => {
    render(<LazyImage src="/img.jpg" alt="test" priority />);
    // Just check that the image is rendered
    expect(screen.getByTestId('lazy-image')).toBeInTheDocument();
  });

  it('applies fit prop as objectFit style', () => {
    render(<LazyImage src="/img.jpg" alt="test" fit="contain" />);
    expect(screen.getByTestId('lazy-image').style.objectFit).toBe('contain');
  });
}); 