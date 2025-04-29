'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageItem } from './ImageGallery';

interface ResponsiveImageProps {
  image: ImageItem;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  objectPosition?: string;
  blurEffect?: boolean;
  clickable?: boolean;
  alt?: string;
  className?: string;
  caption?: string;
  showCaption?: boolean;
  onImageClick?: () => void;
}

export default function ResponsiveImage({
  image,
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  quality = 80,
  objectFit = 'cover',
  objectPosition = 'center',
  blurEffect = false,
  clickable = false,
  alt,
  className = '',
  caption,
  showCaption = false,
  onImageClick,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Default blur data URL for loading state
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXU4ZlQAAAABJRU5ErkJggg==';
  
  // Handle image load complete
  const handleLoadComplete = () => {
    setIsLoaded(true);
  };
  
  // Handle image load error
  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${image.url}`);
  };
  
  // Handle image click
  const handleClick = () => {
    if (clickable && onImageClick) {
      onImageClick();
    }
  };
  
  // Determine image alt text
  const imageAlt = alt || image.alt || '';
  
  // Image wrapper class with hover effects when clickable
  const wrapperClassName = `
    ${className}
    relative
    overflow-hidden
    ${clickable ? 'cursor-pointer' : ''}
    ${!isLoaded ? 'bg-gray-200 animate-pulse dark:bg-gray-700' : ''}
  `.trim();
  
  // Image class with transition effects
  const imageClassName = `
    transition-opacity duration-500
    ${!isLoaded ? 'opacity-0' : 'opacity-100'}
    ${objectFit === 'cover' ? 'object-cover' : 
      objectFit === 'contain' ? 'object-contain' : 
      objectFit === 'fill' ? 'object-fill' : 'object-none'}
    ${clickable ? 'hover:scale-105 transition-transform duration-300' : ''}
  `.trim();
  
  // Error fallback
  if (error) {
    return (
      <div className={`${wrapperClassName} bg-gray-100 dark:bg-gray-800 flex items-center justify-center`} style={{ width, height }}>
        <div className="text-center p-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
        </div>
      </div>
    );
  }
  
  return (
    <figure className={`${showCaption ? 'relative' : ''}`}>
      <div 
        className={wrapperClassName}
        onClick={handleClick}
        style={{ width: !fill ? width : undefined, height: !fill ? height : undefined }}
      >
        {fill ? (
          // Fill mode (takes full size of container)
          <Image
            src={image.url}
            alt={imageAlt}
            fill
            sizes={sizes}
            quality={quality}
            priority={priority}
            className={imageClassName}
            style={{ objectPosition }}
            onLoad={handleLoadComplete}
            onError={handleError}
            placeholder={blurEffect ? 'blur' : 'empty'}
            blurDataURL={blurEffect ? blurDataURL : undefined}
          />
        ) : (
          // Fixed width/height mode
          <Image
            src={image.url}
            alt={imageAlt}
            width={width || (image.width ? parseInt(image.width.toString()) : 500)}
            height={height || (image.height ? parseInt(image.height.toString()) : 300)}
            sizes={sizes}
            quality={quality}
            priority={priority}
            className={imageClassName}
            style={{ objectPosition }}
            onLoad={handleLoadComplete}
            onError={handleError}
            placeholder={blurEffect ? 'blur' : 'empty'}
            blurDataURL={blurEffect ? blurDataURL : undefined}
          />
        )}
      </div>
      {showCaption && (caption || image.alt) && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
          {caption || image.alt}
        </figcaption>
      )}
    </figure>
  );
} 