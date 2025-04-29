import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResponsiveImage from '../../../components/media/ResponsiveImage';
import { getImageDimensions } from '../../../lib/image-optimization';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, ...rest } = props;
    return <img data-priority={priority} {...rest} />;
  },
}));

describe('ResponsiveImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
  };

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<ResponsiveImage {...defaultProps} />);
      expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ResponsiveImage {...defaultProps} className="custom-class" />);
      const container = screen.getByAltText('Test image').parentElement;
      expect(container).toHaveClass('custom-class');
    });

    it('shows loading state initially', () => {
      render(<ResponsiveImage {...defaultProps} />);
      expect(screen.getByAltText('Test image')).toHaveClass('opacity-0');
    });
  });

  describe('Loading States', () => {
    it('shows loading placeholder initially', () => {
      render(<ResponsiveImage {...defaultProps} />);
      expect(screen.getByAltText('Test image').parentElement?.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('removes loading state after load', () => {
      render(<ResponsiveImage {...defaultProps} />);
      const img = screen.getByAltText('Test image');
      fireEvent.load(img);
      expect(img).toHaveClass('opacity-100');
    });

    it('shows error state on load failure', () => {
      render(<ResponsiveImage {...defaultProps} />);
      const img = screen.getByAltText('Test image');
      fireEvent.error(img);
      expect(screen.getByText('Image failed to load')).toBeInTheDocument();
    });
  });

  describe('Hero Image', () => {
    it('applies priority loading for hero images', () => {
      render(<ResponsiveImage {...defaultProps} isHero />);
      expect(screen.getByAltText('Test image')).toHaveAttribute('data-priority', 'true');
    });

    it('uses higher quality for hero images', () => {
      render(<ResponsiveImage {...defaultProps} isHero />);
      expect(screen.getByAltText('Test image')).toHaveAttribute('quality', '90');
    });
  });

  describe('Aspect Ratio', () => {
    it('applies square aspect ratio', () => {
      render(<ResponsiveImage {...defaultProps} aspectRatio="square" />);
      const dimensions = getImageDimensions('square');
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('width', dimensions.width.toString());
      expect(img).toHaveAttribute('height', dimensions.height.toString());
    });

    it('applies video aspect ratio', () => {
      render(<ResponsiveImage {...defaultProps} aspectRatio="video" />);
      const dimensions = getImageDimensions('video');
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('width', dimensions.width.toString());
      expect(img).toHaveAttribute('height', dimensions.height.toString());
    });

    it('applies auto aspect ratio', () => {
      render(<ResponsiveImage {...defaultProps} aspectRatio="auto" />);
      const dimensions = getImageDimensions('auto');
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('width', dimensions.width.toString());
      expect(img).toHaveAttribute('height', dimensions.height.toString());
    });
  });

  describe('Event Handlers', () => {
    it('calls onLoad callback', () => {
      const onLoad = jest.fn();
      render(<ResponsiveImage {...defaultProps} onLoad={onLoad} />);
      fireEvent.load(screen.getByAltText('Test image'));
      expect(onLoad).toHaveBeenCalled();
    });

    it('calls onError callback', () => {
      const onError = jest.fn();
      render(<ResponsiveImage {...defaultProps} onError={onError} />);
      fireEvent.error(screen.getByAltText('Test image'));
      expect(onError).toHaveBeenCalled();
    });
  });
});