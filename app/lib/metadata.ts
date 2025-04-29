import { Metadata } from 'next';

interface GenerateMetadataOptions {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  type?: string;
  images?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

export function generateMetadata({
  title,
  description,
  keywords,
  path,
  type = 'website',
  images = []
}: GenerateMetadataOptions): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://emeraldowlproductions.com';
  const canonicalUrl = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Emerald Owl Productions',
      type,
      images: images.length > 0 ? images : [
        {
          url: `${baseUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: 'Emerald Owl Productions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? images.map(img => img.url) : [`${baseUrl}/images/og-default.jpg`],
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
}

export function generateTeamMemberMetadata(member: {
  name: string;
  title: string;
  bio: string;
  image: { url: string; alt: string; };
}): Metadata {
  return generateMetadata({
    title: `${member.name} - ${member.title} | Emerald Owl Productions Team`,
    description: member.bio,
    keywords: `${member.name}, ${member.title}, Emerald Owl Productions team, event production team`,
    path: `/our-team#${member.name.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'profile',
    images: [
      {
        url: member.image.url,
        alt: member.image.alt,
        width: 800,
        height: 800,
      },
    ],
  });
} 