import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Site Map | Emerald Owl Productions',
  description: 'Navigate through all pages and sections of the Emerald Owl Productions website',
};

const siteStructure = [
  {
    category: 'Main Pages',
    links: [
      { title: 'Home', href: '/' },
      { title: 'About Us', href: '/about' },
      { title: 'Contact Us', href: '/contact-us' },
      { title: 'Gallery', href: '/gallery' },
    ],
  },
  {
    category: 'Services',
    links: [
      { title: 'All Services', href: '/services' },
      { title: 'Laser Light Shows', href: '/services/laser-light-shows' },
      { title: 'Concert Production', href: '/services/concert-production' },
      { title: 'Corporate Events', href: '/services/corporate-events' },
      { title: 'Wedding Production', href: '/services/wedding-production' },
      { title: 'Neon Nights', href: '/neon-nights' },
    ],
  },
  {
    category: 'Events',
    links: [
      { title: 'All Events', href: '/events' },
      { title: 'Holiday Events', href: '/events/holiday-events' },
      { title: 'America\'s 250th', href: '/events/americas-250th' },
      { title: 'Concert Series', href: '/events/concert-series' },
    ],
  },
  {
    category: 'Blog',
    links: [
      { title: 'Blog Home', href: '/blog' },
      { title: 'Categories', href: '/blog/categories' },
      { title: 'Archives', href: '/blog/archives' },
    ],
  },
  {
    category: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/legal/privacy-policy' },
      { title: 'Terms of Service', href: '/legal/terms-of-service' },
      { title: 'Accessibility Statement', href: '/legal/accessibility' },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Site Map</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Use this site map to navigate through all sections and pages of the Emerald Owl Productions website.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteStructure.map((section) => (
          <div key={section.category} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
              {section.category}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Link 
                    href={link.href}
                    className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Can't find what you're looking for?</h2>
        <Link 
          href="/contact-us" 
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
} 