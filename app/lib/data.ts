import fs from 'fs';
import path from 'path';
import { StandardizedContentData, standardizeContentItem } from './data-standardization';

// Define interfaces for the content
export interface Resource {
  type: string;
  url: string;
  alt: string;
  width: string;
  height: string;
}

export interface ContentData {
  url: string;
  title: string;
  route: string;
  meta: {
    description: string;
    keywords: string;
  };
  content: {
    main_text: string;
    sections: any[];
  };
  resources: Resource[];
}

// Define section interface to be used in content
export interface ContentSection {
  title?: string;
  content: string;
  media?: Resource[];
}

// Path to the JSON data files
const dataDirectory = path.join(process.cwd(), 'app/components/react_content');

// Get all content file names
export function getContentFileNames(): string[] {
  return fs.readdirSync(dataDirectory)
    .filter(filename => filename.endsWith('.json'));
}

// Get content for a specific file
export function getContentData(filename: string): ContentData {
  const filePath = path.join(dataDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as ContentData;
}

// Get standardized content for a specific file
export function getStandardizedContentData(filename: string): StandardizedContentData {
  const content = getContentData(filename);
  return standardizeContentItem(filename, content);
}

// Get all pages content
export function getAllPagesContent(): { [key: string]: ContentData } {
  const filenames = getContentFileNames();
  const allPagesData: { [key: string]: ContentData } = {};
  
  filenames.forEach(filename => {
    const key = filename.replace(/\.json$/, '');
    allPagesData[key] = getContentData(filename);
  });
  
  return allPagesData;
}

// Get all standardized pages content
export function getAllStandardizedContent(): { [key: string]: StandardizedContentData } {
  const filenames = getContentFileNames();
  const allStandardizedData: { [key: string]: StandardizedContentData } = {};
  
  filenames.forEach(filename => {
    const key = filename.replace(/\.json$/, '');
    const content = getContentData(filename);
    allStandardizedData[key] = standardizeContentItem(filename, content);
  });
  
  return allStandardizedData;
}

// Get content by type
export function getContentByType(contentType: string): StandardizedContentData[] {
  const allContent = getAllStandardizedContent();
  
  return Object.values(allContent)
    .filter(content => content.content_type === contentType);
}

// Get blog posts only (files that start with 'blog_b_')
export function getBlogPosts(): StandardizedContentData[] {
  return getContentByType('blog_post');
}

// Get blog categories
export function getBlogCategories(): StandardizedContentData[] {
  return getContentByType('blog_category');
}

// Get service pages
export function getServicePages(): StandardizedContentData[] {
  return getContentByType('service');
}

// Get event pages
export function getEventPages(): StandardizedContentData[] {
  return getContentByType('event');
}

// Get content for a specific route
export function getContentByRoute(route: string): StandardizedContentData | null {
  const allContent = getAllStandardizedContent();
  
  for (const key in allContent) {
    if (allContent[key].route === route) {
      return allContent[key];
    }
  }
  
  return null;
}

// Get related content for a specific content item
export function getRelatedContent(content: StandardizedContentData, limit: number = 3): StandardizedContentData[] {
  const contentType = content.content_type;
  const allOfType = getContentByType(contentType);
  
  // Filter out the current content and limit the results
  return allOfType
    .filter(item => item.route !== content.route)
    .slice(0, limit);
} 