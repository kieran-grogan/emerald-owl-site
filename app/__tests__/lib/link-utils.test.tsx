import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  SmartLink,
  ContentWithLinks,
  RichContent,
  isExternalUrl,
  isHashLink,
  formatLinkTarget,
  formatLinkRel
} from '@/app/lib/link-utils';
import { getLegacyToNextRoute, updateInternalLinks } from '@/app/lib/route-mapping';

// Mock the route-mapping functions
jest.mock('@/app/lib/route-mapping', () => ({
  getLegacyToNextRoute: jest.fn((route) => {
    // Mock implementation that returns a transformed route
    if (route === '/services') return '/services';
    if (route === '/blog') return '/blog';
    return route;
  }),
  updateInternalLinks: jest.fn((html) => {
    // Simple mock implementation that returns the HTML with sample replacements
    if (html && html.includes('href="/services"')) {
      return html.replace('href="/services"', 'href="/services"');
    }
    return html;
  })
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: any }) => {
    return (
      <a href={href} {...rest} data-testid="next-link">
        {children}
      </a>
    );
  };
});

describe('link-utils', () => {
  // Reset mocks between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SmartLink', () => {
    test('renders external links as regular anchor tags', () => {
      render(
        <SmartLink href="https://example.com">
          External Link
        </SmartLink>
      );

      const link = screen.getByText('External Link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('renders mailto links as regular anchor tags', () => {
      render(
        <SmartLink href="mailto:info@example.com">
          Email Link
        </SmartLink>
      );

      const link = screen.getByText('Email Link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'mailto:info@example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('renders tel links as regular anchor tags', () => {
      render(
        <SmartLink href="tel:+1234567890">
          Phone Link
        </SmartLink>
      );

      const link = screen.getByText('Phone Link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'tel:+1234567890');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('renders hash links as regular anchor tags', () => {
      render(
        <SmartLink href="#section">
          Hash Link
        </SmartLink>
      );

      const link = screen.getByText('Hash Link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#section');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    test('renders internal links as Next.js Link components', () => {
      render(
        <SmartLink href="/services">
          Internal Link
        </SmartLink>
      );

      const link = screen.getByText('Internal Link');
      expect(link).toHaveAttribute('data-testid', 'next-link');
      expect(link).toHaveAttribute('href', '/services');
      expect(getLegacyToNextRoute).toHaveBeenCalledWith('/services');
    });

    test('passes className to link', () => {
      render(
        <SmartLink href="/services" className="test-class">
          Styled Link
        </SmartLink>
      );

      const link = screen.getByText('Styled Link');
      expect(link).toHaveAttribute('class', 'test-class');
    });

    test('uses custom target and rel for external links when provided', () => {
      render(
        <SmartLink href="https://example.com" target="_self" rel="nofollow">
          Custom External Link
        </SmartLink>
      );

      const link = screen.getByText('Custom External Link');
      expect(link).toHaveAttribute('target', '_self');
      expect(link).toHaveAttribute('rel', 'nofollow');
    });
  });

  describe('ContentWithLinks', () => {
    test('returns null for empty HTML', () => {
      const { container } = render(<ContentWithLinks html="" />);
      expect(container.firstChild).toBeNull();
    });

    test('renders HTML content with updated links', () => {
      const html = '<p>Check out our <a href="/services">services</a>!</p>';
      render(<ContentWithLinks html={html} />);

      expect(updateInternalLinks).toHaveBeenCalledWith(html);
      expect(screen.getByText(/Check out our/)).toBeInTheDocument();
    });

    test('applies className to wrapper div', () => {
      const html = '<p>Content</p>';
      const { container } = render(<ContentWithLinks html={html} className="wrapper-class" />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('class', 'wrapper-class');
    });
  });

  describe('RichContent', () => {
    test('returns null for empty HTML', () => {
      const { container } = render(<RichContent html="" />);
      expect(container.firstChild).toBeNull();
    });

    test('processes HTML content and adds classes to elements', () => {
      const html = '<h1>Title</h1><p>Paragraph</p><ul><li>Item</li></ul>';
      const { container } = render(
        <RichContent 
          html={html} 
          className="content-class"
          headingClass="heading-class"
          paragraphClass="paragraph-class"
          listClass="list-class"
        />
      );

      expect(updateInternalLinks).toHaveBeenCalledWith(html);
      
      // The HTML is processed and inserted via dangerouslySetInnerHTML, so we need to check the string
      const divContent = container.innerHTML;
      expect(divContent).toContain('<h1 class="heading-class">');
      expect(divContent).toContain('<p class="paragraph-class">');
      expect(divContent).toContain('<ul class="list-class">');
    });
  });

  describe('helper functions', () => {
    test('isExternalUrl correctly identifies external URLs', () => {
      expect(isExternalUrl('https://example.com')).toBe(true);
      expect(isExternalUrl('http://example.com')).toBe(true);
      expect(isExternalUrl('mailto:info@example.com')).toBe(true);
      expect(isExternalUrl('tel:+1234567890')).toBe(true);
      expect(isExternalUrl('/internal-path')).toBe(false);
      expect(isExternalUrl('#section')).toBe(false);
      expect(isExternalUrl('')).toBe(false);
    });

    test('isHashLink correctly identifies hash links', () => {
      expect(isHashLink('#section')).toBe(true);
      expect(isHashLink('#top')).toBe(true);
      expect(isHashLink('/path#section')).toBe(false);
      expect(isHashLink('https://example.com')).toBe(false);
      expect(isHashLink('/internal-path')).toBe(false);
      expect(isHashLink('')).toBe(false);
    });

    test('formatLinkTarget returns correct target based on URL', () => {
      expect(formatLinkTarget('https://example.com')).toBe('_blank');
      expect(formatLinkTarget('mailto:info@example.com')).toBe('_blank');
      expect(formatLinkTarget('/internal-path')).toBeUndefined();
      expect(formatLinkTarget('#section')).toBeUndefined();
    });

    test('formatLinkRel returns correct rel attribute based on URL', () => {
      expect(formatLinkRel('https://example.com')).toBe('noopener noreferrer');
      expect(formatLinkRel('mailto:info@example.com')).toBe('noopener noreferrer');
      expect(formatLinkRel('/internal-path')).toBeUndefined();
      expect(formatLinkRel('#section')).toBeUndefined();
    });
  });
}); 