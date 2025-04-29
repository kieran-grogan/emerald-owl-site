import { render, screen, fireEvent } from '@testing-library/react';
import BehindTheScenesGallery from '../BehindTheScenesGallery';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('BehindTheScenesGallery', () => {
  const mockImages = [
    {
      url: '/images/behind-scenes/image1.jpg',
      alt: 'Team working on stage setup',
      caption: 'Setting up for a major event'
    },
    {
      url: '/images/behind-scenes/image2.jpg',
      alt: 'Sound check in progress',
      caption: 'Fine-tuning the audio system'
    },
    {
      url: '/images/behind-scenes/image3.jpg',
      alt: 'Lighting design meeting',
      caption: 'Planning the lighting scheme'
    }
  ];

  it('renders gallery with correct number of images', () => {
    render(<BehindTheScenesGallery images={mockImages} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockImages.length);
  });

  it('displays image captions correctly', () => {
    render(<BehindTheScenesGallery images={mockImages} />);
    
    mockImages.forEach(image => {
      expect(screen.getByText(image.caption)).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(<BehindTheScenesGallery images={mockImages} />);
    
    // Check if gallery has proper role and label
    const gallery = screen.getByRole('region');
    expect(gallery).toHaveAttribute('aria-label', 'Behind the scenes gallery');

    // Check if images have proper alt text
    mockImages.forEach(image => {
      const img = screen.getByAltText(image.alt);
      expect(img).toBeInTheDocument();
    });
  });

  it('handles empty images array gracefully', () => {
    render(<BehindTheScenesGallery images={[]} />);
    
    const gallery = screen.getByRole('region');
    expect(gallery).toBeInTheDocument();
    expect(gallery).toHaveAttribute('aria-label', 'Behind the scenes gallery');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies correct grid layout classes', () => {
    render(<BehindTheScenesGallery images={mockImages} />);
    
    const gallery = screen.getByRole('region');
    expect(gallery).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
  });
}); 