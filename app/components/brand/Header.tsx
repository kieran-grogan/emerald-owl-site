'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
  items?: NavigationItem[];
}

const navigation = {
  main: [
    { 
      name: 'Our Experiences',
      href: '#',
      items: [
        { name: 'Laser Light Show', href: '/experiences/laser-light-show' },
        { name: 'Neon Nights', href: '/experiences/neon-nights' },
        { name: 'Foam Parties', href: '/experiences/foam-parties' },
        { name: 'Water Games', href: '/experiences/water-games' },
        { name: 'Dripping in Confidence', href: '/experiences/dripping-in-confidence' },
        { name: 'Gunge', href: '/experiences/gunge' },
        { name: 'Sensory Friendly Experiences', href: '/experiences/sensory-friendly' },
      ]
    },
    { name: 'Do It Now', href: '/do-it-now' },
    { 
      name: 'Special Occasions',
      href: '#',
      items: [
        { name: 'Upcoming Events', href: '/events' },
        { name: 'Holiday Events', href: '/events/holiday-events' },
        { name: "America's 250th Anniversary", href: '/events/americas-250th' },
        { name: 'Fundraisers', href: '/events/fundraisers' },
        { name: 'Emmy The Owl', href: '/emmy-the-owl' },
      ]
    },
    { name: 'Contact Us', href: '/contact' },
    { 
      name: 'More',
      href: '#',
      items: [
        { name: 'Our Story', href: '/our-story' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
      ]
    },
  ]
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isActiveParent = (href: string) => pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gray-900/95 backdrop-blur-sm shadow-lg">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo className="-m-1.5 p-1.5" />
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.main.map((item) => {
            const hasDropdown = !!item.items;
            
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center text-base font-medium transition-colors ${
                    isActive(item.href) || isActiveParent(item.href)
                      ? 'text-emerald-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={(e) => {
                    if (hasDropdown) {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                    }
                  }}
                >
                  {item.name}
                  {hasDropdown && (
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown menu */}
                {hasDropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-64 origin-top-left rounded-lg bg-gray-900 p-2 shadow-lg ring-1 ring-gray-800 focus:outline-none">
                    {item.items?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className={`block rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                          isActive(dropdownItem.href)
                            ? 'bg-emerald-600/10 text-emerald-400'
                            : 'text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400'
                        }`}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="rounded-full bg-emerald-600 px-6 py-2.5 text-base font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navigation={navigation}
      />
    </header>
  );
} 