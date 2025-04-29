'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentData } from '../../lib/data';
import { StandardizedContentData, Section } from '../../lib/data-standardization';
import { BenefitOrFeature } from '../../lib/benefits-features';

interface ServiceContentProps {
  content: ContentData | StandardizedContentData;
}

export default function ServiceContent({ content }: ServiceContentProps) {
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
                  alt={media.alt || 'Service feature'}
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
  const renderHero = () => {
    if (isStandardized && (content as StandardizedContentData).featured_image) {
      const featuredImage = (content as StandardizedContentData).featured_image;
      if (featuredImage) {
        return (
          <div className="relative h-96 overflow-hidden mb-8">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || content.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h1>
                  {content.meta.description && (
                    <p className="text-xl text-white/80">{content.meta.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Fallback if no featured image
    return (
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h1>
          {content.meta.description && (
            <p className="text-xl text-white/80 max-w-3xl">{content.meta.description}</p>
          )}
        </div>
      </div>
    );
  };

  // Render benefits section
  const renderBenefits = () => {
    if (isStandardized) {
      const standardizedContent = content as StandardizedContentData;
      if (standardizedContent.benefits && standardizedContent.benefits.length > 0) {
        return (
          <div className="bg-gray-50 dark:bg-gray-800 py-12 my-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Benefits
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standardizedContent.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-800 dark:text-gray-200">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
    
    return getBenefitsSection();
  };
  
  // Render features section
  const renderFeatures = () => {
    if (isStandardized) {
      const standardizedContent = content as StandardizedContentData;
      if (standardizedContent.features && standardizedContent.features.length > 0) {
        return (
          <div className="py-12 my-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {standardizedContent.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-800 dark:text-gray-200">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
    
    return null;
  };

  // Extract benefits and features from sections
  const getBenefitsSection = () => {
    if (!isStandardized) return null;
    
    const standardizedContent = content as StandardizedContentData;
    const sections = standardizedContent.standardized_sections;
    const benefitsSection = sections.find(section => 
      section.title?.toLowerCase().includes('benefit') || 
      section.title?.toLowerCase().includes('feature')
    );
    
    if (!benefitsSection) return null;
    
    // Extract bullet points
    const bulletPoints = benefitsSection.content
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim());
    
    if (bulletPoints.length === 0) return null;
    
    return (
      <div className="bg-gray-50 dark:bg-gray-800 py-12 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {benefitsSection.title || 'Benefits & Features'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bulletPoints.map((point, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <article>
      {renderHero()}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Render standardized sections if available */}
          {isStandardized ? (
            <>
              {(content as StandardizedContentData).standardized_sections
                .filter(section => !section.title?.toLowerCase().includes('benefit') && 
                                   !section.title?.toLowerCase().includes('feature'))
                .map(renderSection)}
              
              {renderBenefits()}
              {renderFeatures()}
              
              {/* Call to Action */}
              <div className="bg-emerald-700 text-white rounded-lg p-8 my-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Ready to Experience {content.title}?</h2>
                <p className="mb-6">Contact us today to book this service for your next event!</p>
                <Link 
                  href="/contact-us" 
                  className="inline-block bg-white text-emerald-700 font-bold py-3 px-6 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </>
          ) : (
            /* Main content section */
            <div className="prose dark:prose-invert max-w-none">
              {content.content.main_text.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
              ))}
              
              {/* Simple Call to Action for non-standardized content */}
              <div className="bg-emerald-700 text-white rounded-lg p-8 my-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Interested in Our {content.title} Service?</h2>
                <p className="mb-6">Contact us today to learn more and book this experience!</p>
                <Link 
                  href="/contact-us" 
                  className="inline-block bg-white text-emerald-700 font-bold py-3 px-6 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
} 