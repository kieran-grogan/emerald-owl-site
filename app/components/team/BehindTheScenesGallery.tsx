import Image from 'next/image';
import { BehindTheScenesImage } from '@/types/team';

interface BehindTheScenesGalleryProps {
  images: BehindTheScenesImage[];
}

export default function BehindTheScenesGallery({ images }: BehindTheScenesGalleryProps) {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      role="list"
      aria-label="Behind the scenes gallery"
    >
      {images.map((image, index) => (
        <div 
          key={index}
          role="listitem" 
          className="relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2"
        >
          <div 
            className="relative aspect-[4/3]"
            role="img"
            aria-label={image.alt}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {image.alt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 