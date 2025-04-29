import { BlogPost, BlogCategory } from './blog-types';
import { getLegacyToNextRoute, generateSlug, updateInternalLinks } from './route-mapping';
import fs from 'fs';
import path from 'path';

// Directory where blog content JSON files are stored
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Load all blog posts from JSON files
 * @returns An array of processed blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Check if the content directory exists
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Blog content directory not found: ${CONTENT_DIR}`);
      return getMockBlogPosts(); // Fallback to mock data if directory doesn't exist
    }

    // Read all JSON files in the content directory
    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.json'));
    
    // Process each JSON file into a blog post
    const posts = files.map(file => {
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      
      // Process the blog post data
      return processBlogPostData(jsonData);
    });
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return getMockBlogPosts(); // Fallback to mock data if an error occurs
  }
}

/**
 * Process raw blog post data from JSON
 * @param data Raw JSON data
 * @returns Processed BlogPost object
 */
function processBlogPostData(data: any): BlogPost {
  // Generate a slug if not provided
  const slug = data.slug || generateSlug(data.title);
  
  // Process content to update internal links
  const processedContent = updateInternalLinks(data.content || '');
  
  // Map the raw data to our BlogPost interface
  return {
    id: data.id || `blog-${slug}`,
    title: data.title,
    excerpt: data.excerpt || '',
    content: processedContent,
    date: data.date || new Date().toISOString(),
    author: data.author || 'Emerald Owl Productions',
    category: data.category || 'Uncategorized',
    slug: slug,
    image: data.image || '/placeholder.svg',
    tags: data.tags || [],
    related_posts: data.related_posts || [],
  };
}

/**
 * Get a specific blog post by slug
 * @param slug The blog post slug
 * @returns The blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

/**
 * Get all blog posts for a specific category
 * @param category The category slug
 * @returns An array of blog posts in the category
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  
  return allPosts.filter(post => {
    // Match either by category ID or by generating a slug from the category name
    const categorySlug = generateSlug(post.category);
    return categorySlug === category;
  });
}

/**
 * Get all blog categories
 * @returns An array of blog categories
 */
export async function getAllCategories(): Promise<BlogCategory[]> {
  const allPosts = await getAllBlogPosts();
  
  // Extract unique categories
  const categories = new Map<string, BlogCategory>();
  
  allPosts.forEach(post => {
    const categoryName = post.category;
    const categorySlug = generateSlug(categoryName);
    
    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        id: categorySlug,
        name: categoryName,
        description: `Articles about ${categoryName}`,
        slug: categorySlug
      });
    }
  });
  
  return Array.from(categories.values());
}

/**
 * Mock blog posts for development and fallback
 */
function getMockBlogPosts(): BlogPost[] {
  return [
    {
      id: 'blog-1',
      title: 'Advancements in Laser Technology for Live Events',
      excerpt: 'Discover the latest innovations in laser technology and how they are transforming live events and productions.',
      content: '<p>This is a mock blog post about laser technology advancements...</p>',
      date: '2023-09-15',
      author: 'Alex Thompson',
      category: 'Technology',
      slug: 'advancements-in-laser-technology',
      image: '/placeholder.svg',
      tags: ['lasers', 'technology', 'events'],
      related_posts: []
    },
    {
      id: 'blog-2',
      title: 'Sustainable Event Production: Reducing Environmental Impact',
      excerpt: 'Learn how event production companies are implementing eco-friendly practices to minimize their carbon footprint.',
      content: '<p>This is a mock blog post about sustainable event production...</p>',
      date: '2023-08-22',
      author: 'Jordan Williams',
      category: 'Sustainability',
      slug: 'sustainable-event-production',
      image: '/placeholder.svg',
      tags: ['sustainability', 'eco-friendly', 'events'],
      related_posts: []
    },
    {
      id: 'blog-3',
      title: 'Corporate Event Trends for 2024',
      excerpt: 'Stay ahead of the curve with these emerging trends shaping corporate events in the coming year.',
      content: '<p>This is a mock blog post about corporate event trends...</p>',
      date: '2023-10-05',
      author: 'Morgan Lee',
      category: 'Corporate Events',
      slug: 'corporate-event-trends-2024',
      image: '/placeholder.svg',
      tags: ['corporate', 'trends', 'events'],
      related_posts: []
    },
    {
      id: 'blog-4',
      title: 'How to Maximize Audience Engagement at Your Next Event',
      excerpt: 'Effective strategies to create memorable experiences and boost audience participation.',
      content: '<p>This is a mock blog post about audience engagement techniques...</p>',
      date: '2023-07-18',
      author: 'Taylor Smith',
      category: 'Event Planning',
      slug: 'maximize-audience-engagement',
      image: '/placeholder.svg',
      tags: ['audience', 'engagement', 'planning'],
      related_posts: []
    },
    {
      id: 'blog-5',
      title: 'Innovative Holiday Lighting Designs for Winter Events',
      excerpt: 'Creative lighting concepts to transform your winter celebration into a magical experience.',
      content: '<p>This is a mock blog post about holiday lighting designs...</p>',
      date: '2023-11-12',
      author: 'Jamie Parker',
      category: 'Holiday Events',
      slug: 'holiday-lighting-designs',
      image: '/placeholder.svg',
      tags: ['holiday', 'lighting', 'design'],
      related_posts: []
    },
    {
      id: 'blog-6',
      title: 'The Art of Audio-Visual Integration for Seamless Events',
      excerpt: 'Best practices for creating harmonious audio-visual experiences that leave lasting impressions.',
      content: '<p>This is a mock blog post about audio-visual integration...</p>',
      date: '2023-09-30',
      author: 'Casey Reynolds',
      category: 'Audio-Visual',
      slug: 'audio-visual-integration',
      image: '/placeholder.svg',
      tags: ['audio', 'visual', 'integration'],
      related_posts: []
    }
  ];
}

/**
 * Get a paginated list of blog posts
 * @param page Page number (1-based)
 * @param pageSize Number of posts per page
 * @returns Paginated posts and pagination metadata
 */
export async function getPaginatedBlogPosts(page: number = 1, pageSize: number = 6) {
  const allPosts = await getAllBlogPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  // Get posts for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      totalPosts,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  };
} 