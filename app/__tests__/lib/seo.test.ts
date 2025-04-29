import { generateMetadata, generateStructuredData, generateSitemapEntry, BASE_URL } from '../../lib/seo';

describe('SEO Utilities', () => {
  describe('generateMetadata', () => {
    test('generates default metadata when no options provided', () => {
      const metadata = generateMetadata({});
      
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
      expect(metadata.alternates?.canonical).toBe('/');
    });

    test('generates metadata with custom title and description', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
        canonicalPath: '/test-page'
      });
      
      expect(metadata.title).toBe('Test Page | Emerald Owl Productions');
      expect(metadata.description).toBe('Test description');
      expect(metadata.alternates?.canonical).toBe('/test-page');
      expect(metadata.openGraph?.title).toBe('Test Page | Emerald Owl Productions');
      expect(metadata.openGraph?.description).toBe('Test description');
      expect(metadata.openGraph?.url).toBe(`${BASE_URL}/test-page`);
      expect(metadata.twitter?.title).toBe('Test Page | Emerald Owl Productions');
      expect(metadata.twitter?.description).toBe('Test description');
    });

    test('handles article metadata correctly', () => {
      const metadata = generateMetadata({
        title: 'Test Article',
        type: 'article',
        publishedTime: '2023-06-01T12:00:00Z',
        modifiedTime: '2023-06-02T12:00:00Z',
        tags: ['test', 'article']
      });
      
      // Use type assertion to access extended OpenGraph properties
      const openGraph = metadata.openGraph as any;
      
      expect(openGraph?.type).toBe('article');
      expect(openGraph?.article?.publishedTime).toBe('2023-06-01T12:00:00Z');
      expect(openGraph?.article?.modifiedTime).toBe('2023-06-02T12:00:00Z');
      expect(openGraph?.article?.tags).toEqual(['test', 'article']);
    });

    test('handles noIndex flag correctly', () => {
      const metadata = generateMetadata({
        noIndex: true
      });
      
      expect(metadata.robots).toBe('noindex, nofollow');
    });
  });

  describe('generateStructuredData', () => {
    test('generates localBusiness structured data', () => {
      const localBusiness = generateStructuredData.localBusiness();
      
      expect(localBusiness['@context']).toBe('https://schema.org');
      expect(localBusiness['@type']).toBe('LocalBusiness');
      expect(localBusiness.name).toBe('Emerald Owl Productions');
      expect(localBusiness.url).toBeDefined();
      expect(localBusiness.address).toBeDefined();
    });

    test('generates service structured data', () => {
      const service = generateStructuredData.service({
        name: 'Test Service',
        description: 'Test service description',
        slug: 'test-service',
        image: '/images/test-service.jpg'
      });
      
      expect(service['@context']).toBe('https://schema.org');
      expect(service['@type']).toBe('Service');
      expect(service.name).toBe('Test Service');
      expect(service.description).toBe('Test service description');
      expect(service.url).toBe(`${BASE_URL}/services/test-service`);
      expect(service.image).toBe('/images/test-service.jpg');
      expect(service.provider?.name).toBe('Emerald Owl Productions');
    });

    test('generates blogPost structured data', () => {
      const blogPost = generateStructuredData.blogPost({
        title: 'Test Blog Post',
        description: 'Test blog post description',
        slug: 'test-blog-post',
        publishedTime: '2023-06-01T12:00:00Z',
        author: {
          name: 'Test Author',
          url: '/team/test-author'
        },
        tags: ['test', 'blog']
      });
      
      expect(blogPost['@context']).toBe('https://schema.org');
      expect(blogPost['@type']).toBe('BlogPosting');
      expect(blogPost.headline).toBe('Test Blog Post');
      expect(blogPost.description).toBe('Test blog post description');
      expect(blogPost.datePublished).toBe('2023-06-01T12:00:00Z');
      expect(blogPost.author.name).toBe('Test Author');
      expect(blogPost.keywords).toBe('test, blog');
    });

    test('generates event structured data', () => {
      const event = generateStructuredData.event({
        name: 'Test Event',
        description: 'Test event description',
        slug: 'test-event',
        startDate: '2023-06-01T12:00:00Z',
        endDate: '2023-06-01T15:00:00Z',
        location: {
          name: 'Test Venue',
          address: '123 Test St, Test City'
        },
        offers: {
          price: 15.99,
          priceCurrency: 'USD',
          availability: 'InStock',
          url: `${BASE_URL}/events/test-event/tickets`,
          validFrom: '2023-05-01T00:00:00Z'
        }
      });
      
      expect(event['@context']).toBe('https://schema.org');
      expect(event['@type']).toBe('Event');
      expect(event.name).toBe('Test Event');
      expect(event.description).toBe('Test event description');
      expect(event.startDate).toBe('2023-06-01T12:00:00Z');
      expect(event.endDate).toBe('2023-06-01T15:00:00Z');
      expect(event.location?.['@type']).toBe('Place');
      expect(event.location?.name).toBe('Test Venue');
      expect(event.offers?.price).toBe(15.99);
      expect(event.offers?.availability).toBe('https://schema.org/InStock');
    });
  });

  describe('generateSitemapEntry', () => {
    test('generates sitemap entry with default values', () => {
      const entry = generateSitemapEntry('/test-page');
      
      expect(entry.url).toBe(`${BASE_URL}/test-page`);
      expect(entry.lastModified).toBeDefined(); // Should be today's date
      expect(entry.changeFrequency).toBe('monthly');
      expect(entry.priority).toBe(0.5);
    });

    test('generates sitemap entry with custom values', () => {
      const entry = generateSitemapEntry(
        '/important-page',
        '2023-06-01',
        'weekly',
        0.8
      );
      
      expect(entry.url).toBe(`${BASE_URL}/important-page`);
      expect(entry.lastModified).toBe('2023-06-01');
      expect(entry.changeFrequency).toBe('weekly');
      expect(entry.priority).toBe(0.8);
    });
  });
}); 