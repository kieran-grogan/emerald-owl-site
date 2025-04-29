import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery, { ImageItem } from '../../../components/media/ImageGallery';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

describe('ImageGallery', () => {
  const mockImages: ImageItem[] = [
    { url: '/images/test1.jpg', alt: 'Test Image 1' },
    { url: '/images/test2.jpg', alt: 'Test Image 2' },
    { url: '/images/test3.jpg', alt: 'Test Image 3' },
  ];

  describe('Basic Rendering', () => {
    it('renders gallery with default props', () => {
      render(<ImageGallery images={mockImages} />);
      expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<ImageGallery images={mockImages} className="custom-class" />);
      const gallery = screen.getByRole('img').parentElement?.parentElement;
      expect(gallery).toHaveClass('custom-class');
    });
  });

  describe('Display Modes', () => {
    it('renders in slider mode by default', () => {
      render(<ImageGallery images={mockImages} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/images/test1.jpg');
    });

    it('renders in grid mode', () => {
      render(<ImageGallery images={mockImages} displayMode="grid" />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });

    it('renders in masonry mode', () => {
      render(<ImageGallery images={mockImages} displayMode="masonry" />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      // Clear mock calls before each test
      (Element.prototype.scrollIntoView as jest.Mock).mockClear();
    });

    it('shows navigation arrows in slider mode', () => {
      render(<ImageGallery images={mockImages} />);
      expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
      expect(screen.getByLabelText('Next image')).toBeInTheDocument();
    });

    it('navigates to next image and scrolls thumbnail into view', () => {
      render(<ImageGallery images={mockImages} />);
      fireEvent.click(screen.getByLabelText('Next image'));
      expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    it('navigates to previous image and scrolls thumbnail into view', () => {
      render(<ImageGallery images={mockImages} />);
      // First go to next image
      fireEvent.click(screen.getByLabelText('Next image'));
      (Element.prototype.scrollIntoView as jest.Mock).mockClear();
      // Then go back
      fireEvent.click(screen.getByLabelText('Previous image'));
      expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  describe('Thumbnails', () => {
    it('shows thumbnails by default', () => {
      render(<ImageGallery images={mockImages} />);
      const thumbnails = screen.getAllByRole('img');
      expect(thumbnails).toHaveLength(4); // 3 thumbnails + 1 main image
    });

    it('hides thumbnails when showThumbnails is false', () => {
      render(<ImageGallery images={mockImages} showThumbnails={false} />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(1); // Only main image
    });

    it('changes main image when thumbnail is clicked', () => {
      render(<ImageGallery images={mockImages} />);
      const thumbnails = screen.getAllByRole('img');
      fireEvent.click(thumbnails[1]); // Click second thumbnail
      expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
    });
  });

  describe('Lightbox', () => {
    it('opens lightbox when image is clicked', () => {
      render(<ImageGallery images={mockImages} />);
      fireEvent.click(screen.getByAltText('Test Image 1'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes lightbox when escape key is pressed', () => {
      render(<ImageGallery images={mockImages} />);
      fireEvent.click(screen.getByAltText('Test Image 1'));
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Aspect Ratio', () => {
    it('applies square aspect ratio', () => {
      render(<ImageGallery images={mockImages} aspectRatio="square" />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('aspect-square');
    });

    it('applies video aspect ratio', () => {
      render(<ImageGallery images={mockImages} aspectRatio="video" />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('aspect-video');
    });

    it('applies auto aspect ratio', () => {
      render(<ImageGallery images={mockImages} aspectRatio="auto" />);
      const container = screen.getByRole('img').parentElement;
      expect(container).not.toHaveClass('aspect-square');
      expect(container).not.toHaveClass('aspect-video');
    });
  });
}); 