import { Metadata } from 'next';

/**
 * Base URL for canonical links
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://emeraldowlproductions.com';

/**
 * Default metadata for the site
 */
export const DEFAULT_METADATA: Metadata = {
  title: 'Emerald Owl Productions',
  description: 'Professional event management, lighting design, video production, and more for all your production needs.',
  applicationName: 'Emerald Owl Productions',
  authors: [{ name: 'Emerald Owl Productions' }],
  generator: 'Next.js',
  keywords: ['event management', 'lighting design', 'video production', 'equipment rental', 'laser light shows'],
  creator: 'Emerald Owl Productions',
  publisher: 'Emerald Owl Productions',
  robots: 'index, follow',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Emerald Owl Productions',
    description: 'Professional event management, lighting design, video production, and more for all your production needs.',
    url: BASE_URL,
    siteName: 'Emerald Owl Productions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Emerald Owl Productions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emerald Owl Productions',
    description: 'Professional event management, lighting design, video production, and more for all your production needs.',
    images: [`${BASE_URL}/images/twitter-image.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  // viewport: 'width=device-width, initial-scale=1',
  // themeColor: '#34D399',
};

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  images?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
  canonicalPath?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function generateSEO({
  title,
  description,
  path,
  type = 'website',
  images = [],
  canonicalPath,
  publishedTime,
  modifiedTime,
  authors = [],
  keywords = [],
}: SEOProps): Metadata {
  const canonicalUrl = `${BASE_URL}${canonicalPath || path}`;
  const defaultImage = {
    url: `${BASE_URL}/images/og-default.jpg`,
    alt: 'Emerald Owl Productions',
    width: 1200,
    height: 630,
  };

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: authors.map(author => ({ name: author })),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Emerald Owl Productions',
      type,
      images: images.length > 0 ? images : [defaultImage],
      locale: 'en_US',
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? images.map(img => img.url) : [defaultImage.url],
      creator: '@EmeraldOwlProd',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

interface StructuredDataProps {
  type: string;
  data: Record<string, any>;
}

export function generateStructuredData({ type, data }: StructuredDataProps): string {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return JSON.stringify({ ...baseData, ...data });
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]): string {
  return generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${BASE_URL}${item.url}`,
      })),
    },
  });
}

export function generateEventStructuredData(event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
  };
  image: string;
  offers?: {
    price: number;
    currency: string;
    availability: string;
  };
}): string {
  return generateStructuredData({
    type: 'Event',
    data: {
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: {
        '@type': 'Place',
        name: event.location.name,
        address: event.location.address,
      },
      image: event.image,
      offers: event.offers ? {
        '@type': 'Offer',
        ...event.offers,
      } : undefined,
      organizer: {
        '@type': 'Organization',
        name: 'Emerald Owl Productions',
        url: BASE_URL,
      },
    },
  });
}

/**
 * Generate a sitemap entry for a URL
 * @param path URL path (without domain)
 * @param lastModified Date of last modification
 * @param changeFrequency How frequently the page changes
 * @param priority Priority of this URL relative to other URLs
 */
export function generateSitemapEntry(
  path: string,
  lastModified?: string,
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  priority?: number
) {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: lastModified || new Date().toISOString().split('T')[0],
    changeFrequency: changeFrequency || 'monthly',
    priority: priority || 0.5,
  };
} 