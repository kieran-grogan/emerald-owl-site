'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  {
    src: "/images/content/laser-shows/678fb2d6141a590c80b64c99.jpeg",
    alt: "Laser light show performance"
  },
  {
    src: "/images/content/foam-party/67111c429663ed06310b88bf.jpeg",
    alt: "Foam party event"
  },
  {
    src: "/images/content/neon-nights/67104d556dbca5b137091876.jpeg",
    alt: "Neon nights experience"
  },
  {
    src: "/images/content/america-250th/67a4d1ca9769a795ba5981de.jpeg",
    alt: "Holiday light show"
  }
];

export function Gallery() {
  return (
    <section className="relative py-24 bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-gray-900" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Work
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Browse our gallery of past events and productions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            View Gallery
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
        </motion.div>
      </div>
    </section>
  );
} 