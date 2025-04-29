'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Metadata moved to a separate file

// Blog data from blog.json
const blogPosts = [
  {
    id: 'get-gunged',
    title: 'Get Gunged with Emerald Owl Productions and Dripping In Confidence',
    excerpt: 'Gunge, often referred to as slime, is a playful, messy substance used in various entertainment settings.',
    date: '2024-11-20',
    author: 'Emerald Owl Team',
    category: 'Gunge',
    image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_320/u_https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6711218a511d8da91e61a3a3.jpeg',
    slug: '/blog/get-gunged-with-emerald-owl-productions-and-dripping-in-confidence'
  },
  {
    id: 'foam-party',
    title: 'Experience the Ultimate Foam Party with Emerald Owl Productions',
    excerpt: 'A foam party involves generating large volumes of foam to create a playful and safe environment where participants can dance, play, and cool off.',
    date: '2024-11-20',
    author: 'Emerald Owl Team',
    category: 'Foam',
    image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_320/u_https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67111c429663ed06310b88bf.jpeg',
    slug: '/blog/experience-the-ultimate-foam-party-with-emerald-owl-productions'
  },
  {
    id: 'neon-nights',
    title: 'Experience the Magic of Neon Nights with Emerald Owl Productions',
    excerpt: 'Neon Nights is a dynamic event that combines a 5K fun run with a laser light glow dance party.',
    date: '2024-11-20',
    author: 'Emerald Owl Team',
    category: 'Neon Nights',
    image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_320/u_https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67104d88af96244fc724d501.jpeg',
    slug: '/blog/experience-the-magic-of-neon-nights-with-emerald-owl-productions'
  },
  {
    id: 'celebrate-america',
    title: 'Celebrate America with Emerald Owl Productions\' Spectacular Laser Shows',
    excerpt: 'As we approach the 250th anniversary of the United States, Emerald Owl Productions (EOP) offers an innovative and captivating solution with their "Celebrate America" laser shows.',
    date: '2024-11-20',
    author: 'Emerald Owl Team',
    category: 'Laser Light',
    image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_320/u_https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67181cb4632642555178b7c1.jpeg',
    slug: '/blog/celebrate-america-with-emerald-owl-productions-spectacular-laser-shows'
  },
  {
    id: 'holiday-lights',
    title: 'Illuminate Your Holidays with Emerald Owl Productions\' Christmas Light Shows',
    excerpt: 'The holiday season is a time for joy, celebration, and creating lasting memories with loved ones. Experience a captivating Christmas light show.',
    date: '2024-11-20',
    author: 'Emerald Owl Team',
    category: 'Laser Light',
    image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_320/u_https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/671d07f4b62b3675efd3d708.jpeg',
    slug: '/blog/illuminate-your-holidays-with-emerald-owl-productions-christmas-light-shows'
  },
  {
    id: 'trash-wedding-dress',
    title: 'Embrace the Fun: Trash the Wedding Dress Events with Emerald Owl Productions',
    excerpt: '"Trash the Wedding Dress" is a post-wedding photoshoot trend where brides wear their gowns in unconventional settings, often involving elements like water, mud, or gunge.',
    date: '2024-11-20',
    author: 'Emerald Owl Team',
    category: 'Gunge',
    image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_320/u_https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/671faa98c2739a9314268f74.jpeg',
    slug: '/blog/embrace-the-fun-trash-the-wedding-dress-events-with-emerald-owl-productions'
  }
];

// Extract unique categories for filter options
const categories = [...new Set(blogPosts.map(post => post.category))];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
    
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Insights</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Explore the latest trends, technologies, and creative ideas in event production,
            entertainment technology, and experiential design.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 mb-8 border border-emerald-100">
                <h2 className="text-xl font-semibold mb-4 text-emerald-800">Categories</h2>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left py-2 px-3 rounded transition-colors ${
                      selectedCategory === 'All' ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50'
                    }`}
                  >
                    All Posts
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category} 
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded transition-colors ${
                        selectedCategory === category ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mt-8 mb-4 text-emerald-800">Search</h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 focus:outline-none"
                  />
                  <button className="absolute right-3 top-3 text-gray-500">
                    🔍
                  </button>
                </div>
              </div>
            </div>
            
            {/* Blog posts grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">
                        <Link href={post.slug} className="hover:text-emerald-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="text-sm text-gray-500">By {post.author}</span>
                      </div>
                      <Link 
                        href={post.slug} 
                        className="mt-4 inline-block text-emerald-600 font-medium hover:text-emerald-800 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Empty state when no posts match filter */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No posts found in this category.</p>
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    View All Posts
                  </button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-l-md hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-4 py-2 border-t border-b border-gray-300 bg-emerald-600 text-white text-sm font-medium">
                      1
                    </button>
                    <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-r-md hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-emerald-200 to-emerald-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-emerald-800">Subscribe to Our Newsletter</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-emerald-900">
            Get the latest insights and updates delivered directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow p-3 border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
} 