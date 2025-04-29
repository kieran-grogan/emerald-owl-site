import Image from 'next/image';
import Link from 'next/link';

const galleryItems = [
  {
    src: "/images/content/laser-shows/678fb2d6141a590c80b64c99.jpeg",
    alt: "Laser light show performance",
    category: "Laser Shows"
  },
  {
    src: "/images/content/foam-party/67111c429663ed06310b88bf.jpeg",
    alt: "Foam party event",
    category: "Foam Parties"
  },
  {
    src: "/images/content/neon-nights/67104d556dbca5b137091876.jpeg",
    alt: "Neon nights experience",
    category: "Neon Nights"
  },
  {
    src: "/images/content/america-250th/67a4d1ca9769a795ba5981de.jpeg",
    alt: "America's 250th celebration",
    category: "Special Events"
  },
  {
    src: "/images/content/general/671d07f4b62b3675efd3d708.jpeg",
    alt: "Holiday light show",
    category: "Holiday Events"
  },
  {
    src: "/images/content/water-games/water-games-hero.jpg",
    alt: "Water games installation",
    category: "Water Games"
  }
];

export default function GalleryPage() {
  return (
    <main className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Our Gallery
          </h1>
          <p className="text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of events and productions, showcasing the magic we create through light, sound, and interactive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="space-y-1">
                  <p className="text-sm text-emerald-400">{item.category}</p>
                  <p className="text-lg font-medium text-white">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            Book Your Event
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