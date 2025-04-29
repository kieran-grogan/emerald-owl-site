import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { generateSitemapEntry, BASE_URL } from './lib/seo';

interface BlogPost {
  slug: string;
  date: string;
  title: string;
}

interface ServicePage {
  slug: string;
  lastModified?: string;
}

interface EventPage {
  slug: string;
  lastModified?: string;
  priority?: number;
}

/**
 * Get all blog posts for sitemap
 */
function getBlogPosts(): BlogPost[] {
  try {
    const blogDir = path.join(process.cwd(), 'public', 'data', 'blog');
    const files = fs.readdirSync(blogDir);
    
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
        const post = JSON.parse(content);
        return {
          slug: file.replace('.json', ''),
          date: post.date || new Date().toISOString(),
          title: post.title,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting blog posts for sitemap:', error);
    return [];
  }
}

/**
 * Get all service pages for sitemap
 */
function getServicePages(): ServicePage[] {
  return [
    { slug: 'laser-light-shows' },
    { slug: 'neon-nights' },
    { slug: 'foam-parties' },
    { slug: 'water-games' },
    { slug: 'light-design' },
    { slug: 'dripping-in-confidence' },
    { slug: 'gunge' },
    { slug: 'sensory-friendly-experiences' },
    { slug: 'do-it-now' },
    { slug: 'sound-production' },
    { slug: 'lighting-design' },
    { slug: 'video-production' },
    { slug: 'event-management' },
    { slug: 'equipment-rental' },
  ];
}

/**
 * Get all event pages for sitemap
 */
function getEventPages(): EventPage[] {
  return [
    { slug: 'americas-250th', priority: 0.9 },
    { slug: 'holiday-events', priority: 0.9 },
    { slug: 'fundraisers', priority: 0.9 },
  ];
}

/**
 * Generate dynamic sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages with high priority
  const corePagesHighPriority = [
    generateSitemapEntry('', undefined, 'daily', 1.0),
    generateSitemapEntry('/about', undefined, 'monthly', 0.8),
    generateSitemapEntry('/our-team', undefined, 'weekly', 0.8),
    generateSitemapEntry('/contact', undefined, 'monthly', 0.8),
  ];

  // Core pages with medium priority
  const corePagesMediumPriority = [
    generateSitemapEntry('/gallery', undefined, 'weekly', 0.7),
    generateSitemapEntry('/careers', undefined, 'daily', 0.7),
  ];

  // Blog pages
  const blogPosts = getBlogPosts().map(post => 
    generateSitemapEntry(
      `/blog/${post.slug}`,
      post.date,
      'monthly',
      0.6
    )
  );

  // Blog index and category pages
  const blogPages = [
    generateSitemapEntry('/blog', undefined, 'daily', 0.8),
    generateSitemapEntry('/blog/categories', undefined, 'weekly', 0.7),
  ];

  // Service pages
  const servicePages = getServicePages().map(service =>
    generateSitemapEntry(
      `/services/${service.slug}`,
      service.lastModified,
      'monthly',
      0.7
    )
  );

  // Service index page
  const serviceIndexPage = [
    generateSitemapEntry('/services', undefined, 'weekly', 0.8),
  ];

  // Event pages
  const eventPages = getEventPages().map(event =>
    generateSitemapEntry(
      `/events/${event.slug}`,
      event.lastModified,
      'weekly',
      event.priority || 0.7
    )
  );

  // Event index page
  const eventIndexPage = [
    generateSitemapEntry('/events', undefined, 'daily', 0.8),
  ];

  // Legal and utility pages
  const legalPages = [
    generateSitemapEntry('/privacy-policy', undefined, 'yearly', 0.3),
    generateSitemapEntry('/terms-of-service', undefined, 'yearly', 0.3),
    generateSitemapEntry('/sitemap', undefined, 'monthly', 0.3),
  ];

  // Combine all pages in order of priority
  return [
    ...corePagesHighPriority,
    ...corePagesMediumPriority,
    ...eventIndexPage,
    ...eventPages,
    ...serviceIndexPage,
    ...servicePages,
    ...blogPages,
    ...blogPosts,
    ...legalPages,
  ];
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/*.json$',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/private/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
} 