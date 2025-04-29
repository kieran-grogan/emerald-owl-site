'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Mapping of path segments to display names
const pathDisplayNames: Record<string, string> = {
  'services': 'Services',
  'events': 'Events',
  'blog': 'Blog',
  'legal': 'Legal',
  'gallery': 'Gallery',
  'about': 'About',
  'contact-us': 'Contact Us',
  'sitemap': 'Sitemap',
  'americas-250th': "America's 250th",
  'holiday-events': 'Holiday Events',
  'fundraisers': 'Fundraisers',
  'laser-light-shows': 'Laser Light Shows',
  'neon-nights': 'Neon Nights',
  'foam-parties': 'Foam Parties',
  'water-games': 'Water Games',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'categories': 'Categories',
  'archives': 'Archives',
};

export default function Breadcrumb() {
  const pathname = usePathname() || '';
  
  // Skip rendering on homepage
  if (pathname === '/') {
    return null;
  }
  
  // Generate breadcrumb segments
  const breadcrumbs = useMemo(() => {
    // Split the pathname into segments and remove empty segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Generate breadcrumb items with paths
    return segments.map((segment, index) => {
      // Build the path for this breadcrumb
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Get display name from mapping or use capitalized segment
      const displayName = pathDisplayNames[segment] || 
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      return { path, displayName };
    });
  }, [pathname]);

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 mt-16">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <Link 
            href="/" 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Home
          </Link>
        </li>
        
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            <svg 
              className="h-4 w-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
            
            {index === breadcrumbs.length - 1 ? (
              // Last item is current page
              <span className="ml-2 font-medium text-emerald-600 dark:text-emerald-400">
                {breadcrumb.displayName}
              </span>
            ) : (
              // Clickable breadcrumb
              <Link 
                href={breadcrumb.path}
                className="ml-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {breadcrumb.displayName}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 