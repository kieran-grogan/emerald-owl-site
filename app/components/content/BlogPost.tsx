'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentData } from '../../lib/data';
import { StandardizedContentData, Section } from '../../lib/data-standardization';

interface BlogPostProps {
  content: ContentData | StandardizedContentData;
  isPreview?: boolean;
}

export default function BlogPost({ content, isPreview = false }: BlogPostProps) {
  // Check if content is standardized
  const isStandardized = 'standardized_sections' in content;
  
  // Helper to extract post date from filename or metadata
  const getPostDate = () => {
    // Try to get date from metadata
    if (content.meta && content.meta.date) {
      return new Date(content.meta.date);
    }
    
    // Default to current date
    return new Date();
  };
  
  // Helper to extract category from filename or metadata
  const getCategory = () => {
    if (isStandardized && (content as StandardizedContentData).metadata?.category) {
      return (content as StandardizedContentData).metadata.category;
    }
    
    // Try to extract from filename for blog posts
    if (content.filename?.includes('blog_c_')) {
      const categoryPart = content.filename.split('blog_c_')[1].split('_b_')[0];
      return categoryPart.replace(/-/g, ' ');
    }
    
    return 'Uncategorized';
  };
  
  // Helper to render a single section
  const renderSection = (section: Section) => {
    if (isPreview) {
      // For preview, just show the first paragraph of the first section
      return (
        <div key={section.id} className="prose dark:prose-invert max-w-none line-clamp-3">
          <p>{section.content.split('\n')[0]}</p>
        </div>
      );
    }
    
    return (
      <div key={section.id} className={`mb-10 ${section.className || ''}`}>
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
                  alt={media.alt || 'Blog image'}
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
          <div className={`relative ${isPreview ? 'h-48' : 'h-64 md:h-96'} overflow-hidden rounded-t-lg`}>
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || content.title}
              fill
              className="object-cover"
              priority={!isPreview}
              sizes={isPreview ? "100%" : "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"}
            />
          </div>
        );
      }
    }
    return null;
  };

  // Preview card for blog listing
  if (isPreview) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {renderFeaturedImage()}
        
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">{getCategory()}</span>
            <span className="mx-2">•</span>
            <time dateTime={getPostDate().toISOString()}>{getPostDate().toLocaleDateString()}</time>
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            <Link href={`/blog/${content.filename?.replace('.json', '')}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">
              {content.title}
            </Link>
          </h2>
          
          {isStandardized && (content as StandardizedContentData).standardized_sections.length > 0 ? (
            renderSection((content as StandardizedContentData).standardized_sections[0])
          ) : (
            <div className="prose dark:prose-invert max-w-none line-clamp-3">
              <p>{content.content.main_text.split('\n')[0]}</p>
            </div>
          )}
          
          <div className="mt-4">
            <Link 
              href={`/blog/${content.filename?.replace('.json', '')}`}
              className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Full blog post
  return (
    <article className="max-w-4xl mx-auto">
      {renderFeaturedImage()}
      
      <div className="px-4 sm:px-6 py-8">
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Link 
              href={`/blog/category/${getCategory().toLowerCase().replace(/ /g, '-')}`}
              className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              {getCategory()}
            </Link>
            <span className="mx-2">•</span>
            <time dateTime={getPostDate().toISOString()}>{getPostDate().toLocaleDateString()}</time>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{content.title}</h1>
          
          {content.meta.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{content.meta.description}</p>
          )}
          
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
              <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <span className="text-gray-900 dark:text-white font-medium">Emerald Owl Team</span>
            </div>
          </div>
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
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Share this post
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <Link
                href="/blog"
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 