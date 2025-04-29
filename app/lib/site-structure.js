/**
 * Site Structure Analysis Utility
 * 
 * This file provides utilities for analyzing and mapping the site structure and navigation
 * from the original Emerald Owl Productions website content.
 */

const contentAnalysis = require('./content-analysis');
const dataStandardization = require('./data-standardization');

/**
 * Page node interface for site structure
 */
const PageType = {
  HOME: 'home',
  SERVICE: 'service',
  EVENT: 'event',
  BLOG_INDEX: 'blog_index',
  BLOG_CATEGORY: 'blog_category',
  BLOG_POST: 'blog_post',
  TEAM: 'team',
  ABOUT: 'about',
  CONTACT: 'contact',
  LEGAL: 'legal',
  UTILITY: 'utility',
  OTHER: 'other'
};

/**
 * Map the current site navigation structure
 */
function mapSiteNavigation() {
  // Get all content
  const filenames = contentAnalysis.getContentFileNames();
  
  // Primary navigation structure
  const navigation = {
    primary: [],
    footer: [],
    services: [],
    events: [],
    blog: {
      categories: [],
      recent: []
    },
    legal: []
  };
  
  // Find homepage content to extract navigation
  const homepageContent = contentAnalysis.getContentData('homepage.json');
  
  // Extract main navigation items using homepage content text
  // Typical structure: "Home Our Experiences Laser Light Show..."
  if (homepageContent && homepageContent.content && homepageContent.content.main_text) {
    const mainText = homepageContent.content.main_text;

    // Primary navigation sections (rough extraction based on content patterns)
    if (mainText.includes('Our Experiences')) {
      navigation.primary.push({
        title: 'Our Experiences',
        url: '/our-experiences',
        type: 'dropdown',
        children: []
      });
    }
    
    if (mainText.includes('Special Occasions') || mainText.includes('Upcoming Events')) {
      navigation.primary.push({
        title: 'Events',
        url: '/events',
        type: 'dropdown',
        children: []
      });
    }
    
    if (mainText.includes('Blog')) {
      navigation.primary.push({
        title: 'Blog',
        url: '/blog',
        type: 'link'
      });
    }
    
    if (mainText.includes('Contact Us')) {
      navigation.primary.push({
        title: 'Contact Us',
        url: '/contact-us',
        type: 'link'
      });
    }
    
    if (mainText.includes('Our Story')) {
      navigation.primary.push({
        title: 'About',
        url: '/our-story',
        type: 'dropdown',
        children: [
          { title: 'Our Story', url: '/our-story', type: 'link' }
        ]
      });
    }
    
    if (mainText.includes('Our Team')) {
      // Find the About dropdown, or create it
      const aboutSection = navigation.primary.find(item => item.title === 'About');
      if (aboutSection) {
        aboutSection.children.push({ 
          title: 'Our Team',
          url: '/our-team',
          type: 'link'
        });
      } else {
        navigation.primary.push({
          title: 'About',
          url: '/about',
          type: 'dropdown',
          children: [
            { title: 'Our Team', url: '/our-team', type: 'link' }
          ]
        });
      }
    }
  }
  
  // Add service pages to the "Our Experiences" dropdown
  const services = [
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
  
  services.forEach(serviceFile => {
    try {
      const serviceContent = contentAnalysis.getContentData(serviceFile);
      if (serviceContent) {
        const serviceItem = {
          title: serviceContent.title || serviceFile.replace('.json', '').replace(/-/g, ' '),
          url: serviceContent.route || `/${serviceFile.replace('.json', '')}`,
          type: 'link'
        };
        
        // Add to services list
        navigation.services.push(serviceItem);
        
        // Add to "Our Experiences" dropdown if it exists
        const experiencesDropdown = navigation.primary.find(item => item.title === 'Our Experiences');
        if (experiencesDropdown) {
          experiencesDropdown.children.push(serviceItem);
        }
      }
    } catch (error) {
      console.error(`Error processing service ${serviceFile}: ${error.message}`);
    }
  });
  
  // Add event pages
  const events = [
    'american-anniversary-celebration.json',
    'holiday-events.json',
    'fundraisers.json'
  ];
  
  events.forEach(eventFile => {
    try {
      const eventContent = contentAnalysis.getContentData(eventFile);
      if (eventContent) {
        const eventItem = {
          title: eventContent.title || eventFile.replace('.json', '').replace(/-/g, ' '),
          url: eventContent.route || `/${eventFile.replace('.json', '')}`,
          type: 'link'
        };
        
        // Add to events list
        navigation.events.push(eventItem);
        
        // Add to "Events" dropdown if it exists
        const eventsDropdown = navigation.primary.find(item => item.title === 'Events');
        if (eventsDropdown) {
          eventsDropdown.children.push(eventItem);
        }
      }
    } catch (error) {
      console.error(`Error processing event ${eventFile}: ${error.message}`);
    }
  });
  
  // Add legal pages to footer
  const legal = ['privacy-policy.json', 'terms-of-use.json'];
  
  legal.forEach(legalFile => {
    try {
      const legalContent = contentAnalysis.getContentData(legalFile);
      if (legalContent) {
        const legalItem = {
          title: legalContent.title || legalFile.replace('.json', '').replace(/-/g, ' '),
          url: legalContent.route || `/${legalFile.replace('.json', '')}`,
          type: 'link'
        };
        
        // Add to legal list and footer
        navigation.legal.push(legalItem);
        navigation.footer.push(legalItem);
      }
    } catch (error) {
      console.error(`Error processing legal page ${legalFile}: ${error.message}`);
    }
  });
  
  // Add other items to footer
  ['our-story.json', 'our-team.json', 'contact-us.json', 'blog.json'].forEach(footerFile => {
    try {
      const footerContent = contentAnalysis.getContentData(footerFile);
      if (footerContent) {
        navigation.footer.push({
          title: footerContent.title || footerFile.replace('.json', '').replace(/-/g, ' '),
          url: footerContent.route || `/${footerFile.replace('.json', '')}`,
          type: 'link'
        });
      }
    } catch (error) {
      console.error(`Error processing footer item ${footerFile}: ${error.message}`);
    }
  });
  
  // Process blog categories
  filenames.filter(filename => filename.startsWith('blog_c_') && !filename.includes('_b_'))
    .forEach(blogCategoryFile => {
      try {
        const categoryContent = contentAnalysis.getContentData(blogCategoryFile);
        if (categoryContent) {
          const categorySlug = blogCategoryFile.replace('blog_c_', '').replace('.json', '');
          navigation.blog.categories.push({
            title: categoryContent.title || categorySlug.replace(/-/g, ' '),
            url: categoryContent.route || `/blog/category/${categorySlug}`,
            type: 'link'
          });
        }
      } catch (error) {
        console.error(`Error processing blog category ${blogCategoryFile}: ${error.message}`);
      }
    });
  
  // Get recent blog posts
  filenames.filter(filename => filename.startsWith('blog_b_'))
    .slice(0, 5) // Take most recent 5
    .forEach(blogPostFile => {
      try {
        const postContent = contentAnalysis.getContentData(blogPostFile);
        if (postContent) {
          navigation.blog.recent.push({
            title: postContent.title,
            url: postContent.route || `/blog/${blogPostFile.replace('blog_b_', '').replace('.json', '')}`,
            type: 'link'
          });
        }
      } catch (error) {
        console.error(`Error processing blog post ${blogPostFile}: ${error.message}`);
      }
    });
  
  return navigation;
}

/**
 * Generate a new site map for the React implementation
 */
function generateSiteMap() {
  const currentNavigation = mapSiteNavigation();
  
  // Create a sitemap object with improved URL structure
  const siteMap = {
    home: {
      title: 'Home',
      url: '/',
      children: []
    },
    experience: {
      title: 'Our Experiences',
      url: '/experiences',
      children: []
    },
    events: {
      title: 'Events',
      url: '/events',
      children: []
    },
    about: {
      title: 'About',
      url: '/about',
      children: []
    },
    blog: {
      title: 'Blog',
      url: '/blog',
      children: []
    },
    contact: {
      title: 'Contact',
      url: '/contact',
      children: []
    },
    legal: {
      title: 'Legal',
      url: '/legal',
      children: []
    }
  };
  
  // Map services to experiences with cleaner URLs
  currentNavigation.services.forEach(service => {
    const slug = service.url.replace('/', '').replace('.json', '');
    siteMap.experience.children.push({
      title: service.title,
      url: `/experiences/${slug}`,
      component: `ServicePage`,
      contentFile: `${slug}.json`
    });
  });
  
  // Map events with cleaner URLs
  currentNavigation.events.forEach(event => {
    const slug = event.url.replace('/', '').replace('.json', '');
    siteMap.events.children.push({
      title: event.title,
      url: `/events/${slug}`,
      component: `EventPage`,
      contentFile: `${slug}.json`
    });
  });
  
  // Map about section
  siteMap.about.children.push({
    title: 'Our Story',
    url: '/about/our-story',
    component: 'AboutPage',
    contentFile: 'our-story.json'
  });
  
  siteMap.about.children.push({
    title: 'Our Team',
    url: '/about/team',
    component: 'TeamPage',
    contentFile: 'our-team.json'
  });
  
  // Map contact
  siteMap.contact = {
    title: 'Contact Us',
    url: '/contact',
    component: 'ContactPage',
    contentFile: 'contact-us.json',
    children: []
  };
  
  // Map blog structure
  siteMap.blog.children.push({
    title: 'All Posts',
    url: '/blog',
    component: 'BlogIndexPage',
    contentFile: 'blog.json'
  });
  
  // Blog categories
  currentNavigation.blog.categories.forEach(category => {
    const slug = category.url.replace('/blog/category/', '');
    siteMap.blog.children.push({
      title: category.title,
      url: `/blog/category/${slug}`,
      component: 'BlogCategoryPage',
      contentFile: `blog_c_${slug}.json`,
      children: [] // Will be filled with blog posts in this category
    });
  });
  
  // Legal pages
  currentNavigation.legal.forEach(page => {
    const slug = page.url.replace('/', '');
    siteMap.legal.children.push({
      title: page.title,
      url: `/legal/${slug}`,
      component: 'LegalPage',
      contentFile: `${slug}.json`
    });
  });
  
  return siteMap;
}

/**
 * Define the URL routing structure for Next.js implementation
 */
function defineRouteStructure() {
  const siteMap = generateSiteMap();
  
  // Define routes for Next.js App Router
  const routes = [
    {
      path: '/',
      component: 'app/page.tsx',
      contentFile: 'homepage.json'
    }
  ];
  
  // Add experience routes
  siteMap.experience.children.forEach(page => {
    routes.push({
      path: page.url,
      component: `app/experiences/${page.url.split('/').pop()}/page.tsx`,
      contentFile: page.contentFile
    });
  });
  
  // Add events routes
  siteMap.events.children.forEach(page => {
    routes.push({
      path: page.url,
      component: `app/events/${page.url.split('/').pop()}/page.tsx`,
      contentFile: page.contentFile
    });
  });
  
  // Add about routes
  siteMap.about.children.forEach(page => {
    const slug = page.url.split('/').pop();
    routes.push({
      path: page.url,
      component: `app/about/${slug}/page.tsx`,
      contentFile: page.contentFile
    });
  });
  
  // Add contact route
  routes.push({
    path: '/contact',
    component: 'app/contact/page.tsx',
    contentFile: 'contact-us.json'
  });
  
  // Add blog routes
  routes.push({
    path: '/blog',
    component: 'app/blog/page.tsx',
    contentFile: 'blog.json'
  });
  
  // Blog category routes
  siteMap.blog.children.filter(page => page.url.includes('/category/')).forEach(page => {
    const slug = page.url.split('/').pop();
    routes.push({
      path: page.url,
      component: `app/blog/category/${slug}/page.tsx`,
      contentFile: page.contentFile
    });
  });
  
  // Add legal routes
  siteMap.legal.children.forEach(page => {
    const slug = page.url.split('/').pop();
    routes.push({
      path: page.url,
      component: `app/legal/${slug}/page.tsx`,
      contentFile: page.contentFile
    });
  });
  
  return routes;
}

/**
 * Generate a detailed site structure report
 */
function generateSiteStructureReport() {
  const currentNavigation = mapSiteNavigation();
  const siteMap = generateSiteMap();
  const routes = defineRouteStructure();
  
  let report = '# Emerald Owl Productions - Site Structure Analysis\n\n';
  
  // Current Navigation Structure
  report += '## Current Website Navigation\n\n';
  
  // Primary navigation
  report += '### Primary Navigation\n\n';
  currentNavigation.primary.forEach(item => {
    report += `- ${item.title} (${item.url})\n`;
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        report += `  - ${child.title} (${child.url})\n`;
      });
    }
  });
  report += '\n';
  
  // Services
  report += '### Services\n\n';
  currentNavigation.services.forEach(item => {
    report += `- ${item.title} (${item.url})\n`;
  });
  report += '\n';
  
  // Events
  report += '### Events\n\n';
  currentNavigation.events.forEach(item => {
    report += `- ${item.title} (${item.url})\n`;
  });
  report += '\n';
  
  // Blog structure
  report += '### Blog Structure\n\n';
  report += '#### Categories\n\n';
  currentNavigation.blog.categories.forEach(item => {
    report += `- ${item.title} (${item.url})\n`;
  });
  report += '\n';
  
  report += '#### Recent Posts\n\n';
  currentNavigation.blog.recent.forEach(item => {
    report += `- ${item.title} (${item.url})\n`;
  });
  report += '\n';
  
  // Footer
  report += '### Footer Navigation\n\n';
  currentNavigation.footer.forEach(item => {
    report += `- ${item.title} (${item.url})\n`;
  });
  report += '\n';
  
  // New Site Map
  report += '## Proposed Site Map\n\n';
  Object.values(siteMap).forEach(section => {
    report += `### ${section.title} (${section.url})\n\n`;
    section.children.forEach(page => {
      report += `- ${page.title} (${page.url})\n`;
      if (page.children && page.children.length > 0) {
        page.children.forEach(child => {
          report += `  - ${child.title} (${child.url})\n`;
        });
      }
    });
    report += '\n';
  });
  
  // Route Structure
  report += '## Next.js Route Structure\n\n';
  
  report += '| URL Path | Next.js Component | Content File |\n';
  report += '|----------|-------------------|-------------|\n';
  routes.forEach(route => {
    report += `| ${route.path} | ${route.component} | ${route.contentFile} |\n`;
  });
  
  return report;
}

module.exports = {
  mapSiteNavigation,
  generateSiteMap,
  defineRouteStructure,
  generateSiteStructureReport
}; 