import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Services | Emerald Owl Productions',
  description: 'Explore our range of event production services including laser light shows, foam parties, neon nights, and more.',
};

const services = [
  {
    name: 'Laser Light Shows',
    description: 'Captivate your audience with stunning laser displays choreographed to music, creating immersive visual experiences.',
    image: '/images/content/laser-shows/678fb2d6141a590c80b64c99.jpeg',
    href: '/services/laser-light-shows',
  },
  {
    name: 'Foam Parties',
    description: 'Turn any event into an unforgettable experience with our premium foam party equipment and effects.',
    image: '/images/content/foam-party/67111c429663ed06310b88bf.jpeg',
    href: '/services/foam-parties',
  },
  {
    name: 'Neon Nights',
    description: 'Create a vibrant glow-in-the-dark atmosphere perfect for parties, nightclubs, and special events.',
    image: '/images/content/neon-nights/67104d556dbca5b137091876.jpeg',
    href: '/services/neon-nights',
  },
  {
    name: 'Water Games',
    description: 'Cool off with our exciting water game installations, perfect for summer events and outdoor festivals.',
    image: '/images/content/water-games/water-games-hero.jpg',
    href: '/services/water-games',
  },
  {
    name: 'Video Production',
    description: 'Professional video production services for events, marketing, and social media content.',
    image: '/images/content/video-production/video-production-hero.jpg',
    href: '/services/video-production',
  },
  {
    name: 'Sound Production',
    description: 'High-quality sound systems and audio engineering for concerts, events, and productions.',
    image: '/images/content/sound/sound-production-hero.jpg',
    href: '/services/sound-production',
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Our Services
          </h1>
          <p className="text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            From laser light shows to immersive experiences, we bring your events to life with cutting-edge technology and creative production.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-emerald-400 group-hover:text-emerald-300">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            Get Started
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
} 