'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { lazyLoadMedia } from '../../lib/lazy-loading.tsx';

interface ImageLightboxProps {
  images: Array<{
    url: string;
    alt?: string;
  }>;
  startIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, startIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload current image and adjacent images
    const imagesToLoad = [
      images[currentIndex].url,
      images[currentIndex - 1]?.url,
      images[currentIndex + 1]?.url,
    ].filter(Boolean);

    Promise.all(imagesToLoad.map(url => lazyLoadMedia(url))).then(() => {
      setIsLoading(false);
    });
  }, [currentIndex, images]);

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setIsLoading(true);
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(images.length - 1, prev + 1));
    setIsLoading(true);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto p-4 flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-700 rounded-lg w-full h-full" />
          </div>
        )}
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt || 'Lightbox image'}
          fill
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="100vw"
          priority
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
            aria-label="Previous image"
            disabled={currentIndex === 0}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
            aria-label="Next image"
            disabled={currentIndex === images.length - 1}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
} 