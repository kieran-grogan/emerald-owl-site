'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Laser Light Shows',
    description: 'Captivate your audience with stunning laser displays choreographed to music, creating immersive visual experiences.',
    image: '/images/content/laser-shows/678fb2d6141a590c80b64c99.jpeg',
    href: '/services/laser-light-shows',
  },
  {
    title: 'Foam Parties',
    description: 'Turn any event into an unforgettable experience with our premium foam party equipment and effects.',
    image: '/images/content/foam-party/67111c429663ed06310b88bf.jpeg',
    href: '/services/foam-parties',
  },
  {
    title: 'Neon Nights',
    description: 'Create a vibrant glow-in-the-dark atmosphere perfect for parties, nightclubs, and special events.',
    image: '/images/content/neon-nights/67104d556dbca5b137091876.jpeg',
    href: '/services/neon-nights',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Services() {
  return (
    <section className="relative py-24 bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg leading-8 text-gray-300"
          >
            Discover our range of interactive entertainment services for your next event.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:gap-x-8 sm:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="relative group"
            >
              <Link href={service.href} className="block">
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                </div>
                <div className="relative mt-6">
                  <h3 className="text-xl font-semibold leading-8 text-white group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-300">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span className="text-sm font-semibold">Learn more</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            View All Services
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