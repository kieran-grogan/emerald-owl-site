'use client';

import { ReactNode, useEffect } from 'react';
import { lazyLoad, initializePreloading } from '../../lib/lazy-loading.tsx';
import Header from './Header';
import Footer from './Footer';

// Lazy load non-critical components
const Breadcrumb = lazyLoad(() => import('./Breadcrumb'), {
  ssr: false // Breadcrumb can be loaded client-side
});

const ScrollToTop = lazyLoad(() => import('../animations/ScrollToTop'), {
  ssr: false
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Initialize preloading of critical components
    initializePreloading();
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
} 