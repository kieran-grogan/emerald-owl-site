import React from 'react';
import { render, screen } from '../../utils/test-utils';
import BlogContent from '../../../components/content/BlogContent';
import { BlogPost } from '@/app/lib/blog-types';
import { StandardizedContentData } from '@/app/lib/data-standardization';
import { getImagePath } from '@/app/lib/image-utils';

// Mock the functions from route-mapping
jest.mock('@/app/lib/route-mapping', () => ({
  generateSlug: (text: string | any) => {
    if (typeof text === 'string') {
      return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    return '';
  },
  getLegacyToNextRoute: (route: string) => route,
  updateInternalLinks: (html: string) => html
}));

// Create mock data for testing
const mockBlogPost: BlogPost = {
  id: '123',
  title: 'Test Blog Post',
  author: 'Test Author',
  date: '2023-04-01',
  category: 'Test Category',
  content: '<p>This is test content</p>',
  image: '/images/test-image.jpg',
  excerpt: 'Test excerpt',
  slug: 'test-post',
  tags: ['test', 'blog'],
  author_image: '/images/author.jpg',
  related_posts: ['Related Post 1', 'Related Post 2'] // Using strings as expected by the component
};

// Mock the StandardizedContentData type
const mockStandardizedContent: StandardizedContentData = {
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Test Section',
      content: '<p>This is section content</p>',
      media: []
    }
  ],
  featured_image: {
    url: '/images/test-image.jpg',
    alt: 'Test Image',
    width: '800',
    height: '600',
    type: 'image'
  },
  content_type: 'blog',
  url: '/blog/test-post',
  title: 'Test Blog Post',
  route: '/blog/test-post',
  meta: {
    description: 'Test description',
    keywords: 'test, blog'
  },
  content: {
    main_text: 'This is test content',
    sections: []
  },
  resources: []
};

const mockLegacyPost: BlogPost = {
  id: '456',
  title: 'Legacy Blog Post',
  author: 'Legacy Author',
  date: '2022-04-01',
  content: '<div><h2>Legacy Section</h2><p>Legacy content paragraph</p></div>',
  image: '/images/legacy-image.jpg',
  category: 'Legacy Category',
  excerpt: 'Legacy excerpt',
  slug: 'legacy-post',
  tags: [],
  related_posts: []
};

// Mock the Image component to avoid errors with priority prop
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    const { src, alt, width, height, ...rest } = props;
    // Convert boolean props to strings for the HTML attributes
    const sanitizedProps = Object.entries(rest).reduce((acc, [key, value]) => {
      if (typeof value === 'boolean') {
        return { ...acc, [key]: value.toString() };
      }
      return { ...acc, [key]: value };
    }, {});
    
    return <img src={src} alt={alt || ''} width={width} height={height} {...sanitizedProps} />
  }
}));

describe('BlogContent Component', () => {
  test('renders standardized blog post format correctly', () => {
    render(<BlogContent post={mockBlogPost} content={mockStandardizedContent} />);
    
    // Check that key elements are rendered
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    
    // Look for the section content using a more flexible approach
    expect(screen.getByText(/this is section content/i)).toBeInTheDocument();
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    
    // Check that the featured image is rendered
    const featuredImage = screen.getByAltText('Test Image');
    expect(featuredImage).toBeInTheDocument();
  });

  test('renders legacy blog post format correctly', () => {
    render(<BlogContent post={mockLegacyPost} />);
    
    // Check that key elements are rendered
    expect(screen.getByText('Legacy Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Legacy Author')).toBeInTheDocument();
    expect(screen.getByText('Legacy Category')).toBeInTheDocument();
    expect(screen.getByText('Legacy content paragraph')).toBeInTheDocument();
    expect(screen.getByText('Legacy Section')).toBeInTheDocument();
    
    // Check for featured image
    const featuredImage = screen.getByRole('img');
    expect(featuredImage).toBeInTheDocument();
    expect(featuredImage).toHaveAttribute('src', expect.stringContaining('legacy-image'));
  });

  test('formats date correctly', () => {
    render(<BlogContent post={mockBlogPost} />);
    
    // Check for date in expected format - accepting either March 31 or April 1 due to timezone
    const dateElement = screen.getByText(/march 31, 2023|april 1, 2023/i);
    expect(dateElement).toBeInTheDocument();
  });

  test('handles missing standardized content gracefully', () => {
    render(<BlogContent post={mockBlogPost} />);
    
    // The component should still render without standardized content
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText(/this is test content/i)).toBeInTheDocument();
  });

  test('renders blog post with related posts', () => {
    render(<BlogContent post={mockBlogPost} />);
    
    // Check for related post content
    expect(screen.getByText(/related posts/i)).toBeInTheDocument();
    expect(screen.getByText('Related Post 1')).toBeInTheDocument();
    expect(screen.getByText('Related Post 2')).toBeInTheDocument();
  });
}); 