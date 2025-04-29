'use client';

import Image from 'next/image';
import { ContentData, Resource } from '../lib/data';
import { StandardizedContentData, Section } from '../lib/data-standardization';

interface ContentDisplayProps {
  content: ContentData | StandardizedContentData;
  layoutStyle?: 'default' | 'hero' | 'card' | 'feature';
}

export default function ContentDisplay({ content, layoutStyle = 'default' }: ContentDisplayProps) {
  // Check if content is standardized
  const isStandardized = 'standardized_sections' in content;
  
  // Helper to render resources (focusing on images)
  const renderResources = () => {
    if (!content.resources || content.resources.length === 0) {
      return null;
    }

    return (
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {content.resources
          .filter((resource: Resource) => resource.type === 'image' && resource.alt)
          .map((resource: Resource, index: number) => (
            <div key={index} className="relative overflow-hidden rounded-lg aspect-video">
              <Image
                src={resource.url}
                alt={resource.alt || 'Content image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
      </div>
    );
  };

  // Helper to render a single section
  const renderSection = (section: Section) => {
    return (
      <div key={section.id} className={`mb-8 ${section.className || ''}`}>
        {section.title && section.title !== content.title && (
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
        )}
        
        <div className="prose dark:prose-invert max-w-none">
          {section.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {section.media && section.media.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.media.map((media, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-video">
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
    if (isStandardized && (content as StandardizedContentData).featured_image) {
      const featuredImage = (content as StandardizedContentData).featured_image;
      if (featuredImage) {
        return (
          <div className="relative overflow-hidden rounded-lg aspect-video mb-6">
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

  // Render different layouts
  if (layoutStyle === 'hero') {
    return (
      <div className="container mx-auto px-4 py-8">
        {renderFeaturedImage()}
        
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        
        {content.meta.description && (
          <p className="text-lg text-gray-600 mb-6 dark:text-gray-300">{content.meta.description}</p>
        )}
        
        {isStandardized ? (
          (content as StandardizedContentData).standardized_sections.map(renderSection)
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            {content.content.main_text.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  if (layoutStyle === 'card') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {renderFeaturedImage()}
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          
          {content.meta.description && (
            <p className="text-gray-600 mb-4 dark:text-gray-300">{content.meta.description}</p>
          )}
          
          {isStandardized ? (
            (content as StandardizedContentData).standardized_sections.length > 0 && (
              <div className="prose dark:prose-invert max-w-none line-clamp-3">
                {(content as StandardizedContentData).standardized_sections[0].content.split('\n')[0]}
              </div>
            )
          ) : (
            <div className="prose dark:prose-invert max-w-none line-clamp-3">
              {content.content.main_text.split('\n')[0]}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (layoutStyle === 'feature') {
    return (
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          {renderFeaturedImage() || (
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-video" />
          )}
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
          
          {content.meta.description && (
            <p className="text-gray-600 mb-4 dark:text-gray-300">{content.meta.description}</p>
          )}
          
          {isStandardized ? (
            (content as StandardizedContentData).standardized_sections.length > 0 && (
              <div className="prose dark:prose-invert max-w-none">
                {(content as StandardizedContentData).standardized_sections[0].content
                  .split('\n')
                  .slice(0, 2)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                }
              </div>
            )
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              {content.content.main_text
                .split('\n')
                .slice(0, 2)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              }
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default layout
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      
      {/* Meta information */}
      {content.meta.description && (
        <p className="text-gray-600 mb-6 dark:text-gray-300">{content.meta.description}</p>
      )}
      
      {/* Render standardized sections if available */}
      {isStandardized ? (
        (content as StandardizedContentData).standardized_sections.map(renderSection)
      ) : (
        /* Main content section */
        <div className="prose dark:prose-invert max-w-none">
          {content.content.main_text.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      
      {/* Resources (like images) */}
      {!isStandardized && renderResources()}
    </div>
  );
} 