/**
 * Data Standardization Utility
 * 
 * This file provides utilities for analyzing and standardizing data structures
 * across the JSON content files from the original Emerald Owl Productions website.
 */

import { ContentData, Resource } from './data';
import { getContentFileNames, getContentData } from './content-analysis';
import { Benefits, Features } from './benefits-features';

// Event details interface for events
export interface EventDetails {
  start_date?: string;
  end_date?: string;
  location?: string;
  venue?: string;
  ticket_info?: string;
  registration_url?: string;
}

// Extended ContentData interface with standardized fields
export interface StandardizedContentData extends ContentData {
  // Additional standardized fields
  standardized_sections: Section[];
  featured_image?: Resource;
  related_content?: string[]; // Related content filenames
  content_type: string; // Page type (service, blog, etc.)
  last_updated?: string; // ISO date string
  event_details?: EventDetails; // Event details for event content types
  benefits?: Benefits; // Benefits array for service pages
  features?: Features; // Features array for service pages
}

// Section interface for standardized content sections
export interface Section {
  id: string;
  title?: string;
  content: string;
  media?: Resource[];
  className?: string;
}

/**
 * Analyze variations in JSON data structure across files
 * Returns a report of differences, common patterns, and outliers
 */
export function analyzeDataStructures(): string {
  const filenames = getContentFileNames();
  let report = '# Data Structure Analysis\n\n';
  
  // Track structure statistics
  const stats = {
    totalFiles: filenames.length,
    withSections: 0,
    withoutMainText: 0,
    withoutResources: 0,
    resourceTypeCounts: {} as Record<string, number>,
    averageResourcesPerFile: 0,
    uniqueMetaKeys: new Set<string>(),
    uniqueContentKeys: new Set<string>(),
  };
  
  // Track all resources
  let totalResources = 0;
  
  // Process each file
  filenames.forEach(filename => {
    const content = getContentData(filename);
    
    // Check for sections
    if (content.content.sections && content.content.sections.length > 0) {
      stats.withSections++;
    }
    
    // Check for main_text
    if (!content.content.main_text) {
      stats.withoutMainText++;
    }
    
    // Check for resources
    if (!content.resources || content.resources.length === 0) {
      stats.withoutResources++;
    } else {
      totalResources += content.resources.length;
      
      // Count resource types
      content.resources.forEach(resource => {
        const type = resource.type || 'undefined';
        stats.resourceTypeCounts[type] = (stats.resourceTypeCounts[type] || 0) + 1;
      });
    }
    
    // Track meta keys
    if (content.meta) {
      Object.keys(content.meta).forEach(key => stats.uniqueMetaKeys.add(key));
    }
    
    // Track content keys
    if (content.content) {
      Object.keys(content.content).forEach(key => stats.uniqueContentKeys.add(key));
    }
  });
  
  // Calculate average resources per file
  stats.averageResourcesPerFile = totalResources / stats.totalFiles;
  
  // Generate report
  report += `## Overall Statistics\n\n`;
  report += `- Total Files: ${stats.totalFiles}\n`;
  report += `- Files with Sections: ${stats.withSections} (${percentOf(stats.withSections, stats.totalFiles)}%)\n`;
  report += `- Files without Main Text: ${stats.withoutMainText} (${percentOf(stats.withoutMainText, stats.totalFiles)}%)\n`;
  report += `- Files without Resources: ${stats.withoutResources} (${percentOf(stats.withoutResources, stats.totalFiles)}%)\n`;
  report += `- Average Resources per File: ${stats.averageResourcesPerFile.toFixed(2)}\n\n`;
  
  report += `## Resource Types\n\n`;
  Object.entries(stats.resourceTypeCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([type, count]) => {
      report += `- ${type}: ${count} (${percentOf(count, totalResources)}%)\n`;
    });
  report += '\n';
  
  report += `## Meta Fields\n\n`;
  report += `- Unique Meta Fields: ${Array.from(stats.uniqueMetaKeys).join(', ')}\n\n`;
  
  report += `## Content Fields\n\n`;
  report += `- Unique Content Fields: ${Array.from(stats.uniqueContentKeys).join(', ')}\n\n`;
  
  return report;
}

/**
 * Calculate percentage and format it
 */
function percentOf(value: number, total: number): string {
  return (value / total * 100).toFixed(1);
}

/**
 * Standardize content data across all files
 * Creates standardized versions of all content data
 */
export function standardizeContent(): StandardizedContentData[] {
  const filenames = getContentFileNames();
  const standardizedContent: StandardizedContentData[] = [];
  
  filenames.forEach(filename => {
    const content = getContentData(filename);
    standardizedContent.push(standardizeContentItem(filename, content));
  });
  
  return standardizedContent;
}

/**
 * Standardize an individual content item
 */
