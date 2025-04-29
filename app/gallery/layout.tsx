import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Gallery | Emerald Owl Productions',
  description: 'Explore our portfolio of events and entertainment services - from laser light shows to foam parties and more',
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 