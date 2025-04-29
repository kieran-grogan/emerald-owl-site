'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Emerald Owl Productions delivered an amazing laser show for our corporate event. The team was professional and the display exceeded our expectations!",
    author: "Sarah J.",
    role: "Corporate Event Manager",
    rating: 5
  },
  {
    quote: "The foam party was the highlight of our college event! Students are still talking about it months later. Will definitely book again!",
    author: "Michael T.",
    role: "Student Activities Director",
    rating: 5
  },
  {
    quote: "The Neon Nights experience transformed our venue completely. The attention to detail and custom design for our brand was impressive.",
    author: "Lisa R.",
    role: "Event Coordinator",
    rating: 5
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-emerald-500">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-current' : 'fill-gray-300'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
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
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Read testimonials from our satisfied customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8"
            >
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="relative">
                <p className="text-lg text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <div className="flex items-center">
                    <div>
                      <div className="text-white font-semibold">
                        {testimonial.author}
                      </div>
                      <div className="text-emerald-400 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 