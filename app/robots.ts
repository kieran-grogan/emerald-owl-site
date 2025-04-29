import { MetadataRoute } from 'next';
import { BASE_URL } from './lib/seo';

/**
 * Generate robots.txt file for search engines
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/_next/',
        '/*.json$',
      ]
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
} 