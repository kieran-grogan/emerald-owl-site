'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentData } from '../../lib/data';
import { StandardizedContentData, Section } from '../../lib/data-standardization';

interface EventDetails {
  start_date?: string;
  end_date?: string;
  location?: string;
  venue?: string;
  ticket_info?: string;
  registration_url?: string;
}

interface NonStandardizedContent {
  main_text: string;
  sections?: Array<{
    title?: string;
    content: string;
    media?: {
      image?: string;
      alt?: string;
    };
  }>;
  event_details?: {
    date?: string;
    location?: string;
    price?: string;
    ticket_link?: string;
  };
}

interface EventContentProps {
  content: ContentData | StandardizedContentData & { event_details?: EventDetails };
}

export default function EventContent({ content }: EventContentProps) {
  // Check if content is standardized
  const isStandardized = 'standardized_sections' in content;
  
  // Helper to render a single section
  const renderSection = (section: Section) => {
    return (
      <div key={section.id} className={`mb-12 ${section.className || ''}`}>
        {section.title && section.title !== content.title && (
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{section.title}</h2>
        )}
        
        <div className="prose dark:prose-invert max-w-none">
          {section.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
          ))}
        </div>
        
        {section.media && section.media.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.media.map((media, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-video shadow-lg">
                <Image
                  src={media.url}
                  alt={media.alt || 'Event feature'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Helper to render featured image
  const renderHero = () => {
    if (isStandardized && (content as StandardizedContentData).featured_image) {
      const featuredImage = (content as StandardizedContentData).featured_image;
      if (featuredImage) {
        return (
          <div className="relative h-96 overflow-hidden mb-8">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || content.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h1>
                  {content.meta.description && (
                    <p className="text-xl text-white/80">{content.meta.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Fallback if no featured image
    return (
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h1>
          {content.meta.description && (
            <p className="text-xl text-white/80 max-w-3xl">{content.meta.description}</p>
          )}
        </div>
      </div>
    );
  };

  // Check for event date and location if available
  const renderEventDetails = () => {
    if (isStandardized) {
      // For standardized content, check for event_details property first
      const standardizedContent = content as StandardizedContentData & { event_details?: EventDetails };
      if (standardizedContent.event_details) {
        const eventDetails = standardizedContent.event_details;
        
        return (
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-lg mb-8 shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(eventDetails.start_date || eventDetails.end_date) && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                    <span className="text-emerald-600 dark:text-emerald-300">📅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Date & Time</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {eventDetails.start_date ? new Date(eventDetails.start_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : ''}
                      {eventDetails.start_date && eventDetails.end_date ? ' - ' : ''}
                      {eventDetails.end_date && eventDetails.start_date !== eventDetails.end_date ? 
                        new Date(eventDetails.end_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : ''}
                    </p>
                  </div>
                </div>
              )}
              
              {(eventDetails.location || eventDetails.venue) && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                    <span className="text-emerald-600 dark:text-emerald-300">📍</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Location</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {eventDetails.venue ? `${eventDetails.venue}` : ''}
                      {eventDetails.venue && eventDetails.location ? ', ' : ''}
                      {eventDetails.location ? `${eventDetails.location}` : ''}
                    </p>
                  </div>
                </div>
              )}
              
              {eventDetails.ticket_info && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                    <span className="text-emerald-600 dark:text-emerald-300">💲</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pricing</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{eventDetails.ticket_info}</p>
                  </div>
                </div>
              )}
              
              {eventDetails.registration_url && (
                <div className="md:col-span-2 mt-4">
                  <Link 
                    href={eventDetails.registration_url}
                    className="inline-block bg-emerald-600 text-white font-bold py-2 px-6 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Register Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      }
      
      // Fallback to finding event details section
      const sections = (content as StandardizedContentData).standardized_sections;
      const eventDetailsSection = sections.find(section => 
        section.title?.toLowerCase().includes('details') || 
        section.title?.toLowerCase().includes('information') ||
        section.id === 'event_details'
      );
      
      if (!eventDetailsSection) return null;
      
      return (
        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
            {eventDetailsSection.title || 'Event Details'}
          </h2>
          <div className="prose dark:prose-invert">
            {eventDetailsSection.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-2">{paragraph}</p>
            ))}
          </div>
        </div>
      );
    }
    
    // For non-standardized content
    const nonStandardContent = content.content as NonStandardizedContent;
    const eventDetails = nonStandardContent.event_details;
    if (!eventDetails) return null;
    
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-lg mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventDetails.date && (
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                <span className="text-emerald-600 dark:text-emerald-300">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Date & Time</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{eventDetails.date}</p>
              </div>
            </div>
          )}
          
          {eventDetails.location && (
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                <span className="text-emerald-600 dark:text-emerald-300">📍</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Location</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{eventDetails.location}</p>
              </div>
            </div>
          )}
          
          {eventDetails.price && (
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                <span className="text-emerald-600 dark:text-emerald-300">💲</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Price</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{eventDetails.price}</p>
              </div>
            </div>
          )}
          
          {eventDetails.ticket_link && (
            <div className="md:col-span-2 mt-4">
              <Link 
                href={eventDetails.ticket_link}
                className="inline-block bg-emerald-600 text-white font-bold py-2 px-6 rounded-md hover:bg-emerald-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Tickets
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Extract highlights or features
  const getHighlightsSection = () => {
    if (!isStandardized) return null;
    
    const sections = (content as StandardizedContentData).standardized_sections;
    const highlightsSection = sections.find(section => 
      section.title?.toLowerCase().includes('highlight') || 
      section.title?.toLowerCase().includes('feature') ||
      section.title?.toLowerCase().includes('option')
    );
    
    if (!highlightsSection) return null;
    
    // Extract bullet points
    const bulletPoints = highlightsSection.content
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim());
    
    if (bulletPoints.length === 0) return null;
    
    return (
      <div className="bg-gray-50 dark:bg-gray-800 py-12 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {highlightsSection.title || 'Event Highlights'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bulletPoints.map((point, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <article>
      {renderHero()}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Event Details Section */}
          {renderEventDetails()}
          
          {/* Render standardized sections if available */}
          {isStandardized ? (
            <>
              {(content as StandardizedContentData).standardized_sections
                .filter(section => !section.title?.toLowerCase().includes('highlight') && 
                                  !section.title?.toLowerCase().includes('feature') &&
                                  !section.title?.toLowerCase().includes('detail') &&
                                  !section.title?.toLowerCase().includes('information'))
                .map(renderSection)}
              
              {getHighlightsSection()}
              
              {/* Call to Action */}
              <div className="bg-emerald-700 text-white rounded-lg p-8 my-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Join Us for {content.title}</h2>
                <p className="mb-6">Contact us today for more information or to register for this event!</p>
                <Link 
                  href="/contact-us" 
                  className="inline-block bg-white text-emerald-700 font-bold py-3 px-6 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </>
          ) : (
            /* Main content section */
            <div className="prose dark:prose-invert max-w-none">
              {content.content.main_text.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
              ))}
              
              {/* Render sections for non-standardized content */}
              {(content.content as NonStandardizedContent).sections && 
               (content.content as NonStandardizedContent).sections!.map((section, index) => (
                <div key={index} className="mb-12">
                  {section.title && (
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{section.title}</h2>
                  )}
                  
                  <div className="prose dark:prose-invert max-w-none">
                    {section.content.split('\n').map((paragraph: string, pIndex: number) => (
                      <p key={pIndex} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
                    ))}
                  </div>
                  
                  {section.media && section.media.image && (
                    <div className="mt-6 relative overflow-hidden rounded-lg aspect-video shadow-lg">
                      <Image
                        src={section.media.image}
                        alt={section.media.alt || 'Event feature'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Simple Call to Action for non-standardized content */}
              <div className="bg-emerald-700 text-white rounded-lg p-8 my-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Join Us for {content.title}</h2>
                <p className="mb-6">Contact us today for more information or to register for this event!</p>
                <Link 
                  href="/contact-us" 
                  className="inline-block bg-white text-emerald-700 font-bold py-3 px-6 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
} 