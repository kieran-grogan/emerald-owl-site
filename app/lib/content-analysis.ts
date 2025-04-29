/**
 * Content Analysis Utility
 * This file provides utilities for analyzing and categorizing the JSON content files
 * from the original Emerald Owl Productions website.
 */

import fs from 'fs';
import path from 'path';
import { ContentData } from './data';

// Path to the JSON data files
const contentDirectory = path.join(process.cwd(), 'app/components/react_content');

/**
 * Content types for categorization
 */
export enum ContentType {
  HOME = 'home',
  PAGE = 'page',
  SERVICE = 'service',
  EVENT = 'event',
  BLOG_POST = 'blog_post',
  BLOG_CATEGORY = 'blog_category',
  LEGAL = 'legal',
  UTILITY = 'utility',
  TEAM = 'team',
  CONTACT = 'contact',
  OTHER = 'other',
}

/**
 * Interface for categorized content item
 */
export interface ContentItem {
  filename: string;
  content: ContentData;
  type: ContentType;
  parent?: string; // For hierarchical relationships
  children?: string[]; // For hierarchical relationships
}

/**
 * Get all content file names
 */
export function getContentFileNames(): string[] {
  return fs.readdirSync(contentDirectory)
    .filter(filename => filename.endsWith('.json'));
}

/**
 * Get content for a specific file
 */
export function getContentData(filename: string): ContentData {
  const filePath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as ContentData;
}

/**
 * Categorize content by type
 */
export function categorizeContent(): { [key in ContentType]: ContentItem[] } {
  const filenames = getContentFileNames();
  const categorizedContent: { [key in ContentType]: ContentItem[] } = {
    [ContentType.HOME]: [],
    [ContentType.PAGE]: [],
    [ContentType.SERVICE]: [],
    [ContentType.EVENT]: [],
    [ContentType.BLOG_POST]: [],
    [ContentType.BLOG_CATEGORY]: [],
    [ContentType.LEGAL]: [],
    [ContentType.UTILITY]: [],
    [ContentType.TEAM]: [],
    [ContentType.CONTACT]: [],
    [ContentType.OTHER]: [],
  };
  
  filenames.forEach(filename => {
    const content = getContentData(filename);
    const type = determineContentType(filename, content);
    
    categorizedContent[type].push({
      filename,
      content,
      type,
    });
  });
  
  return categorizedContent;
}

/**
 * Determine content type based on filename and content
 */
function determineContentType(filename: string, content: ContentData): ContentType {
  // Homepage
  if (filename === 'homepage.json') {
    return ContentType.HOME;
  }
  
  // Blog posts
  if (filename.startsWith('blog_b_')) {
    return ContentType.BLOG_POST;
  }
  
  // Blog categories
  if (filename.startsWith('blog_c_')) {
    return ContentType.BLOG_CATEGORY;
  }
  
  // Blog main page
  if (filename === 'blog.json') {
    return ContentType.BLOG_CATEGORY;
  }
  
  // Service pages
  if (['laser-light-show.json', 'neon-nights.json', 'foam-parties.json', 
      'water-games.json', 'dripping-in-confidence.json', 'gunge.json', 
      'sensory-friendly-experiences.json', 'doitnow.json',
      'the-safest-experience-in-the-sky.json', 'benefits-for-hosting-a-laser-show.json'].includes(filename)) {
    return ContentType.SERVICE;
  }
  
  // Event pages
  if (['american-anniversary-celebration.json', 'holiday-events.json', 'fundraisers.json'].includes(filename)) {
    return ContentType.EVENT;
  }
  
  // Team pages
  if (['our-team.json', 'emmy-the-owl.json'].includes(filename)) {
    return ContentType.TEAM;
  }
  
  // Contact page
  if (filename === 'contact-us.json') {
    return ContentType.CONTACT;
  }
  
  // Legal pages
  if (['privacy-policy.json', 'terms-of-use.json'].includes(filename)) {
    return ContentType.LEGAL;
  }
  
  // Utility pages
  if (['sitemap.json', 'gallery965033.json', 'careers.json'].includes(filename)) {
    return ContentType.UTILITY;
  }
  
  // Regular pages
  if (['our-story.json'].includes(filename)) {
    return ContentType.PAGE;
  }
  
  // Default to other
  return ContentType.OTHER;
}

/**
 * Build relationships between content (parent/child pages)
 */
export function buildContentRelationships(categorizedContent: { [key in ContentType]: ContentItem[] }): { [key in ContentType]: ContentItem[] } {
  // Clone the categorized content
  const contentWithRelationships = JSON.parse(JSON.stringify(categorizedContent)) as { [key in ContentType]: ContentItem[] };
  
  // Create lookup for all content items by filename
  const contentLookup: { [key: string]: ContentItem } = {};
  Object.values(contentWithRelationships).forEach(items => {
    items.forEach(item => {
      contentLookup[item.filename] = item;
    });
  });
  
  // Set up blog post relationships with categories
  contentWithRelationships[ContentType.BLOG_POST].forEach(blogPost => {
    // Extract category from filename (e.g., blog_c_Laser-Light_b_post-title.json -> Laser-Light)
    const match = blogPost.filename.match(/blog_c_([^_]+)_b_/);
    if (match) {
      const categoryName = match[1];
      const categoryFilename = `blog_c_${categoryName}.json`;
      
      if (contentLookup[categoryFilename]) {
        // Set parent for blog post
        blogPost.parent = categoryFilename;
        
        // Add child to category
        if (!contentLookup[categoryFilename].children) {
          contentLookup[categoryFilename].children = [];
        }
        contentLookup[categoryFilename].children?.push(blogPost.filename);
      }
    }
  });
  
  // Set up main blog as parent for categories
  if (contentLookup['blog.json']) {
    contentWithRelationships[ContentType.BLOG_CATEGORY].forEach(category => {
      if (category.filename !== 'blog.json') {
        category.parent = 'blog.json';
        
        // Add child to main blog
        if (!contentLookup['blog.json'].children) {
          contentLookup['blog.json'].children = [];
        }
        contentLookup['blog.json'].children?.push(category.filename);
      }
    });
  }
  
  return contentWithRelationships;
}

/**
 * Generate detailed content report
 */
export function generateContentReport(): string {
  const categorized = categorizeContent();
  const withRelationships = buildContentRelationships(categorized);
  
  let report = '# Emerald Owl Productions - Content Inventory\n\n';
  
  // Total count
  const totalFiles = Object.values(withRelationships).reduce(
    (sum, items) => sum + items.length, 0
  );
  
  report += `Total JSON content files: ${totalFiles}\n\n`;
  
  // Add section for each content type
  Object.entries(withRelationships).forEach(([type, items]) => {
    if (items.length > 0) {
      report += `## ${type} (${items.length})\n\n`;
      
      items.forEach(item => {
        report += `- ${item.filename}: "${item.content.title}"\n`;
        
        // Add parent/child relationships if they exist
        if (item.parent) {
          const parentItem = Object.values(withRelationships)
            .flat()
            .find(i => i.filename === item.parent);
          
          report += `  - Parent: ${item.parent} (${parentItem?.content.title})\n`;
        }
        
        if (item.children && item.children.length > 0) {
          report += `  - Children (${item.children.length}):\n`;
          item.children.forEach(childFilename => {
            const childItem = Object.values(withRelationships)
              .flat()
              .find(i => i.filename === childFilename);
            
            report += `    - ${childFilename} (${childItem?.content.title})\n`;
          });
        }
      });
      
      report += '\n';
    }
  });
  
  return report;
} 