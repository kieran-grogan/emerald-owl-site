'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FadeIn } from "../components/animations/PageTransition";

// Mock data for gallery images
const galleryImages = [
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/678fb2d6141a590c80b64c99.jpeg",
    alt: "Laser light show with vibrant beams",
    category: "laser-shows"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67111c429663ed06310b88bf.jpeg",
    alt: "Foam party with excited crowd",
    category: "foam-parties"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67104d556dbca5b137091876.jpeg",
    alt: "Neon nights event with glowing decorations",
    category: "neon-nights"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/671d07f4b62b3675efd3d708.jpeg",
    alt: "Holiday light show spectacular",
    category: "holiday-events"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67a4d1ca9769a795ba5981de.jpeg",
    alt: "Patriotic laser display",
    category: "laser-shows"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/678fb2d6141a590c80b64c99.jpeg",
    alt: "Corporate event laser show",
    category: "laser-shows"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67111c429663ed06310b88bf.jpeg",
    alt: "Summer foam party event",
    category: "foam-parties"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67104d556dbca5b137091876.jpeg",
    alt: "Neon party with UV effects",
    category: "neon-nights"
  },
  {
    src: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/671d07f4b62b3675efd3d708.jpeg",
    alt: "Winter wonderland light display",
    category: "holiday-events"
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All' },
  { id: 'laser-shows', name: 'Laser Shows' },
  { id: 'foam-parties', name: 'Foam Parties' },
  { id: 'holiday-events', name: 'Holiday Events' },
  { id: 'neon-nights', name: 'Neon Nights' },
  { id: 'water-games', name: 'Water Games' },
  { id: 'events', name: 'Events' }
];

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/50"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('/images/hero-pattern.svg')]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Event Gallery
            </h1>
            <p className="text-xl text-emerald-100">
              Browse through our collection of memorable events and productions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <p className="text-white opacity-0 hover:opacity-100 transition-opacity text-center px-4">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-full">
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              fill
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 