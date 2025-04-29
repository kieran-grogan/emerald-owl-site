'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/app/components/search/SearchBar';
import Image from 'next/image';
import { SmartLink } from '@/app/lib/link-utils';
import { BlogPost } from '@/app/lib/blog-types';

// Mock search function (in a real app, this would be an API call)
async function searchContent(query: string): Promise<{
  blogPosts: BlogPost[];
  services: any[];
  events: any[];
}> {
  // Mock data - in production, this would be a fetch to your API
  const mockBlogPosts = [
    {
      id: 'laser-technology-advancements',
      title: 'Latest Advancements in Laser Show Technology',
      excerpt: 'Explore how new laser technologies are revolutionizing event productions with more vibrant colors, precision, and energy efficiency.',
      date: '2023-10-15',
      author: 'Michael Chen',
      category: 'Technology',
      image: '/placeholder.svg',
      slug: 'laser-technology-advancements',
      content: '<p>Laser technology has made significant leaps forward in recent years...</p>'
    },
    {
      id: 'sustainable-event-production',
      title: 'Sustainable Event Production: Reducing Environmental Impact',
      excerpt: 'Learn how event producers are implementing eco-friendly practices to minimize waste and energy consumption without compromising production quality.',
      date: '2023-09-28',
      author: 'Sarah Johnson',
      category: 'Sustainability',
      image: '/placeholder.svg',
      slug: 'sustainable-event-production',
      content: '<p>Sustainability in event production is becoming increasingly important...</p>'
    }
  ];
  
  const mockServices = [
    {
      id: 'laser-light-shows',
      title: 'Laser Light Shows',
      excerpt: 'Stunning visual displays using the latest laser technology.',
      image: '/placeholder.svg',
      slug: 'laser-light-shows'
    },
    {
      id: 'neon-nights',
      title: 'Neon Nights',
      excerpt: 'Create an electrifying atmosphere with our neon lighting effects.',
      image: '/placeholder.svg',
      slug: 'neon-nights'
    }
  ];
  
  const mockEvents = [
    {
      id: 'americas-250th',
      title: 'America\'s 250th Celebration',
      excerpt: 'Join us for this historic celebration with spectacular light shows and entertainment.',
      date: '2026-07-04',
      image: '/placeholder.svg',
      slug: 'americas-250th'
    }
  ];

  // Basic search filtering
  const lowerQuery = query.toLowerCase();
  
  const filteredBlogPosts = mockBlogPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) || 
    post.excerpt.toLowerCase().includes(lowerQuery) || 
    post.content.toLowerCase().includes(lowerQuery) ||
    post.category.toLowerCase().includes(lowerQuery)
  );
  
  const filteredServices = mockServices.filter(service => 
    service.title.toLowerCase().includes(lowerQuery) || 
    service.excerpt.toLowerCase().includes(lowerQuery)
  );
  
  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(lowerQuery) || 
    event.excerpt.toLowerCase().includes(lowerQuery)
  );

  // Simulate network delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    blogPosts: filteredBlogPosts,
    services: filteredServices,
    events: filteredEvents
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [results, setResults] = useState<{
    blogPosts: BlogPost[];
    services: any[];
    events: any[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Perform search when query changes
  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam]);
  
  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const searchResults = await searchContent(query);
      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };
  
  // Calculate total results
  const totalResults = results 
    ? results.blogPosts.length + results.services.length + results.events.length
    : 0;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Results</h1>
      
      {/* Search form */}
      <div className="mb-8">
        <SearchBar 
          placeholder="Search blog posts, services, events..." 
          onSearch={handleSearch}
          darkMode={false}
        />
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {/* Results summary */}
      {!isLoading && results && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found {totalResults} results for <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}
      
      {/* No results state */}
      {!isLoading && results && totalResults === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">No results found for "{searchQuery}"</p>
          <p className="text-gray-500">
            Try using different keywords or checking for spelling errors.
          </p>
        </div>
      )}
      
      {/* Results display */}
      {!isLoading && results && totalResults > 0 && (
        <div className="space-y-10">
          {/* Blog post results */}
          {results.blogPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">Blog Posts</h2>
              <div className="space-y-6">
                {results.blogPosts.map(post => (
                  <div key={post.id} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
                    {post.image && (
                      <div className="w-full md:w-1/4 flex-shrink-0">
                        <div className="relative aspect-video md:aspect-square">
                          <Image 
                            src={post.image} 
                            alt={post.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">
                        <SmartLink href={`/blog/${post.slug}`} className="hover:text-emerald-600 transition-colors">
                          {post.title}
                        </SmartLink>
                      </h3>
                      <p className="text-gray-600 mb-2">{post.excerpt}</p>
                      <div className="text-sm text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>By {post.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Services results */}
          {results.services.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.services.map(service => (
                  <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    {service.image && (
                      <div className="relative h-40">
                        <Image 
                          src={service.image} 
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">
                        <SmartLink href={`/services/${service.slug}`} className="hover:text-emerald-600 transition-colors">
                          {service.title}
                        </SmartLink>
                      </h3>
                      <p className="text-gray-600 mb-3">{service.excerpt}</p>
                      <SmartLink 
                        href={`/services/${service.slug}`}
                        className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                      >
                        Learn more →
                      </SmartLink>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Events results */}
          {results.events.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.events.map(event => (
                  <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    {event.image && (
                      <div className="relative h-40">
                        <Image 
                          src={event.image} 
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-sm text-emerald-600 mb-1">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        <SmartLink href={`/events/${event.slug}`} className="hover:text-emerald-600 transition-colors">
                          {event.title}
                        </SmartLink>
                      </h3>
                      <p className="text-gray-600 mb-3">{event.excerpt}</p>
                      <SmartLink 
                        href={`/events/${event.slug}`}
                        className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                      >
                        Learn more →
                      </SmartLink>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
} 