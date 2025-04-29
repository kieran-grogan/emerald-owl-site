import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// This would typically come from a CMS or database
const services = {
  'laser-light-shows': {
    title: 'Laser Light Shows',
    description: 'Transform your venue with stunning laser displays choreographed to music.',
    image: '/images/content/laser-shows/678fb2d6141a590c80b64c99.jpeg',
    features: [
      'Custom choreographed displays',
      'High-powered laser systems',
      'Professional programming',
      'Multiple color options',
      'Indoor and outdoor capabilities',
      'Music synchronization'
    ],
    benefits: [
      'Create immersive experiences',
      'Enhance brand visibility',
      'Increase audience engagement',
      'Memorable entertainment',
      'Versatile applications',
      'Professional production'
    ]
  },
  'foam-parties': {
    title: 'Foam Parties',
    description: 'Create an unforgettable party atmosphere with our premium foam equipment.',
    image: '/images/content/foam-party/67111c429663ed06310b88bf.jpeg',
    features: [
      'High-quality foam machines',
      'Safe, non-toxic foam solution',
      'Multiple foam cannons',
      'Coverage control',
      'Professional operators',
      'Quick setup and cleanup'
    ],
    benefits: [
      'Unique entertainment',
      'Safe for all ages',
      'Interactive fun',
      'Perfect for outdoor events',
      'Creates lasting memories',
      'Professional management'
    ]
  },
  'neon-nights': {
    title: 'Neon Nights',
    description: 'Transform your venue into a vibrant glow-in-the-dark paradise.',
    image: '/images/content/neon-nights/67104d556dbca5b137091876.jpeg',
    features: [
      'UV lighting systems',
      'Neon decorations',
      'Glow accessories',
      'Custom designs',
      'Professional installation',
      'Full venue transformation'
    ],
    benefits: [
      'Unique atmosphere',
      'Perfect for themed events',
      'Instagram-worthy moments',
      'Engaging environment',
      'Versatile theming',
      'Professional setup'
    ]
  }
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services[params.slug as keyof typeof services];
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    };
  }

  return {
    title: `${service.title} | Emerald Owl Productions`,
    description: service.description
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services[params.slug as keyof typeof services];

  if (!service) {
    return (
      <main className="bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Service Not Found
          </h1>
          <p className="text-lg leading-8 text-gray-300 mb-8">
            The requested service could not be found.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200"
          >
            View All Services
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
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-100">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Features */}
            <div className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
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

            {/* Benefits */}
            <div className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
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
                    <span className="ml-3 text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-800 to-emerald-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
            Ready to Transform Your Event?
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