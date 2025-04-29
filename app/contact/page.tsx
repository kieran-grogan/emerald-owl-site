'use client';

import { useState } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Emerald Owl Productions',
  description: 'Get in touch with Emerald Owl Productions to discuss your next event or production.',
};

const contactInfo = [
  {
    title: 'Email',
    value: 'info@emeraldowlproductions.com',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Phone',
    value: '(555) 123-4567',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    title: 'Location',
    value: 'Serving events nationwide',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Get in Touch
          </h1>
          <p className="text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Ready to create an unforgettable event? Contact us to discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-300">
                  Event Type
                </label>
                <select
                  name="eventType"
                  id="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select an event type</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="party">Private Party</option>
                  <option value="concert">Concert/Performance</option>
                  <option value="fundraiser">Fundraiser</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-400">
                      {info.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">{info.title}</h3>
                    <p className="mt-2 text-gray-300">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Map or Additional Content */}
            <div className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8">
              <h3 className="text-lg font-medium text-white mb-4">Service Areas</h3>
              <p className="text-gray-300">
                We provide our services nationwide, bringing unforgettable experiences to events across the country. Contact us to check availability in your area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 