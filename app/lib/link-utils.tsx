import React from 'react';
import Link from 'next/link';
import { getLegacyToNextRoute, updateInternalLinks } from './route-mapping';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

/**
 * Smart link component that automatically converts internal links to Next.js Link components
 * and external links to regular anchor tags with proper attributes
 */
export function SmartLink({ href, className, title, children, ariaLabel, onClick, target, rel }: LinkProps) {
  // Check if this is an external link
  const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
  
  // For external links, use regular anchor tag with security attributes
  if (isExternal) {
    return (
      <a 
        href={href}
        className={className}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
        target={target || '_blank'} 
        rel={rel || 'noopener noreferrer'}
      >
        {children}
      </a>
    );
  }
  
  // For hash links, use regular anchor for smooth scrolling
  if (href && href.startsWith('#')) {
    return (
      <a 
        href={href}
        className={className}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  // For internal links, convert the legacy route to Next.js route
  const nextRoute = getLegacyToNextRoute(href);
  
  // Use Next.js Link component for internal navigation
  return (
    <Link 
      href={nextRoute}
      className={className}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

/**
 * Converts HTML content with legacy links to React components with Next.js Links
 * This is a simplified version and should be used with caution as it uses dangerouslySetInnerHTML
 */
export function ContentWithLinks({ html, className }: { html: string; className?: string }) {
  if (!html) return null;
  
  // Process the HTML content to update internal links
  const processedHtml = updateInternalLinks(html);
  
  // Return the processed HTML with updated links
  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}

/**
 * More sophisticated content rendering component that adds wrapper classes
 * based on content structure (headings, paragraphs, etc.)
 */
export function RichContent({ 
  html, 
  className,
  headingClass = "text-2xl font-bold my-4",
  paragraphClass = "my-3", 
  listClass = "list-disc ml-5 my-3"
}: { 
  html: string; 
  className?: string;
  headingClass?: string;
  paragraphClass?: string;
  listClass?: string;
}) {
  if (!html) return null;
  
  // Process the HTML content to update internal links
  let processedHtml = updateInternalLinks(html);
  
  // Add CSS classes to common HTML elements for better styling
  // Note: This is a simple regex approach, for production a proper HTML parser would be better
  processedHtml = processedHtml
    // Add classes to headings
    .replace(/<h([1-6])>/g, `<h$1 class="${headingClass}">`)
    // Add classes to paragraphs
    .replace(/<p>/g, `<p class="${paragraphClass}">`)
    // Add classes to lists
    .replace(/<ul>/g, `<ul class="${listClass}">`);
  
  // Return the processed HTML with updated links and added classes
  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}

/**
 * Checks if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  return !!(url && (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')));
}

/**
 * Checks if a URL is a hash link (anchor link)
 */
export function isHashLink(url: string): boolean {
  return !!(url && url.startsWith('#'));
}

/**
 * Formats a URL appropriately for the target attribute
 */
export function formatLinkTarget(url: string): string | undefined {
  return isExternalUrl(url) ? '_blank' : undefined;
}

/**
 * Formats a URL appropriately for the rel attribute
 */
export function formatLinkRel(url: string): string | undefined {
  return isExternalUrl(url) ? 'noopener noreferrer' : undefined;
} 