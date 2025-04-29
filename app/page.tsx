import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";
import PageTransition, { SectionEntrance, FadeIn, ScaleIn } from "./components/animations/PageTransition";

export const metadata: Metadata = {
  title: "Emerald Owl Productions | Interactive Entertainment Experiences",
  description: "Bringing interactive entertainment to events nationwide with laser light shows, foam parties, neon nights, and more memorable experiences.",
  keywords: "event entertainment, laser light shows, foam parties, neon nights, emerald owl productions"
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="relative z-20 container h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            America's 250th Anniversary
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Experience a Revolutionary Light Show Celebration!
          </p>
          <Link
            href="/events/americas-250th"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Discover More
          </Link>
        </div>
      </section>

      {/* Experience Sections */}
      <section className="py-20 bg-gray-900">
        <div className="container">
          {/* Laser Light Shows */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Laser Light Shows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={`laser-${num}`} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/laser-${num}.jpg`}
                    alt={`Laser Light Show ${num}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Neon Nights */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Neon Nights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <div key={`neon-${num}`} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={`https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/neon-${num}.jpg`}
                    alt={`Neon Nights ${num}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dripping in Confidence */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Dripping in Confidence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={`dripping-${num}`} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/dripping-${num}.jpg`}
                    alt={`Dripping in Confidence ${num}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Foam Party & Color Run */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Foam Party & Color Run</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={`foam-${num}`} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/foam-${num}.jpg`}
                    alt={`Foam Party ${num}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sensory Friendly Experiences */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-12">Sensory Friendly Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((num) => (
                <div key={`sensory-${num}`} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={`https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/sensory-${num}.jpg`}
                    alt={`Sensory Friendly Experience ${num}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-800">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Create an Unforgettable Experience?</h2>
          <Link
            href="/contact"
            className="bg-owl-500 hover:bg-owl-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
