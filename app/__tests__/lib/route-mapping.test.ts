import {
  getLegacyToNextRoute,
  getNextToLegacyRoute,
  generateSlug,
  updateInternalLinks,
  getCanonicalUrl,
  updateResourceUrl,
  updateResourceUrls
} from '../../lib/route-mapping';

describe('Route Mapping Utilities', () => {
  describe('generateSlug', () => {
    test('converts text to URL-friendly slug', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('This is a Test')).toBe('this-is-a-test');
      expect(generateSlug('Special Ch@racters!')).toBe('special-chracters');
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
    });

    test('handles lowercase conversion', () => {
      expect(generateSlug('UPPERCASE')).toBe('uppercase');
      expect(generateSlug('MixedCASE')).toBe('mixedcase');
    });

    test('handles non-alphanumeric characters correctly', () => {
      expect(generateSlug('symbols: @#$%^&*()')).toBe('symbols-');
      expect(generateSlug('dashes-and_underscores')).toBe('dashesand_underscores');
    });
    
    test('handles empty strings', () => {
      expect(generateSlug('')).toBe('');
    });
  });
  
  describe('getLegacyToNextRoute', () => {
    test('maps service pages correctly', () => {
      expect(getLegacyToNextRoute('/laser-light-shows')).toBe('/services/laser-light-shows');
      expect(getLegacyToNextRoute('/neon-nights')).toBe('/services/neon-nights');
      expect(getLegacyToNextRoute('/foam-parties')).toBe('/services/foam-parties');
      expect(getLegacyToNextRoute('/gunge')).toBe('/services/gunge');
    });

    test('maps event pages correctly', () => {
      expect(getLegacyToNextRoute('/americas-250th')).toBe('/events/americas-250th');
      expect(getLegacyToNextRoute('/americas-250th-anniversary')).toBe('/events/americas-250th');
      expect(getLegacyToNextRoute('/holiday-events')).toBe('/events/holiday-events');
      expect(getLegacyToNextRoute('/fundraisers')).toBe('/events/fundraisers');
    });

    test('handles blog routes correctly', () => {
      expect(getLegacyToNextRoute('/blog')).toBe('/blog');
      expect(getLegacyToNextRoute('/blog/my-post')).toBe('/blog/my-post');
      expect(getLegacyToNextRoute('/blog/category/tech')).toBe('/blog/category/tech');
    });

    test('handles other pages correctly', () => {
      expect(getLegacyToNextRoute('/contact-us')).toBe('/contact-us');
      expect(getLegacyToNextRoute('/about')).toBe('/about');
      expect(getLegacyToNextRoute('/privacy-policy')).toBe('/legal/privacy-policy');
      expect(getLegacyToNextRoute('/terms-of-service')).toBe('/legal/terms-of-service');
    });

    test('handles resource paths without modification', () => {
      expect(getLegacyToNextRoute('/images/test.jpg')).toBe('/images/test.jpg');
      expect(getLegacyToNextRoute('/resources/document.pdf')).toBe('/resources/document.pdf');
      expect(getLegacyToNextRoute('/public/favicon.ico')).toBe('/public/favicon.ico');
    });

    test('returns original route for unmapped paths', () => {
      expect(getLegacyToNextRoute('/unknown-page')).toBe('/unknown-page');
      expect(getLegacyToNextRoute('/random-path/page')).toBe('/random-path/page');
    });

    test('handles trailing slashes', () => {
      expect(getLegacyToNextRoute('/laser-light-shows/')).toBe('/services/laser-light-shows');
      expect(getLegacyToNextRoute('/blog/')).toBe('/blog');
    });
  });

  describe('getNextToLegacyRoute', () => {
    test('maps Next.js service routes to legacy routes', () => {
      expect(getNextToLegacyRoute('/services/laser-light-shows')).toBe('/laser-light-shows');
      expect(getNextToLegacyRoute('/services/neon-nights')).toBe('/neon-nights');
      expect(getNextToLegacyRoute('/services/foam-parties')).toBe('/foam-parties');
    });

    test('maps Next.js event routes to legacy routes', () => {
      expect(getNextToLegacyRoute('/events/americas-250th')).toBe('/americas-250th-anniversary');
      expect(getNextToLegacyRoute('/events/holiday-events')).toBe('/holiday-events');
      expect(getNextToLegacyRoute('/events/fundraisers')).toBe('/fundraisers');
    });

    test('handles blog routes correctly', () => {
      expect(getNextToLegacyRoute('/blog')).toBe('/blog');
      expect(getNextToLegacyRoute('/blog/my-post')).toBe('/blog/my-post');
    });

    test('handles other pages correctly', () => {
      expect(getNextToLegacyRoute('/contact-us')).toBe('/contact-us');
      expect(getNextToLegacyRoute('/about')).toBe('/about');
      expect(getNextToLegacyRoute('/legal/privacy-policy')).toBe('/privacy-policy');
      expect(getNextToLegacyRoute('/legal/terms-of-service')).toBe('/terms-of-service');
    });

    test('handles resource paths without modification', () => {
      expect(getNextToLegacyRoute('/images/test.jpg')).toBe('/images/test.jpg');
      expect(getNextToLegacyRoute('/resources/document.pdf')).toBe('/resources/document.pdf');
    });

    test('returns original route for unmapped paths', () => {
      expect(getNextToLegacyRoute('/unknown-next-page')).toBe('/unknown-next-page');
    });

    test('handles trailing slashes', () => {
      expect(getNextToLegacyRoute('/services/laser-light-shows/')).toBe('/laser-light-shows');
    });
  });
  
  describe('updateInternalLinks', () => {
    test('updates service links in HTML content', () => {
      const html = '<a href="/laser-light-shows">Laser Shows</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="/services/laser-light-shows">Laser Shows</a>');
    });

    test('updates event links in HTML content', () => {
      const html = '<a href="/americas-250th">America\'s 250th</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="/events/americas-250th">America\'s 250th</a>');
    });

    test('handles multiple links in content', () => {
      const html = '<a href="/laser-light-shows">Laser</a> and <a href="/neon-nights">Neon</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="/services/laser-light-shows">Laser</a> and <a href="/services/neon-nights">Neon</a>');
    });

    test('preserves query parameters and hash fragments', () => {
      const html = '<a href="/laser-light-shows?query=param">Link</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="/services/laser-light-shows?query=param">Link</a>');
      
      const htmlWithHash = '<a href="/laser-light-shows#section">Link</a>';
      const updatedWithHash = updateInternalLinks(htmlWithHash);
      expect(updatedWithHash).toBe('<a href="/services/laser-light-shows#section">Link</a>');
    });

    test('does not modify external links', () => {
      const html = '<a href="https://example.com">External</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="https://example.com">External</a>');
    });

    test('handles fragment-only links', () => {
      const html = '<a href="#section">Section</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="#section">Section</a>');
    });

    test('adds leading slash to relative links', () => {
      const html = '<a href="contact-us">Contact</a>';
      const updated = updateInternalLinks(html);
      expect(updated).toBe('<a href="/contact-us">Contact</a>');
    });

    test('returns original string for empty input', () => {
      expect(updateInternalLinks('')).toBe('');
      expect(updateInternalLinks(null as unknown as string)).toBe(null as unknown as string);
      expect(updateInternalLinks(undefined as unknown as string)).toBe(undefined as unknown as string);
    });
  });

  describe('getCanonicalUrl', () => {
    test('generates full canonical URLs', () => {
      expect(getCanonicalUrl('/services/laser-light-shows')).toBe('https://emeraldowlproductions.com/services/laser-light-shows');
      expect(getCanonicalUrl('/blog/post-1')).toBe('https://emeraldowlproductions.com/blog/post-1');
    });

    test('adds leading slash if missing', () => {
      expect(getCanonicalUrl('contact-us')).toBe('https://emeraldowlproductions.com/contact-us');
    });

    test('works with custom base URL', () => {
      expect(getCanonicalUrl('/about', 'https://staging.emeraldowl.com')).toBe('https://staging.emeraldowl.com/about');
    });
    
    test('handles empty paths', () => {
      expect(getCanonicalUrl('')).toBe('https://emeraldowlproductions.com/');
    });
  });

  describe('updateResourceUrl', () => {
    test('updates URL in resource object', () => {
      const resource = { url: '/laser-light-shows', title: 'Laser Shows' };
      const updated = updateResourceUrl(resource);
      expect(updated).toEqual({ url: '/services/laser-light-shows', title: 'Laser Shows' });
    });

    test('returns original resource for null/undefined input', () => {
      expect(updateResourceUrl(null as any)).toBe(null as any);
      expect(updateResourceUrl(undefined as any)).toBe(undefined as any);
    });

    test('handles resources with missing URL property', () => {
      const resource = { url: '', title: 'No URL' };
      const updated = updateResourceUrl(resource);
      expect(updated).toEqual(resource);
    });
    
    test('preserves other properties in the resource object', () => {
      const resource = { 
        url: '/laser-light-shows', 
        title: 'Laser Shows',
        description: 'Description',
        date: '2023-01-01' 
      };
      const updated = updateResourceUrl(resource);
      expect(updated).toEqual({ 
        url: '/services/laser-light-shows', 
        title: 'Laser Shows',
        description: 'Description',
        date: '2023-01-01' 
      });
    });
  });

  describe('updateResourceUrls', () => {
    test('updates URLs in array of resources', () => {
      const resources = [
        { url: '/laser-light-shows', title: 'Laser Shows' },
        { url: '/neon-nights', title: 'Neon Nights' }
      ];
      const updated = updateResourceUrls(resources);
      expect(updated).toEqual([
        { url: '/services/laser-light-shows', title: 'Laser Shows' },
        { url: '/services/neon-nights', title: 'Neon Nights' }
      ]);
    });

    test('returns original array for null/undefined input', () => {
      expect(updateResourceUrls(null as any)).toBe(null as any);
      expect(updateResourceUrls(undefined as any)).toBe(undefined as any);
    });

    test('handles empty array', () => {
      expect(updateResourceUrls([])).toEqual([]);
    });

    test('handles non-array input', () => {
      const nonArray = { url: '/laser-light-shows' } as any;
      expect(updateResourceUrls(nonArray)).toBe(nonArray);
    });
    
    test('handles mixed resource types', () => {
      const resources = [
        { url: '/laser-light-shows', title: 'Laser Shows' },
        { url: '', title: 'Empty URL' },
        { url: '/americas-250th', title: 'Event' }
      ];
      const updated = updateResourceUrls(resources);
      expect(updated).toEqual([
        { url: '/services/laser-light-shows', title: 'Laser Shows' },
        { url: '', title: 'Empty URL' },
        { url: '/events/americas-250th', title: 'Event' }
      ]);
    });
  });
});