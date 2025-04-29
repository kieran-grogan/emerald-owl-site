import { Metadata } from "next";
import Image from "next/image";
import PageTransition, { FadeIn } from "../components/animations/PageTransition";
import Icon from "../components/media/IconSystem";

export const metadata: Metadata = {
  title: "Contact Us | Emerald Owl Productions",
  description: "Contact us to discuss scheduling one of our many services for your events.",
  keywords: "Emerald Owl Productions, event services, DJ entertainment, event lighting, photo booth rental, wedding DJ, corporate events, party entertainment, professional DJs, event planning"
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
          <Image 
            src="/images/content/general/67ad1519ab36b0cd8b78150d.jpeg"
            alt="Emerald Owl Productions Event" 
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-emerald-900/40"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-emerald-100 max-w-3xl">
                Ready to create an unforgettable event? Get in touch with us and let's start planning something amazing together.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type*
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="">Select an event type</option>
                      <option value="laser-show">Laser Light Show</option>
                      <option value="foam-party">Foam Party</option>
                      <option value="neon-nights">Neon Nights</option>
                      <option value="sensory-friendly">Sensory Friendly Experience</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="holiday">Holiday Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      required
                      placeholder="Tell us about your event, including date, location, and any specific requirements."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 px-6 rounded-md font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Icon name="phone" className="w-6 h-6 text-emerald-600 mt-1" />
                      <div className="ml-4">
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-600">252.764.7628</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Icon name="mail" className="w-6 h-6 text-emerald-600 mt-1" />
                      <div className="ml-4">
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">info@emeraldowlproductions.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Icon name="map-pin" className="w-6 h-6 text-emerald-600 mt-1" />
                      <div className="ml-4">
                        <h3 className="font-medium">Address</h3>
                        <p className="text-gray-600">PO Box 4911<br />Emerald Isle, NC 28594</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/content/general/673c35f2d88b411473f4fc7d.jpeg"
                      alt="Laser light show performance"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/content/general/67acd8f8f52f42b61b761af8.jpeg"
                      alt="Interactive event experience"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">What is the difference between a laser show and a laser light glow in the dark dance party?</h3>
                <div className="text-gray-600 space-y-4">
                  <p>A laser show is typically a 20-30 minute customized show that synchronizes laser lights with music. Shows can celebrate seasons (Halloween, Christmas, 4th of July), feature musical genres (80's, Top 40, Hip Hop, Country), or incorporate different themes (sports, religious, marine life). The show can be repeated during an event without additional overhead.</p>
                  <p>A laser light glow in the dark dance party is a high energy performance that creates a nightclub atmosphere. It features UV lights for glow effects, lasers, professional moving lights, and high-quality sound. Optional additions include video projection screens, snow machines, and foam machines. Dance parties typically last 3-5 hours.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Can we do the event outside?</h3>
                <p className="text-gray-600">Yes, we can do laser shows and laser light dance parties both indoors and outdoors. Outdoor performances may cost more due to the need for higher wattage lasers. For outdoor events without beam termination points, we need to file for FAA approval at least 30 days in advance.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Why do you use haze inside?</h3>
                <p className="text-gray-600">Haze is essential for laser beams to be visible in the air. The particles in the haze allow the laser beams to be seen, creating the visual impact. Our haze machines use safe, non-flammable materials designed not to trigger fire alarms. We can work with venues to ensure proper safety measures are in place.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Why aren't your rates published?</h3>
                <p className="text-gray-600">Each event is unique and requires different equipment, setup, and resources. We prefer to discuss your vision and venue specifics to provide the most accurate quote. Factors include attendance, indoor/outdoor location, power availability, sound requirements, and more. We're happy to work with your budget to create an amazing experience.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 