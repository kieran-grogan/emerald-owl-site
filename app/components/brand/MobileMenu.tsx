'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
  items?: NavigationItem[];
}

interface Navigation {
  main: NavigationItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Navigation;
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm transform bg-gray-900 shadow-xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Close button */}
          <div className="flex items-center justify-end px-4 py-4">
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 pb-4">
            <div className="space-y-2">
              {navigation.main.map((item) => (
                <div key={item.name} className="py-2">
                  {item.items ? (
                    <>
                      <button
                        onClick={() => setExpandedSection(expandedSection === item.name ? null : item.name)}
                        className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-emerald-600/10 hover:text-emerald-400 transition-colors"
                      >
                        {item.name}
                        <svg
                          className={`h-5 w-5 transition-transform ${
                            expandedSection === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedSection === item.name && (
                        <div className="mt-2 space-y-1 pl-4">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block rounded-lg px-4 py-2 text-base font-medium text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400 transition-colors"
                              onClick={onClose}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-emerald-600/10 hover:text-emerald-400 transition-colors"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
                onClick={onClose}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
} 