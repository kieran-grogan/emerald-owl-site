/**
 * Content Analysis Utility
 * 
 * This file provides utilities for analyzing and extracting information from 
 * JSON content files of the legacy Emerald Owl Productions website.
 */

const fs = require('fs');
const path = require('path');

// Base directory for content files
const CONTENT_DIR = path.join(process.cwd(), 'app/components/react_content');

/**
 * Get a list of all JSON content filenames
 */
function getContentFileNames() {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files.filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}

/**
 * Get content data from a specific file
 */
function getContentData(filename) {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading content file ${filename}:`, error);
    return null;
  }
}

/**
 * Analyze content types and create a categorized inventory
 */
function analyzeContentTypes() {
  const files = getContentFileNames();
  
  const contentTypeMap = {
    'homepage.json': 'home',
    'page': 'page',
    'service': [], // Will be populated with service pages
    'event': [], // Will be populated with event pages
    'blog_post': [], // Will be populated with blog posts
    'blog_category': [], // Will be populated with blog categories
    'legal': ['privacy-policy.json', 'terms-of-use.json'],
    'utility': ['sitemap.json'],
    'team': ['our-team.json'],
    'contact': ['contact-us.json'],
    'about': ['our-story.json']
  };
  
  // Define known service pages
  const servicePages = [
    'laser-light-show.json',
    'neon-nights.json',
    'foam-parties.json',
    'water-games.json',
    'dripping-in-confidence.json',
    'gunge.json',
    'sensory-friendly-experiences.json',
    'doitnow.json',
    'the-safest-experience-in-the-sky.json',
    'benefits-for-hosting-a-laser-show.json'
  ];
  
  // Add service pages to content type map
  contentTypeMap.service = servicePages;
  
  // Define known event pages
  const eventPages = [
    'american-anniversary-celebration.json',
    'holiday-events.json',
    'fundraisers.json'
  ];
  
  // Add event pages to content type map
  contentTypeMap.event = eventPages;
  
  // Process blog posts and categories
  files.forEach(file => {
    if (file.startsWith('blog_b_')) {
      contentTypeMap.blog_post.push(file);
    } else if (file.startsWith('blog_c_') && !file.includes('_b_')) {
      contentTypeMap.blog_category.push(file);
    }
  });
  
  return contentTypeMap;
}

/**
 * Generate a content inventory report
 */
function generateContentInventory() {
  const contentTypes = analyzeContentTypes();
  const files = getContentFileNames();
  
  let report = '# Emerald Owl Productions - Content Inventory\n\n';
  
  // Overall statistics
  report += '## Content Summary\n\n';
  report += `Total Content Files: ${files.length}\n\n`;
  
  // Content types breakdown
  report += '## Content Types\n\n';
  report += '| Content Type | Count | Notes |\n';
  report += '|-------------|-------|-------|\n';
  report += `| Home | 1 | Main homepage |\n`;
  report += `| Pages | ${contentTypes.page ? contentTypes.page.length : 0} | Generic content pages |\n`;
  report += `| Services | ${contentTypes.service.length} | Service offerings |\n`;
  report += `| Events | ${contentTypes.event.length} | Event pages |\n`;
  report += `| Blog Posts | ${contentTypes.blog_post.length} | Individual blog articles |\n`;
  report += `| Blog Categories | ${contentTypes.blog_category.length} | Blog category pages |\n`;
  report += `| Legal | ${contentTypes.legal.length} | Terms, privacy policy |\n`;
  report += `| Utility | ${contentTypes.utility.length} | Sitemap, etc. |\n`;
  report += `| Team | ${contentTypes.team.length} | Team pages |\n`;
  report += `| Contact | ${contentTypes.contact.length} | Contact pages |\n`;
  report += `| About | ${contentTypes.about.length} | About pages |\n\n`;
  
  // Detailed breakdown by type
  report += '## Detailed Content Listing\n\n';
  
  // Home
  report += '### Home\n\n';
  report += '| Filename | Title | Route |\n';
  report += '|----------|-------|-------|\n';
  const homeContent = getContentData('homepage.json');
  report += `| homepage.json | ${homeContent ? homeContent.title || 'Homepage' : 'Homepage'} | / |\n\n`;
  
  // Services
  report += '### Services\n\n';
  report += '| Filename | Title | Route |\n';
  report += '|----------|-------|-------|\n';
  contentTypes.service.forEach(file => {
    const content = getContentData(file);
    report += `| ${file} | ${content ? content.title || file.replace('.json', '') : file.replace('.json', '')} | ${content && content.route ? content.route : '/' + file.replace('.json', '')} |\n`;
  });
  report += '\n';
  
  // Events
  report += '### Events\n\n';
  report += '| Filename | Title | Route |\n';
  report += '|----------|-------|-------|\n';
  contentTypes.event.forEach(file => {
    const content = getContentData(file);
    report += `| ${file} | ${content ? content.title || file.replace('.json', '') : file.replace('.json', '')} | ${content && content.route ? content.route : '/' + file.replace('.json', '')} |\n`;
  });
  report += '\n';
  
  // Blog Posts
  report += '### Blog Posts\n\n';
  report += '| Filename | Title | Category |\n';
  report += '|----------|-------|----------|\n';
  contentTypes.blog_post.forEach(file => {
    const content = getContentData(file);
    report += `| ${file} | ${content ? content.title || file.replace('.json', '') : file.replace('.json', '')} | ${content && content.category ? content.category : 'Uncategorized'} |\n`;
  });
  report += '\n';
  
  // Blog Categories
  report += '### Blog Categories\n\n';
  report += '| Filename | Title | Post Count |\n';
  report += '|----------|-------|------------|\n';
  contentTypes.blog_category.forEach(file => {
    const content = getContentData(file);
    const categorySlug = file.replace('blog_c_', '').replace('.json', '');
    const postCount = contentTypes.blog_post.filter(post => {
      const postContent = getContentData(post);
      return postContent && postContent.category === categorySlug;
    }).length;
    report += `| ${file} | ${content ? content.title || categorySlug : categorySlug} | ${postCount} |\n`;
  });
  report += '\n';
  
  // Other Pages
  const otherTypes = ['legal', 'utility', 'team', 'contact', 'about'];
  report += '### Other Pages\n\n';
  report += '| Type | Filename | Title | Route |\n';
  report += '|------|----------|-------|-------|\n';
  otherTypes.forEach(type => {
    contentTypes[type].forEach(file => {
      const content = getContentData(file);
      report += `| ${type} | ${file} | ${content ? content.title || file.replace('.json', '') : file.replace('.json', '')} | ${content && content.route ? content.route : '/' + file.replace('.json', '')} |\n`;
    });
  });
  
  return report;
}

/**
 * Get a list of parent-child relationships between pages
 */
function getPageRelationships() {
  const files = getContentFileNames();
  const relationships = [];
  
  files.forEach(file => {
    const content = getContentData(file);
    if (content && content.parent) {
      relationships.push({
        child: file,
        parent: content.parent,
        childTitle: content.title || file.replace('.json', ''),
        parentTitle: content.parent // This should be replaced with actual title
      });
    }
  });
  
  // Try to fill in parent titles
  relationships.forEach(rel => {
    const parentFile = rel.parent.endsWith('.json') ? rel.parent : `${rel.parent}.json`;
    const parentContent = getContentData(parentFile);
    if (parentContent && parentContent.title) {
      rel.parentTitle = parentContent.title;
    }
  });
  
  return relationships;
}

module.exports = {
  getContentFileNames,
  getContentData,
  analyzeContentTypes,
  generateContentInventory,
  getPageRelationships
}; 