'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '';

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      children: [
        { name: 'Laser Light Shows', href: '/services/laser-light-shows' },
        { name: 'Water Games', href: '/services/water-games' },
        { name: 'Foam Parties', href: '/services/foam-parties' },
        { name: 'Neon Nights', href: '/services/neon-nights' },
      ]
    },
    { 
      name: 'Events', 
      href: '/events',
      children: [
        { name: "America's 250th", href: '/events/americas-250th' },
        { name: 'Holiday Events', href: '/events/holiday-events' },
        { name: 'Fundraisers', href: '/events/fundraisers' },
      ]
    },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact-us' },
  ];

  // Check if a nav item is active (exact match or parent of current route)
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-emerald-600"
      >
        Skip to main content
      </a>
    <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' 
          : 'bg-gray-900/80 dark:bg-gray-900/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center" aria-label="Emerald Owl - Home">
                <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold">EO</span>
              </div>
              <span className={`font-bold text-lg ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}>Emerald Owl</span>
            </Link>
          </div>

          {/* Desktop Navigation with Search */}
          <div className="hidden md:ml-6 md:flex md:items-center">
              <nav 
                className="flex items-center space-x-4 mr-4"
                role="navigation"
                aria-label="Main navigation"
              >
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                    {item.children ? (
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-emerald-400 dark:text-emerald-400' 
                            : scrolled 
                              ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400' 
                              : 'text-white hover:text-emerald-400 hover:bg-emerald-800/40'
                        }`}
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                        aria-controls={`dropdown-${item.name.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        {item.name}
                        <span className="ml-1" aria-hidden="true">▼</span>
                      </button>
                    ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                            ? 'text-emerald-400 dark:text-emerald-400' 
                        : scrolled 
                              ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400' 
                              : 'text-white hover:text-emerald-400 hover:bg-emerald-800/40'
                    }`}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                      </Link>
                    )}

                  {/* Dropdown menu for items with children */}
                  {item.children && (
                      <div 
                        id={`dropdown-${item.name.toLowerCase()}`}
                        className="absolute left-0 mt-2 w-48 bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`dropdown-button-${item.name.toLowerCase()}`}
                      >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-4 py-2 text-sm ${
                            pathname === child.href
                                ? 'text-emerald-400 dark:text-emerald-400 bg-gray-800/50 dark:bg-gray-700/50'
                                : 'text-gray-100 dark:text-gray-200 hover:bg-gray-800/50 dark:hover:bg-gray-700/50 hover:text-emerald-400'
                          }`}
                            role="menuitem"
                            aria-current={pathname === child.href ? 'page' : undefined}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search button */}
            <Link
              href="/search"
              className={`p-2 rounded-full transition-colors ${
                scrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/10 dark:hover:bg-gray-800/50 hover:text-emerald-500' 
                    : 'text-white hover:text-emerald-400 hover:bg-emerald-800/40'
              }`}
              aria-label="Search"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                  aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button and search */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Mobile search button */}
            <Link
              href="/search"
              className={`p-2 rounded-md ${
                scrolled 
                    ? 'text-gray-700 dark:text-gray-200 hover:text-emerald-500' 
                    : 'text-white hover:text-emerald-400 hover:bg-emerald-800/40'
              }`}
              aria-label="Search"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                  aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </Link>
          
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled 
                  ? 'text-gray-700 dark:text-gray-200' 
                  : 'text-white'
                } hover:bg-emerald-800/40 hover:text-emerald-400 focus:outline-none`}
              onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
        <div 
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                      ? 'text-emerald-400 dark:text-emerald-400 bg-gray-800/50 dark:bg-gray-800/50'
                      : 'text-white dark:text-gray-200 hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:text-emerald-400'
                }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
              
              {/* For items with children, show nested list */}
              {item.children && (
                  <div 
                    className="pl-4 space-y-1 pt-1"
                    role="menu"
                    aria-label={`${item.name} submenu`}
                  >
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === child.href
                            ? 'text-emerald-400 dark:text-emerald-400 bg-gray-800/50 dark:bg-gray-800/50'
                            : 'text-gray-300 dark:text-gray-300 hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:text-emerald-400'
                      }`}
                        role="menuitem"
                        aria-current={pathname === child.href ? 'page' : undefined}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
    </>
  );
} 