export function standardizeContentItem(filename: string, content: ContentData): StandardizedContentData {
  // Create base standardized content
  const standardized: StandardizedContentData = {
    ...content,
    standardized_sections: [],
    content_type: determineContentType(filename),
  };
  
  // Find featured image if it exists
  if (content.resources && content.resources.length > 0) {
    // First look for images with alt text that matches the title
    const featuredImage = content.resources.find(r => 
      r.type === 'image' && 
      r.alt && 
      (r.alt.toLowerCase().includes(content.title.toLowerCase()) || 
       r.alt.toLowerCase().includes('featured') || 
       r.alt.toLowerCase().includes('main'))
    );
    
    // If none found, use the first image with alt text
    if (!featuredImage) {
      standardized.featured_image = content.resources.find(r => 
        r.type === 'image' && r.alt && r.alt.trim() !== ''
      );
    } else {
      standardized.featured_image = featuredImage;
    }
  }
  
  // Generate standardized sections
  standardized.standardized_sections = generateStandardizedSections(content);
  
  return standardized;
}

/**
 * Generate standardized sections from content
 */
function generateStandardizedSections(content: ContentData): Section[] {
  const sections: Section[] = [];
  
  // Add main content as the first section if it exists
  if (content.content.main_text) {
    sections.push({
      id: 'main-content',
      title: content.title,
      content: content.content.main_text,
      media: [],
    });
  }
  
  // Add any existing sections if they exist
  if (content.content.sections && content.content.sections.length > 0) {
    content.content.sections.forEach((section, index) => {
      sections.push({
        id: `section-${index}`,
        title: section.title || `Section ${index + 1}`,
        content: section.content || '',
        media: section.media || [],
      });
    });
  }
  
  return sections;
}

/**
 * Determine the content type based on the filename
 */
function determineContentType(filename: string): string {
  if (filename === 'homepage.json') return 'home';
  if (filename.startsWith('blog_b_')) return 'blog_post';
  if (filename.startsWith('blog_c_')) return 'blog_category';
  if (filename === 'blog.json') return 'blog';
  
  // Service pages
  const services = ['laser-light-show', 'neon-nights', 'foam-parties', 
                     'water-games', 'dripping-in-confidence', 'gunge', 
                     'sensory-friendly-experiences', 'doitnow',
                     'the-safest-experience-in-the-sky', 'benefits-for-hosting-a-laser-show'];
  
  if (services.some(service => filename.startsWith(service))) return 'service';
  
  // Event pages
  const events = ['american-anniversary-celebration', 'holiday-events', 'fundraisers'];
  if (events.some(event => filename.startsWith(event))) return 'event';
  
  // Other known pages
  if (filename === 'our-team.json' || filename === 'emmy-the-owl.json') return 'team';
  if (filename === 'contact-us.json') return 'contact';
  if (filename === 'our-story.json') return 'about';
  if (filename === 'privacy-policy.json' || filename === 'terms-of-use.json') return 'legal';
  if (filename === 'sitemap.json') return 'utility';
  if (filename === 'gallery965033.json') return 'gallery';
  if (filename === 'careers.json') return 'careers';
  
  return 'page';
}

/**
 * Generate a report on the standardized data model
 */
export function generateStandardizationReport(): string {
  const standardizedContent = standardizeContent();
  
  let report = '# Data Standardization Report\n\n';
  
  // Count by content type
  const typeCount: Record<string, number> = {};
  standardizedContent.forEach(item => {
    typeCount[item.content_type] = (typeCount[item.content_type] || 0) + 1;
  });
  
  report += `## Content Types\n\n`;
  Object.entries(typeCount)
    .sort(([, a], [, b]) => b - a)
    .forEach(([type, count]) => {
      report += `- ${type}: ${count}\n`;
    });
  report += '\n';
  
  // Section statistics
  const sectionCounts = standardizedContent.map(item => item.standardized_sections.length);
  const totalSections = sectionCounts.reduce((sum, count) => sum + count, 0);
  const avgSections = totalSections / standardizedContent.length;
  
  report += `## Section Statistics\n\n`;
  report += `- Total Sections: ${totalSections}\n`;
  report += `- Average Sections per Content Item: ${avgSections.toFixed(2)}\n`;
  report += `- Max Sections in a Single Item: ${Math.max(...sectionCounts)}\n`;
  report += `- Min Sections in a Single Item: ${Math.min(...sectionCounts)}\n\n`;
  
  // Featured image statistics
  const withFeaturedImage = standardizedContent.filter(item => item.featured_image).length;
  
  report += `## Featured Images\n\n`;
  report += `- Content with Featured Image: ${withFeaturedImage} (${percentOf(withFeaturedImage, standardizedContent.length)}%)\n\n`;
  
  return report;
} 