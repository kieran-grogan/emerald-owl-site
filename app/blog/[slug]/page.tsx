import React from 'react';
import { notFound } from 'next/navigation';
import BlogContent from '@/app/components/content/BlogContent';
import { Metadata } from 'next';
import { BlogPost } from '@/app/lib/blog-types';
import { StandardizedContentData } from '@/app/lib/data-standardization';
import { Resource } from '@/app/lib/data';
import { getBlogPostBySlug } from '@/app/lib/blog-data';
import Image from 'next/image';

// For static generation/fallback
const blogPosts = [
  {
    id: 'laser-technology-advancements',
    title: 'Latest Advancements in Laser Show Technology',
    excerpt: 'Explore how new laser technologies are revolutionizing event productions with more vibrant colors, precision, and energy efficiency.',
    date: '2023-10-15',
    author: 'Michael Chen',
    author_image: '/images/authors/michael-chen.svg',
    category: 'Technology',
    image: '/placeholder.svg',
    slug: 'laser-technology-advancements',
    content: '<p>Placeholder content for the blog post about laser technology advancements...</p>',
    tags: ['Laser', 'Technology', 'Innovation', 'Event Production'],
    related_posts: ['Interactive Audience Engagement Techniques', 'Sustainable Event Production']
  }
  // Other blog posts would be defined here
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Ensure slug is used safely
  const slug = params.slug || '';
  const post = blogPosts.find(post => post.slug === slug);
  
  return {
    title: post ? `${post.title} | Emerald Owl Blog` : 'Blog Post | Emerald Owl Productions',
    description: post?.excerpt || 'Read our latest insights on event production and entertainment technology.'
  };
}

// Get post data from API or fallback to static data
async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    // Try to get the post from the API
    const post = await getBlogPostBySlug(slug);
    if (post) return post;
    
    // Fallback to static data if API fails
    return blogPosts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // Fallback to static data if API errors
    return blogPosts.find(post => post.slug === slug) || null;
  }
}

// This would normally be fetched from an API or database
async function getStandardizedContent(slug: string): Promise<StandardizedContentData | null> {
  // This would typically fetch from an API or database
  // For now, we'll return mock content for a specific post
  if (slug === 'advancements-in-laser-technology') {
    return {
      url: `/blog/${slug}`,
      title: 'Laser Technology Advancements',
      route: `/blog/${slug}`,
      meta: {
        description: 'Learn about the latest advancements in laser technology for events',
        keywords: 'laser technology, event production, innovation'
      },
      content: {
        main_text: '<p>Laser technology has made significant strides in recent years...</p>',
        sections: []
      },
      standardized_sections: [
        {
          id: 'evolution',
          title: 'The Evolution of Laser Technology',
          content: '<p>Laser technology has made significant leaps forward in recent years. From miniaturization to increased color range, the possibilities for event producers have expanded dramatically.</p><p>Modern laser systems are more energy-efficient, portable, and capable of producing increasingly complex effects that were once only possible with large, expensive setups.</p>',
          media: [{
            type: 'image',
            url: '/placeholder.svg',
            alt: 'Evolution of laser technology',
            width: '800',
            height: '450'
          }]
        },
        {
          id: 'applications',
          title: 'Applications in Event Production',
          content: '<p>These advancements have revolutionized how we approach event lighting and effects. With newer systems, we can create immersive environments that respond to music, movement, and even audience interaction.</p><p>Corporate events, music festivals, and theatrical productions are all benefiting from these technological improvements.</p>'
        },
        {
          id: 'future',
          title: 'What\'s on the Horizon',
          content: '<p>The future of laser technology in events looks promising with several emerging trends:</p><ul><li>AI-controlled laser choreography that adapts in real-time</li><li>Holographic integration with laser systems</li><li>Ultra-compact, high-powered systems for smaller venues</li><li>Environmentally sustainable laser solutions with reduced power consumption</li></ul><p>As these technologies mature, we expect to see even more innovative applications in the events industry.</p>'
        }
      ],
      featured_image: {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'Laser technology advancements',
        width: '1200',
        height: '675'
      },
      resources: [
        {
          type: 'pdf',
          url: '/resources/laser-safety',
          alt: 'Laser Safety Guidelines',
          width: '0',
          height: '0'
        },
        {
          type: 'pdf',
          url: '/resources/laser-specs',
          alt: 'Technical Specifications',
          width: '0',
          height: '0'
        }
      ],
      content_type: 'blog_post',
      last_updated: '2023-05-15'
    };
  }
  return null;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Ensure slug is available and used safely
  const slug = params.slug;
  if (!slug) {
    return <div>Post not found</div>;
  }
  
  const post = await getPostData(slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  
  const standardizedContent = await getStandardizedContent(slug);
  
  return (
    <BlogContent 
      post={post}
      content={standardizedContent || undefined}
    />
  );
} 