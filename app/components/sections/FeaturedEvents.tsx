'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const events = [
  {
    title: "America's 250th Anniversary",
    description: "Join us in celebrating America's 250th anniversary with spectacular laser light shows and patriotic displays.",
    image: "/images/content/america-250th/67a4d1ca9769a795ba5981de.jpeg",
    href: "/events/americas-250th"
  },
  {
    title: "Holiday Events",
    description: "Make your holiday celebration unforgettable with our custom light shows and interactive experiences.",
    image: "/images/content/general/671d07f4b62b3675efd3d708.jpeg",
    href: "/events/holiday-events"
  }
];

export function FeaturedEvents() {
  return (
    <section className="relative py-24 bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-emerald-900/20" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Featured Events
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Check out our special events and production showcases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="md:flex">
                <div className="md:w-2/5 relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-transparent" />
                </div>
                <div className="relative md:w-3/5 p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {event.description}
                  </p>
                  <Link
                    href={event.href}
                    className="inline-flex items-center text-emerald-400 group-hover:text-emerald-300 transition-colors"
                  >
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
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 