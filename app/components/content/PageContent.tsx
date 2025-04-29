'use client';

import Image from 'next/image';
import { ContentData } from '../../lib/data';
import { StandardizedContentData, Section } from '../../lib/data-standardization';

interface PageContentProps {
  content: ContentData | StandardizedContentData;
  showFeaturedImage?: boolean;
}

export default function PageContent({ content, showFeaturedImage = true }: PageContentProps) {
  // Check if content is standardized
  const isStandardized = 'standardized_sections' in content;
  
  // Helper to render a single section
  const renderSection = (section: Section) => {
    return (
      <div key={section.id} className={`mb-12 ${section.className || ''}`}>
        {section.title && section.title !== content.title && (
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{section.title}</h2>
        )}
        
        <div className="prose dark:prose-invert max-w-none">
          {section.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
          ))}
        </div>
        
        {section.media && section.media.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.media.map((media, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-video shadow-lg">
                <Image
                  src={media.url}
                  alt={media.alt || 'Section media'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Helper to render featured image
  const renderFeaturedImage = () => {
    if (!showFeaturedImage) return null;
    
    if (isStandardized && (content as StandardizedContentData).featured_image) {
      const featuredImage = (content as StandardizedContentData).featured_image;
      if (featuredImage) {
        return (
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg mb-8">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || content.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {renderFeaturedImage()}
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{content.title}</h1>
        
        {content.meta.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">{content.meta.description}</p>
        )}
      </header>
      
      <div className="content">
        {/* Render standardized sections if available */}
        {isStandardized ? (
          (content as StandardizedContentData).standardized_sections.map(renderSection)
        ) : (
          /* Main content section */
          <div className="prose dark:prose-invert max-w-none">
            {content.content.main_text.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
} 