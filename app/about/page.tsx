import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../components/media/IconSystem';

export const metadata: Metadata = {
  title: 'About Us | Emerald Owl Productions',
  description: 'Learn about Emerald Owl Productions, our mission, and our team of event production professionals.',
};

const teamMembers = [
  {
    name: 'Emmy The Owl',
    role: 'Mascot & Brand Ambassador',
    image: '/images/team/emmy-the-owl.jpg',
    bio: 'Emmy represents the spirit of innovation and creativity that drives Emerald Owl Productions.'
  }
];

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push the boundaries of what\'s possible in event production, incorporating cutting-edge technology and creative solutions.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Excellence',
    description: 'Every detail matters. We strive for perfection in every event, ensuring a flawless experience for our clients and their guests.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: 'Creativity',
    description: 'We bring imagination to life, creating unique and memorable experiences that leave lasting impressions.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
];

export default function AboutPage() {
  return (
    <main className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-emerald-600">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-100">
              Emerald Owl Productions is dedicated to creating unforgettable experiences through innovative event production. We combine cutting-edge technology with creative vision to transform ordinary events into extraordinary memories.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="relative group rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8"
              >
                <div className="mb-6 inline-block rounded-lg bg-emerald-600/10 p-3 text-emerald-400">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              The passionate professionals behind Emerald Owl Productions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="relative group overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-emerald-400 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
            Ready to Create Something Amazing?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            Get in Touch
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