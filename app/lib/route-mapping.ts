/**
 * Utility functions for mapping routes between legacy JSON content and Next.js routes
 */

type RouteMap = {
  [key: string]: string;
};

// Legacy to Next.js route mapping
const legacyToNextMap: RouteMap = {
  // Service pages
  '/laser-light-shows': '/services/laser-light-shows',
  '/neon-nights': '/services/neon-nights',
  '/foam-parties': '/services/foam-parties',
  '/water-games': '/services/water-games',
  '/dripping-in-confidence': '/services/dripping-in-confidence',
  '/gunge': '/services/gunge',
  '/sensory-friendly-experiences': '/services/sensory-friendly-experiences',
  '/do-it-now': '/services/do-it-now',
  
  // Event pages
  '/americas-250th': '/events/americas-250th',
  '/americas-250th-anniversary': '/events/americas-250th',
  '/holiday-events': '/events/holiday-events',
  '/fundraisers': '/events/fundraisers',
  
  // Blog pages (general pattern)
  '/blog': '/blog',
  
  // Other pages
  '/contact-us': '/contact-us',
  '/about': '/about',
  '/our-team': '/our-team',
  '/gallery': '/gallery',
  '/sitemap': '/sitemap',
  '/privacy-policy': '/legal/privacy-policy',
  '/terms-of-service': '/legal/terms-of-service',
};

// Next.js to legacy route mapping (reverse of the above)
const nextToLegacyMap: RouteMap = Object.entries(legacyToNextMap).reduce(
  (acc, [legacy, next]) => {
    acc[next] = legacy;
    return acc;
  },
  {} as RouteMap
);

/**
 * Convert a legacy route to a Next.js route
 * @param legacyRoute The original route from JSON content
 * @returns The corresponding Next.js route or the original route if no mapping exists
 */
export function getLegacyToNextRoute(legacyRoute: string): string {
  // Clean the route (remove trailing slashes, etc.)
  const cleanRoute = legacyRoute.endsWith('/') 
    ? legacyRoute.slice(0, -1) 
    : legacyRoute;

  // Handle blog posts specifically
  if (cleanRoute.startsWith('/blog/')) {
    // Keep the blog post slug path as is
    return cleanRoute;
  }
  
  // Handle resource paths that should remain as is
  if (cleanRoute.startsWith('/images/') || 
      cleanRoute.startsWith('/resources/') ||
      cleanRoute.startsWith('/public/')) {
    return cleanRoute;
  }

  // Return the mapped route or the original if no mapping exists
  return legacyToNextMap[cleanRoute] || cleanRoute;
}

/**
 * Convert a Next.js route to a legacy route
 * @param nextRoute The Next.js route
 * @returns The corresponding legacy route or the original route if no mapping exists
 */
export function getNextToLegacyRoute(nextRoute: string): string {
  // Clean the route
  const cleanRoute = nextRoute.endsWith('/') 
    ? nextRoute.slice(0, -1) 
    : nextRoute;
  
  // Handle blog posts specifically
  if (cleanRoute.startsWith('/blog/')) {
    // Keep the blog post slug path as is
    return cleanRoute;
  }
  
  // Handle resource paths that should remain as is
  if (cleanRoute.startsWith('/images/') || 
      cleanRoute.startsWith('/resources/') || 
      cleanRoute.startsWith('/public/')) {
    return cleanRoute;
  }
  
  // Return the mapped route or the original if no mapping exists
  return nextToLegacyMap[cleanRoute] || cleanRoute;
}

/**
 * Generate a URL slug from a string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

/**
 * Handles internal links within content to ensure they use the correct Next.js routes
 * @param html HTML content that may contain internal links
 * @returns Updated HTML with corrected internal links
 */
export function updateInternalLinks(html: string): string {
  if (!html) return html;
  
  // Create a regex pattern to match href attributes
  const hrefPattern = /href=["']([^"']+)["']/g;
  
  // Replace internal links with their Next.js equivalents
  return html.replace(hrefPattern, (match, url) => {
    // Skip empty URLs, fragment links, and absolute URLs with protocols
    if (!url || url === '#' || url.includes('://')) {
      return match;
    }
    
    // Handle fragment links (e.g., #section-1)
    if (url.startsWith('#')) {
      return match;
    }
    
    // Handle relative links that don't start with /
    if (!url.startsWith('/')) {
      // For relative links without a leading slash, ensure they start with /
      url = `/${url}`;
    }
    
    // Check if the URL has query parameters or a hash fragment
    let queryOrHash = '';
    let baseUrl = url;
    
    // Handle query parameters
    if (url.includes('?')) {
      const [base, query] = url.split('?', 2);
      baseUrl = base;
      queryOrHash = `?${query}`;
    }
    
    // Handle hash fragments
    if (url.includes('#')) {
      const [base, hash] = url.split('#', 2);
      baseUrl = base;
      queryOrHash = `#${hash}`;
    }
    
    // Get the corresponding Next.js route for the base URL
    const newBaseUrl = getLegacyToNextRoute(baseUrl);
    
    // Combine the new base URL with any query parameters or hash fragments
    const newUrl = `${newBaseUrl}${queryOrHash}`;
    
    return `href="${newUrl}"`;
  });
}

/**
 * Create canonical URLs for SEO
 * @param path The current path
 * @param baseUrl The base URL of the site
 * @returns A full canonical URL
 */
export function getCanonicalUrl(path: string, baseUrl: string = 'https://emeraldowlproductions.com'): string {
  // Clean and normalize the path
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Return the full URL
  return `${baseUrl}${cleanPath}`;
}

/**
 * Safely update URLs in resource objects
 * @param resource The resource object with a URL property
 * @returns The resource with updated URL mapping
 */
export function updateResourceUrl<T extends { url: string }>(resource: T): T {
  if (!resource || !resource.url) return resource;
  
  const updatedUrl = getLegacyToNextRoute(resource.url);
  return { ...resource, url: updatedUrl };
}

/**
 * Process a collection of resources to update their URLs
 * @param resources Array of resources with URL properties
 * @returns Array of resources with updated URLs
 */
export function updateResourceUrls<T extends { url: string }>(resources: T[]): T[] {
  if (!resources || !Array.isArray(resources)) return resources;
  
  return resources.map(updateResourceUrl);
} 