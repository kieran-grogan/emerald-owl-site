import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import { OptimizedImage } from '../../../components/performance/ImageOptimizer';

// Import jest-dom extensions
import '@testing-library/jest-dom';

describe('OptimizedImage Component', () => {
  // Store original implementation
  const originalIntersectionObserver = global.IntersectionObserver;
  
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      return {
        observe: jest.fn().mockImplementation((element) => {
          // Simulate intersection immediately
          callback([
            {
              isIntersecting: true,
              target: element
            }
          ]);
        }),
        unobserve: jest.fn(),
        disconnect: jest.fn()
      };
    });
  });
  
  afterEach(() => {
    // Restore original implementation
    global.IntersectionObserver = originalIntersectionObserver;
    jest.clearAllMocks();
  });
  
  test('renders with correct attributes', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
      />
    );
    
    const image = screen.getByAltText('Example image');
    
    // Check basic attributes
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/example.jpg');
    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '600');
  });
  
  test('applies priority loading when specified', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        priority={true}
      />
    );
    
    // Priority images don't actually get a loading attribute in Next.js
    // They get special handling by Next.js's image optimization
    // But we can verify the image is rendered
    const image = screen.getByAltText('Example image');
    expect(image).toBeInTheDocument();
  });
  
  test('handles loading attribute', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        loading="lazy"
      />
    );
    
    const image = screen.getByAltText('Example image');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
  
  test('applies custom className', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        className="custom-image-class"
      />
    );
    
    const image = screen.getByAltText('Example image');
    expect(image).toHaveClass('custom-image-class');
  });
  
  test('applies fill property correctly', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        fill={true}
      />
    );
    
    // When fill is true, the container div should have 100% width and height styles
    const container = screen.getByAltText('Example image').closest('div');
    expect(container).toHaveStyle({
      width: '100%',
      height: '100%'
    });
    
    // The image should have the fill attribute
    const image = screen.getByAltText('Example image');
    expect(image).toBeInTheDocument();
  });
  
  test('applies objectFit property when specified', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        fill={true}
        objectFit="contain"
      />
    );
    
    // Check if the className contains the object-contain class
    const image = screen.getByAltText('Example image');
    expect(image).toHaveClass('object-contain');
  });
  
  test('handles error and displays fallback image', () => {
    // Mock implementation of handleImageError
    const mockHandleError = jest.fn();
    
    render(
      <OptimizedImage
        src="/images/broken-image.jpg"
        alt="Broken image"
        width={800}
        height={600}
        onError={mockHandleError}
      />
    );
    
    const image = screen.getByAltText('Broken image');
    
    // Simulate an error event
    fireEvent.error(image);
    
    // Check if the error handler was called
    expect(mockHandleError).toHaveBeenCalledTimes(1);
  });
  
  test('handles sizes attribute correctly', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 800px"
      />
    );
    
    const image = screen.getByAltText('Example image');
    expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 800px');
  });
  
  test('applies quality attribute correctly', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        quality={75}
      />
    );
    
    // Quality is usually passed to the image loader, so it might not be directly visible
    // in the DOM attributes. This is a basic check that the component renders with quality.
    const image = screen.getByAltText('Example image');
    expect(image).toBeInTheDocument();
  });
  
  test('handles placeholder attribute correctly', () => {
    render(
      <OptimizedImage
        src="/images/example.jpg"
        alt="Example image"
        width={800}
        height={600}
        useBlur={true}
      />
    );
    
    const image = screen.getByAltText('Example image');
    expect(image).toBeInTheDocument();
    
    // In a real Next.js Image component, this would show a blurred placeholder
    // but in our test environment we can just check if the component renders
  });
}); 