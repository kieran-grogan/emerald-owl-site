'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-800 to-emerald-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-radial from-emerald-500/20 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Unforgettable Event{' '}
            <span className="block text-emerald-300">Experiences</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-gray-100 max-w-3xl"
          >
            Bringing interactive entertainment to events nationwide with laser light shows, foam parties, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          >
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 transform hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="rounded-full px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 hover:ring-white/40 hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative blur effects */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-emerald-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
} 