'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false in this client component
const GalleryContent = dynamic(() => import('./GalleryContent'), { 
  ssr: false 
});

export default function ClientGallery() {
  return <GalleryContent />;
} 