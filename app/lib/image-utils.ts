/**
 * Image utility functions for handling image paths and extensions
 */

/**
 * Ensures image paths use the correct file extension (.svg instead of .jpg)
 * Helps prevent 404 errors when images have been converted to a different format
 */
export function getImagePath(path: string): string {
  // If it's already an SVG or using placeholder, return as is
  if (path.includes('.svg') || path.includes('placeholder')) {
    return path;
  }
  
  // Replace .jpg or .jpeg extensions with .svg
  return path.replace(/\.(jpg|jpeg)$/i, '.svg');
}

/**
 * Get fallback image path in case the original image is not found
 */
export function getFallbackImagePath(type: 'blog' | 'event' | 'service' | 'team' | 'general' = 'general'): string {
  const fallbacks = {
    blog: '/placeholder.svg',
    event: '/placeholder.svg',
    service: '/placeholder.svg',
    team: '/placeholder.svg',
    general: '/placeholder.svg'
  };
  
  return fallbacks[type];
}

/**
 * Handle image onError to provide fallback
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, type: 'blog' | 'event' | 'service' | 'team' | 'general' = 'general'): void {
  const target = e.target as HTMLImageElement;
  target.src = getFallbackImagePath(type);
} 