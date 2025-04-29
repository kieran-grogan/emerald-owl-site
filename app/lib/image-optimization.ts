import { ImageLoaderProps } from 'next/image';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // Convert SVG to WebP if needed
  if (src.endsWith('.svg')) {
    // For now, just return the SVG as is
    // TODO: Implement SVG to WebP conversion
    return src;
  }

  // Handle other image formats
  const params = [`w=${width}`];
  if (quality) {
    params.push(`q=${quality}`);
  }

  return `${src}?${params.join('&')}`;
};

export const getImageSizes = (isHero: boolean = false) => {
  if (isHero) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
  }
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
};

export const getImageQuality = (isHero: boolean = false) => {
  return isHero ? 90 : 75;
};

export const getImageDimensions = (aspectRatio: 'square' | 'video' | 'auto' = 'auto') => {
  switch (aspectRatio) {
    case 'square':
      return { width: 800, height: 800 };
    case 'video':
      return { width: 1200, height: 675 };
    case 'auto':
    default:
      return { width: 800, height: 600 };
  }
};

export const getThumbnailDimensions = (aspectRatio: 'square' | 'video' | 'auto' = 'auto') => {
  switch (aspectRatio) {
    case 'square':
      return { width: 200, height: 200 };
    case 'video':
      return { width: 300, height: 169 };
    case 'auto':
    default:
      return { width: 200, height: 150 };
  }
};

export const getGalleryImageDimensions = (displayMode: 'slider' | 'grid' | 'masonry' = 'grid') => {
  switch (displayMode) {
    case 'slider':
      return { width: 1200, height: 675 };
    case 'grid':
      return { width: 400, height: 300 };
    case 'masonry':
      return { width: 400, height: 600 };
    default:
      return { width: 400, height: 300 };
  }
};

export const getBlogImageDimensions = (isFeatured: boolean = false) => {
  if (isFeatured) {
    return { width: 1200, height: 675 };
  }
  return { width: 800, height: 450 };
};

export const getTeamImageDimensions = () => {
  return { width: 400, height: 400 };
};

export const getServiceImageDimensions = (isHero: boolean = false) => {
  if (isHero) {
    return { width: 1200, height: 675 };
  }
  return { width: 800, height: 450 };
};

export const getEventImageDimensions = (isHero: boolean = false) => {
  if (isHero) {
    return { width: 1200, height: 675 };
  }
  return { width: 800, height: 450 };
}; 