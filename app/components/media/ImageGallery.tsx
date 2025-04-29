'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { lazyLoadMedia, createLazyComponent } from '../../lib/lazy-loading.tsx';
import { useDeferredMount } from '../../lib/performance';

// Lazy load the lightbox component since it's not needed immediately
const ImageLightbox = createLazyComponent(
  () => import('./ImageLightbox'),
  <div className="fixed inset-0 bg-black bg-opacity-50 animate-pulse" />
);

export interface ImageItem {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
  displayMode?: 'slider' | 'grid' | 'masonry';
  aspectRatio?: 'square' | 'video' | 'auto';
  showThumbnails?: boolean;
  enableLightbox?: boolean;
  className?: string;
}

export default function ImageGallery({
  images,
  displayMode = 'slider',
  aspectRatio = 'video',
  showThumbnails = true,
  enableLightbox = true,
  className = '',
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Helper to get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'auto':
      default:
        return '';
    }
  };

  // Handle prev/next navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation for slider and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen || displayMode === 'slider') {
        if (e.key === 'ArrowRight') {
          goToNext();
        } else if (e.key === 'ArrowLeft') {
          goToPrev();
        } else if (e.key === 'Escape' && lightboxOpen) {
          setLightboxOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, displayMode]);

  // Scroll active thumbnail into view in slider mode
  useEffect(() => {
    if (displayMode === 'slider' && showThumbnails && thumbnailsRef.current) {
      const thumbnailElement = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex, displayMode, showThumbnails]);

  // Preload visible images
  useEffect(() => {
    const visibleImages = images.slice(
      Math.max(0, currentIndex - 1),
      Math.min(images.length, currentIndex + 2)
    );

    Promise.all(
      visibleImages.map(img => lazyLoadMedia(img.url))
    ).then(loadedUrls => {
      setLoadedImages(prev => [...new Set([...prev, ...loadedUrls])]);
    });
  }, [currentIndex, images]);

  // Defer loading of thumbnails
  useDeferredMount(() => {
    if (showThumbnails) {
      const thumbnailImages = images.map(img => img.url);
      Promise.all(
        thumbnailImages.map(url => lazyLoadMedia(url))
      ).then(loadedUrls => {
        setLoadedImages(prev => [...new Set([...prev, ...loadedUrls])]);
      });
    }
  }, 1000);

  // Render image based on display mode
  if (displayMode === 'slider') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Main slider */}
        <div ref={sliderRef} className="relative">
          <div className={`relative overflow-hidden rounded-lg ${getAspectRatioClass()}`}>
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              onClick={() => enableLightbox && setLightboxOpen(true)}
              priority={currentIndex === 0}
            />
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div 
            ref={thumbnailsRef}
            className="flex mt-2 space-x-2 overflow-x-auto pb-2 scroll-smooth"
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden ${
                  index === currentIndex 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && enableLightbox && (
          <ImageLightbox
            images={images}
            startIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    );
  }

  // Grid layout
  if (displayMode === 'grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-lg ${getAspectRatioClass()} cursor-pointer`}
            onClick={() => {
              if (enableLightbox) {
                setCurrentIndex(index);
                setLightboxOpen(true);
              }
            }}
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              loading={index < 6 ? 'eager' : 'lazy'}
              data-preload={index < 12 ? image.url : undefined}
            />
          </div>
        ))}
        
        {/* Lightbox */}
        {lightboxOpen && enableLightbox && (
          <ImageLightbox
            images={images}
            startIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    );
  }

  // Masonry layout (variable height grid)
  return (
    <div className={`columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 ${className}`}>
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-lg break-inside-avoid cursor-pointer"
          onClick={() => {
            if (enableLightbox) {
              setCurrentIndex(index);
              setLightboxOpen(true);
            }
          }}
        >
          <Image
            src={image.url}
            alt={image.alt || `Gallery image ${index + 1}`}
            width={500}
            height={image.height || 300}
            className="w-full h-auto hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            loading={index < 6 ? 'eager' : 'lazy'}
            data-preload={index < 12 ? image.url : undefined}
          />
        </div>
      ))}
      
      {/* Lightbox */}
      {lightboxOpen && enableLightbox && (
        <ImageLightbox
          images={images}
          startIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
} 