import { 
  StandardizedContentData, 
  Section, 
  standardizeContentItem
} from '../../lib/data-standardization';
import { ContentData, Resource } from '@/app/lib/data';
import { getContentFileNames, getContentData } from '@/app/lib/content-analysis';

// Helper function to calculate percentage (matching the implementation in data-standardization.ts)
function percentOf(value: number, total: number): string {
  return (value / total * 100).toFixed(1);
}

// Mock the content-analysis functions
jest.mock('@/app/lib/content-analysis', () => ({
  getContentFileNames: jest.fn(() => {
    return ['service_laser.json', 'blog_post_1.json', 'event_holiday.json'];
  }),
  getContentData: jest.fn((filename: string) => {
    // Return different mock data based on the filename
    if (filename === 'service_laser.json') {
      return mockServiceContent;
    } else if (filename === 'blog_post_1.json') {
      return mockBlogContent;
    } else if (filename === 'event_holiday.json') {
      return mockEventContent;
    }
    return mockServiceContent; // Default
  })
}));

// Mock content data for testing
const mockServiceContent: ContentData = {
  url: '/laser-light-shows',
  title: 'Laser Light Shows',
  route: '/services/laser-light-shows',
  meta: {
    description: 'Amazing laser light shows for events',
    keywords: 'laser, shows, events',
  },
  content: {
    main_text: '<p>We provide the best laser light shows for your events.</p>',
    sections: [
      {
        title: 'Indoor Shows',
        content: '<p>Our indoor laser shows are perfect for corporate events.</p>'
      },
      {
        title: 'Outdoor Shows',
        content: '<p>Outdoor laser shows that light up the sky.</p>'
      }
    ]
  },
  resources: [
    {
      type: 'image',
      url: '/images/laser-show-featured.jpg',
      alt: 'Featured Laser Show',
      width: '1200',
      height: '800'
    },
    {
      type: 'image',
      url: '/images/laser-show-indoor.jpg',
      alt: 'Indoor Laser Show',
      width: '800',
      height: '600'
    }
  ]
};

const mockBlogContent: ContentData = {
  url: '/blog/laser-show-tips',
  title: 'Top 10 Laser Show Tips',
  route: '/blog/laser-show-tips',
  meta: {
    description: 'Tips for hosting a successful laser show',
    keywords: 'laser show, tips, events',
  },
  content: {
    main_text: '<p>Here are our top tips for hosting a laser show.</p>',
    sections: [
      {
        title: 'Preparation',
        content: '<p>Prepare your venue properly.</p>'
      }
    ]
  },
  resources: [
    {
      type: 'image',
      url: '/images/blog-featured.jpg',
      alt: 'Laser Show Planning',
      width: '900',
      height: '600'
    }
  ]
};

const mockEventContent: ContentData = {
  url: '/holiday-events',
  title: 'Holiday Events',
  route: '/events/holiday-events',
  meta: {
    description: 'Special laser shows for holidays',
    keywords: 'holiday, events, christmas, halloween',
  },
  content: {
    main_text: '<p>We offer special holiday-themed laser shows.</p>',
    sections: []
  },
  resources: []
};

describe('data-standardization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('standardizeContentItem', () => {
    test('standardizes service content correctly', () => {
      const filename = 'service_laser.json';
      const result = standardizeContentItem(filename, mockServiceContent);
      console.log('service test:', filename, '=>', result.content_type);
      // Check that the basic properties are preserved
      expect(result.title).toBe('Laser Light Shows');
      expect(result.url).toBe('/laser-light-shows');
      // Check that content type is determined correctly
      expect(result.content_type).toBe('service');

      // Check that featured image is selected correctly
      expect(result.featured_image).toBeDefined();
      expect(result.featured_image?.alt).toBe('Featured Laser Show');

      // Check that standardized sections are created
      expect(result.standardized_sections).toHaveLength(3); // Main content + 2 sections
      expect(result.standardized_sections[0].content).toContain('We provide the best laser light shows');
      expect(result.standardized_sections[1].title).toBe('Indoor Shows');
      expect(result.standardized_sections[2].title).toBe('Outdoor Shows');
    });

    test('standardizes blog content correctly', () => {
      const filename = 'blog_post_1.json';
      const result = standardizeContentItem(filename, mockBlogContent);
      console.log('blog test:', filename, '=>', result.content_type);
      // Check that content type is determined correctly
      expect(result.content_type).toBe('blog_post');

      // Check that featured image is selected correctly
      expect(result.featured_image).toBeDefined();
      expect(result.featured_image?.alt).toBe('Laser Show Planning');

      // Check that standardized sections are created
      expect(result.standardized_sections).toHaveLength(2); // Main content + 1 section
      expect(result.standardized_sections[0].content).toContain('Here are our top tips');
      expect(result.standardized_sections[1].title).toBe('Preparation');
    });

    test('standardizes event content correctly', () => {
      const filename = 'event_holiday.json';
      const result = standardizeContentItem(filename, mockEventContent);
      console.log('event test:', filename, '=>', result.content_type);
      // Check that content type is determined correctly
      expect(result.content_type).toBe('event');

      // Check that featured image is not set when no resources are available
      expect(result.featured_image).toBeUndefined();

      // Check that standardized sections are created
      expect(result.standardized_sections).toHaveLength(1); // Just main content
      expect(result.standardized_sections[0].content).toContain('We offer special holiday-themed');
    });

    test('handles content without sections', () => {
      const contentWithoutSections: ContentData = {
        ...mockServiceContent,
        content: {
          main_text: '<p>Content without sections</p>',
          sections: []
        }
      };

      const result = standardizeContentItem('test.json', contentWithoutSections);
      
      // Should just have one section for the main content
      expect(result.standardized_sections).toHaveLength(1);
      expect(result.standardized_sections[0].content).toContain('Content without sections');
    });

    test('handles content without main text', () => {
      const contentWithoutMainText: ContentData = {
        ...mockServiceContent,
        content: {
          main_text: '',
          sections: [
            {
              title: 'Section Title',
              content: '<p>Section content without main text</p>'
            }
          ]
        }
      };

      const result = standardizeContentItem('test.json', contentWithoutMainText);
      
      // Should just have sections, not main content
      expect(result.standardized_sections).toHaveLength(1);
      expect(result.standardized_sections[0].title).toBe('Section Title');
    });

    test('handles content without resources', () => {
      const contentWithoutResources: ContentData = {
        ...mockServiceContent,
        resources: []
      };

      const result = standardizeContentItem('test.json', contentWithoutResources);
      
      // Featured image should be undefined
      expect(result.featured_image).toBeUndefined();
    });
  });

  describe('helper functions', () => {
    test('percentOf calculates percentage correctly', () => {
      expect(percentOf(25, 100)).toBe('25.0');
      expect(percentOf(33, 100)).toBe('33.0');
      expect(percentOf(0, 100)).toBe('0.0');
      expect(percentOf(100, 100)).toBe('100.0');
    });
  });
}); 