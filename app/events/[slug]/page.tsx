import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface EventPageProps {
  params: {
    slug: string;
  };
}

// This would typically come from a CMS or database
const events = {
  'corporate-events': {
    title: 'Corporate Events',
    description: 'Elevate your corporate gatherings with our professional event production services.',
    image: '/images/content/corporate/678fb2d6141a590c80b64c99.jpeg',
    features: [
      'Professional sound systems',
      'Stage and lighting design',
      'Custom branding integration',
      'Technical support',
      'Event coordination',
      'Multi-room audio/visual'
    ],
    highlights: [
      'Awards ceremonies',
      'Product launches',
      'Team building events',
      'Holiday parties',
      'Conferences',
      'Galas'
    ],
    services: [
      'Laser light shows',
      'LED walls',
      'Sound systems',
      'Stage design',
      'Video production',
      'Live streaming'
    ]
  },
  'weddings': {
    title: 'Weddings',
    description: 'Create magical moments with our comprehensive wedding production services.',
    image: '/images/content/weddings/67111c429663ed06310b88bf.jpeg',
    features: [
      'Custom lighting design',
      'Professional DJ services',
      'Dance floor lighting',
      'Ceremony audio',
      'Reception entertainment',
      'Photo/video support'
    ],
    highlights: [
      'First dance spotlight',
      'Custom monogram projection',
      'Uplighting packages',
      'Dance floor effects',
      'Photo booth integration',
      'Evening entertainment'
    ],
    services: [
      'Sound systems',
      'Lighting design',
      'DJ services',
      'Photo booths',
      'Video projection',
      'Special effects'
    ]
  },
  'private-parties': {
    title: 'Private Parties',
    description: 'Transform your private celebration into an unforgettable experience.',
    image: '/images/content/private-parties/67104d556dbca5b137091876.jpeg',
    features: [
      'Custom event design',
      'Professional sound',
      'Party lighting',
      'Entertainment options',
      'Theme integration',
      'Technical support'
    ],
    highlights: [
      'Birthday celebrations',
      'Anniversary parties',
      'Graduation events',
      'Sweet 16 parties',
      'Retirement celebrations',
      'Family reunions'
    ],
    services: [
      'DJ services',
      'Lighting effects',
      'Foam parties',
      'Neon parties',
      'Photo booths',
      'Special effects'
    ]
  }
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = events[params.slug as keyof typeof events];
  
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.'
    };
  }

  return {
    title: `${event.title} | Emerald Owl Productions`,
    description: event.description
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = events[params.slug as keyof typeof events];

  if (!event) {
    return (
      <main className="bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Event Not Found
          </h1>
          <p className="text-lg leading-8 text-gray-300 mb-8">
            The requested event could not be found.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200"
          >
            View All Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {event.title}
            </h1>
            <p className="text-xl text-gray-100">
              {event.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features & Highlights */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Features */}
            <div className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <ul className="space-y-4">
                {event.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-emerald-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Event Types</h2>
              <ul className="space-y-4">
                {event.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-emerald-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-3 text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-12 text-center">
            Available Services
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {event.services.map((service) => (
              <div
                key={service}
                className="relative group rounded-2xl bg-gray-900/50 backdrop-blur-sm p-6 hover:bg-gray-900/70 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{service}</h3>
                <div className="absolute bottom-6 right-6 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-800 to-emerald-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
            Ready to Plan Your Event?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
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
      </section>
    </main>
  );
} 