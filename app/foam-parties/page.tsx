import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import ServiceContent from '../components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Foam Parties | Emerald Owl Productions',
  description: 'Create an unforgettable experience with our high-quality foam party services for events of all sizes - from nightclubs to private celebrations and corporate events.',
};

// Simulated content that would normally come from the JSON data
const foamPartiesContent = {
  title: 'Foam Parties',
  meta: {
    title: 'Foam Parties | Emerald Owl Productions',
    description: 'Create an unforgettable experience with our premium foam party services for events of all sizes and ages.',
    keywords: 'foam party, foam experience, foam machine rental, event foam, dance foam party, emerald owl productions',
  },
  content: {
    main_text: 'Our foam parties bring a unique and exhilarating experience to any event. With state-of-the-art foam machines and hypoallergenic, non-toxic foam solution, we create a fun, safe environment that guests of all ages will love.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'The Ultimate Foam Experience',
      content: 'Emerald Owl Productions offers premium foam party services that take your event to the next level. Our professional foam machines produce mountains of soft, clean foam that creates an instantly fun and immersive environment. As the foam builds up, your event space is transformed into a playful wonderland that encourages interaction and creates unforgettable memories.\n\nOur foam is specially formulated to be hypoallergenic, non-toxic, and safe for all ages. It\'s gentle on skin, won\'t stain clothes, and dissipates without leaving a messy residue. We use only the highest quality foam solutions that are biodegradable and environmentally friendly.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Foam party at an outdoor event',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Perfect for Any Event',
      content: 'Foam parties are versatile entertainment options that work for a wide variety of events:\n\n- Summer festivals and community celebrations\n- School end-of-year parties and graduations\n- College events and fraternity/sorority parties\n- Corporate team building days\n- Birthday parties for all ages\n- Youth group activities\n- Charity fundraisers\n- Theme park special events\n- Nightclub promotions\n\nOur team will work with you to customize the foam experience to match your specific event needs, venue constraints, and audience preferences.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Children enjoying a foam party',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Creates an interactive, engaging experience that gets everyone involved\n- Works for both indoor and outdoor venues with proper setup\n- Suitable for all age groups with adjustable foam levels\n- Provides a unique experience many guests have never tried before\n- Offers great photo and social media opportunities\n- Keeps guests cool during hot weather events\n- Can be combined with lighting effects for nighttime events\n- Creates instant energy and excitement at any event\n- Easy setup and cleanup with our professional team\n- Uses safe, non-toxic, and environmentally friendly materials',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Our Foam Party Packages',
      content: 'We offer several foam party packages to suit different event sizes and needs:\n\n**Standard Foam Package:**\n- 1-2 professional foam machines\n- Up to 3 hours of continuous foam\n- Basic LED lighting\n- 1 technician on-site\n- Suitable for up to 100 guests\n\n**Premium Foam Experience:**\n- 2-4 professional foam machines\n- Up to 4 hours of continuous foam\n- Advanced LED lighting with color changes\n- 2 technicians on-site\n- DJ services available\n- Suitable for up to 250 guests\n\n**Ultimate Foam Extravaganza:**\n- 4+ professional foam machines\n- Up to 6 hours of continuous foam\n- Full lighting production\n- Multiple technicians\n- DJ and MC services\n- Custom foam pit construction\n- Suitable for 250+ guests\n\nAll packages include setup, cleanup, and our premium hypoallergenic foam solution.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Professional foam machine setup',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
  ],
  featured_image: {
    type: 'image',
    url: '/images/placeholder.svg',
    alt: 'Exciting foam party with colorful lighting',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'foam-parties.json',
  route: '/foam-parties',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Exciting foam party with colorful lighting',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Foam party at an outdoor event',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Children enjoying a foam party',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Professional foam machine setup',
      width: '800',
      height: '600',
    }
  ]
};

export default function FoamPartiesRedirect() {
  redirect('/services/foam-parties');
  return null;
} 