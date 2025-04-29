import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Events | Emerald Owl Productions',
  description: 'Discover our upcoming events and special productions, including America\'s 250th celebration, holiday events, and fundraisers.',
};

const events = [
  {
    name: "America's 250th Anniversary",
    description: "Join us in celebrating America's 250th anniversary with spectacular laser light shows and patriotic displays.",
    image: "/images/content/america-250th/67a4d1ca9769a795ba5981de.jpeg",
    href: "/events/americas-250th",
    date: "July 4, 2026",
    location: "Multiple Locations"
  },
  {
    name: "Holiday Events",
    description: "Make your holiday celebration unforgettable with our custom light shows and interactive experiences.",
    image: "/images/content/general/671d07f4b62b3675efd3d708.jpeg",
    href: "/events/holiday-events",
    date: "November - December 2024",
    location: "Various Venues"
  },
  {
    name: "Fundraisers",
    description: "Support great causes while enjoying amazing entertainment at our fundraising events.",
    image: "/images/content/fundraisers/fundraiser-hero.jpg",
    href: "/events/fundraisers",
    date: "Year-round",
    location: "Multiple Venues"
  }
];

export default function EventsPage() {
  return (
    <main className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Featured Events
          </h1>
          <p className="text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Experience our signature productions and special events that combine cutting-edge technology with unforgettable entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.href}
              href={event.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              </div>
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {event.name}
                  </h3>
                </div>
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-emerald-400">{event.date}</p>
                  <p className="text-sm text-gray-400">{event.location}</p>
                </div>
                <p className="text-gray-300 mb-4">
                  {event.description}
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
            Book an Event
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