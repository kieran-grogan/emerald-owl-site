import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import EventContent from '../components/content/EventContent';
import { StandardizedContentData, Section } from '../lib/data-standardization';

export const metadata: Metadata = {
  title: "America's 250th Anniversary | Emerald Owl Productions",
  description: "Celebrate America's 250th anniversary with our specialized event production services designed for commemorative celebrations, civic events, and historical tributes.",
};

// Mock event data - would be fetched from CMS in production
const eventData: StandardizedContentData = {
  url: '/americas-250th',
  title: "America's 250th Anniversary Celebration",
  route: '/americas-250th',
  content_type: 'event',
  meta: {
    description: "Join us in celebrating America's 250th anniversary with special events, historical reenactments, and community celebrations.",
    keywords: 'America 250, historical celebration, independence, patriotic event',
  },
  content: {
    main_text: 'In 2026, the United States will commemorate 250 years since the signing of the Declaration of Independence. Emerald Owl Productions is proud to be at the forefront of planning and executing memorable events that honor this monumental occasion.',
    sections: []
  },
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: "America's 250th Anniversary Celebration Banner",
      width: '1200',
      height: '630'
    }
  ],
  standardized_sections: [
    {
      id: 'intro',
      title: 'Celebrating 250 Years of American History',
      content: `In 2026, the United States will commemorate 250 years since the signing of the Declaration of Independence, marking a significant milestone in American history. Emerald Owl Productions is proud to be at the forefront of planning and executing memorable events that honor this monumental occasion.

      Our team is collaborating with local governments, historical societies, and community organizations to create engaging and educational experiences that celebrate America's rich heritage while looking toward its promising future.`,
      media: [],
      className: 'mt-2',
    },
    {
      id: 'event-details',
      title: 'Event Details',
      content: `Date: Throughout 2026, with flagship events on July 2-4, 2026
      Location: Various venues across Pennsylvania and the Mid-Atlantic region
      Price: Many events are free to the public; ticketed events range from $10-50
      
      Planning is currently underway, with specific venues and schedules to be announced in early 2025. Subscribe to our newsletter to receive updates as plans develop.`,
      media: [],
      className: 'event-details-section',
    },
    {
      id: 'programming',
      title: 'Programming Highlights',
      content: `- Historical Reenactments: Authentic portrayals of key moments in early American history
      - Educational Exhibitions: Interactive displays showcasing America's journey over 250 years
      - Community Festivals: Family-friendly celebrations with period-accurate food, music, and activities
      - Commemorative Ceremonies: Formal events honoring the principles of democracy and freedom
      - Cultural Performances: Music, dance, and theatrical presentations reflecting America's diverse heritage`,
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Historical reenactment at a previous Emerald Owl event',
          width: '800',
          height: '600'
        }
      ],
      className: 'highlights-section',
    },
    {
      id: 'participation',
      title: 'How to Participate',
      content: `Communities and organizations have multiple ways to get involved in America's 250th anniversary celebrations:

      1. Host a local event with our production support
      2. Participate as a historical reenactor or performer
      3. Volunteer at one of our flagship events
      4. Sponsor programming to support educational initiatives
      5. Partner with us to create custom commemorative experiences

      Emerald Owl Productions offers complete event planning and execution services, from concept development to day-of coordination. Our team has extensive experience in historical programming and can tailor events to highlight your community's unique connection to American history.`,
      media: [],
      className: 'participation-section',
    },
    {
      id: 'educational',
      title: 'Educational Initiatives',
      content: `Beyond celebrations, America's 250th anniversary presents an extraordinary opportunity for educational engagement. Emerald Owl Productions is developing curriculum-aligned programs for schools, community centers, and libraries that:

      • Connect today's students with America's founding principles
      • Explore the evolution of American democracy over 250 years
      • Examine diverse perspectives on American history
      • Inspire civic engagement and community service
      
      These programs can be customized for different age groups and educational settings, making history accessible and relevant to all audiences.`,
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Educational workshop about American history',
          width: '800',
          height: '600'
        }
      ],
      className: 'educational-section',
    }
  ],
  featured_image: {
    type: 'image',
    url: '/images/placeholder.svg',
    alt: "America's 250th Anniversary Celebration Banner",
    width: '1200',
    height: '630'
  },
  last_updated: '2023-10-15',
};

export default function Americas250thRedirect() {
  redirect('/events/americas-250th');
  return null;
} 