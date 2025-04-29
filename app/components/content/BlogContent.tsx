'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/app/lib/blog-types';
import { StandardizedContentData } from '@/app/lib/data-standardization';
import { SmartLink, RichContent } from '@/app/lib/link-utils';
import { generateSlug } from '@/app/lib/route-mapping';
import { getImagePath, handleImageError } from '@/app/lib/image-utils';
import PageTransition, { SectionEntrance, FadeIn } from '@/app/components/animations/PageTransition';

interface BlogContentProps {
  post: BlogPost;
  content?: StandardizedContentData;
}

export default function BlogContent({ post, content }: BlogContentProps) {
  const isStandardizedContent = !!content;
  
  // Helper function to render sections
  const renderSections = () => {
    if (isStandardizedContent && content.standardized_sections) {
      return content.standardized_sections.map((section, index) => (
        <SectionEntrance key={index} delay={index * 0.1} className="mb-8">
          <div id={section.id || `section-${index}`}>
            {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}
            {section.content && (
              <RichContent 
                html={section.content}
                className="prose max-w-none"
                headingClass="text-xl font-semibold my-4 text-gray-800"
                paragraphClass="my-4 text-gray-700"
                listClass="list-disc ml-6 my-4 text-gray-700 space-y-2"
              />
            )}
            {section.media && section.media.length > 0 && section.media[0].type === 'image' && (
              <div className="my-6">
                <Image
                  src={section.media[0].url}
                  alt={section.media[0].alt || section.title || 'Blog section image'}
                  width={parseInt(section.media[0].width) || 800}
                  height={parseInt(section.media[0].height) || 450}
                  className="rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </SectionEntrance>
      ));
    } else {
      // Fallback to non-standardized content
      return (
        <FadeIn>
          <RichContent 
            html={post.content}
            className="prose max-w-none"
            headingClass="text-xl font-semibold my-4 text-gray-800"
            paragraphClass="my-4 text-gray-700"
            listClass="list-disc ml-6 my-4 text-gray-700 space-y-2"
          />
        </FadeIn>
      );
    }
  };

  // Render featured image
  const renderFeaturedImage = () => {
    if (isStandardizedContent && content.featured_image) {
      return (
        <FadeIn className="mb-8">
          <Image
            src={getImagePath(content.featured_image.url)}
            alt={content.featured_image.alt || post.title}
            width={parseInt(content.featured_image.width) || 1200}
            height={parseInt(content.featured_image.height) || 675}
            className="rounded-lg shadow-md w-full"
            priority
            onError={(e) => handleImageError(e, 'blog')}
          />
        </FadeIn>
      );
    } else if (post.image) {
      return (
        <FadeIn className="mb-8">
          <Image
            src={getImagePath(post.image)}
            alt={post.title}
            width={1200}
            height={675}
            className="rounded-lg shadow-md w-full"
            priority
            onError={(e) => handleImageError(e, 'blog')}
          />
        </FadeIn>
      );
    }
    
    return null;
  };

  // Render author info
  const renderAuthorInfo = () => (
    <div className="flex items-center mb-8 text-sm text-gray-600">
      {post.author_image && (
        <Image
          src={getImagePath(post.author_image)}
          alt={post.author}
          width={40}
          height={40}
          className="rounded-full mr-4"
          onError={(e) => handleImageError(e, 'team')}
        />
      )}
      <div>
        <p className="font-medium">{post.author}</p>
        <p>{new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>
    </div>
  );

  // Render tags
  const renderTags = () => {
    if (!post.tags || post.tags.length === 0) return null;

    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <SmartLink 
              href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              key={tag}
              className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm hover:bg-emerald-200 transition-colors"
            >
              {tag}
            </SmartLink>
          ))}
        </div>
      </div>
    );
  };

  // Render related posts
  const renderRelatedPosts = () => {
    if (!post.related_posts || post.related_posts.length === 0) return null;

    return (
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {post.related_posts.map(relatedPost => {
            // Generate a slug for the related post
            const relatedPostSlug = generateSlug(relatedPost);
            
            return (
              <div key={relatedPost} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold">{relatedPost}</h4>
                <SmartLink 
                  href={`/blog/${relatedPostSlug}`} 
                  className="text-emerald-600 mt-2 inline-block hover:text-emerald-800 transition-colors"
                >
                  Read more →
                </SmartLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          {renderAuthorInfo()}
          <SmartLink 
            href={`/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`} 
            className="inline-block px-4 py-1 bg-emerald-600 text-white rounded-full text-sm hover:bg-emerald-700 transition-colors"
          >
            {post.category}
          </SmartLink>
        </header>

        {renderFeaturedImage()}
        
        <div className="blog-content">
          {renderSections()}
        </div>
        
        {renderTags()}
        {renderRelatedPosts()}

        <SectionEntrance delay={0.5} className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="p-2 bg-blue-600 text-white rounded-full">
              <span className="sr-only">Share on Facebook</span>
              FB
            </button>
            <button className="p-2 bg-blue-400 text-white rounded-full">
              <span className="sr-only">Share on Twitter</span>
              TW
            </button>
            <button className="p-2 bg-emerald-600 text-white rounded-full">
              <span className="sr-only">Share on LinkedIn</span>
              LI
            </button>
          </div>
        </SectionEntrance>
      </article>
    </PageTransition>
  );
} 