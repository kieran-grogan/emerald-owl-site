import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import ServiceContent from '../components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Gunge | Emerald Owl Productions',
  description: 'Add excitement and memorable moments to your event with our premium gunge experiences - perfect for fundraisers, game shows, team building, and entertainment events.',
};

// Simulated content that would normally come from the JSON data
const gungeContent = {
  title: 'Gunge',
  meta: {
    title: 'Gunge | Emerald Owl Productions',
    description: 'Add messy fun to your event with our gunge experiences - colorful, washable slime that creates unforgettable memories for all ages.',
    keywords: 'gunge, slime, messy games, slime tank, gunge tank, messy play, emerald owl productions',
  },
  content: {
    main_text: 'Our gunge experiences bring colorful, messy fun to any event. With custom-formulated, safe, and easy-to-clean slime, we create memorable moments that participants and spectators alike will talk about for years to come.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'The Ultimate Messy Experience',
      content: 'Emerald Owl Productions offers premium gunge experiences that add an element of excitement, surprise, and memorable messiness to any event. Our custom-formulated gunge (colorful slime) creates a unique sensory experience that\'s both visually striking and incredibly fun.\n\nGunge can be incorporated into your event in various ways, from simple splash zones to elaborate tanks, slides, and custom delivery systems. It\'s the perfect addition to charity fundraisers, game shows, team challenges, birthday parties, and corporate events looking for something truly unique.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Gunge being poured on a game show contestant',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Gunge Options and Setups',
      content: 'We offer a variety of gunge experiences to suit different event types:\n\n**Classic Gunge Tank:**\n- Transparent tank with overhead release system\n- Optional digital or mechanical trigger mechanisms\n- Customizable platforms and backgrounds\n- Capacity for 10-50 gallons of gunge\n\n**Gunge Slides:**\n- Inflatable or constructed slides covered in gunge\n- Slip-and-slide variations available\n- Collection systems for gunge recycling\n\n**Interactive Gunge Games:**\n- Team-based gunge challenges\n- Quiz show setups with gunge penalties\n- Sports and obstacle courses with gunge elements\n\n**Gunge Dunk Machines:**\n- Carnival-style dunk tanks filled with gunge\n- Digital target options available\n\nAll setups include proper flooring protection, splash zones, and cleanup equipment.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Elaborate gunge tank setup for a charity event',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Creates a memorable, high-energy atmosphere at any event\n- Provides excellent photo and video opportunities\n- Appeals to participants of all ages\n- Uses safe, non-toxic ingredients that wash out easily\n- Available in custom colors to match your event theme or branding\n- Can incorporate glitter, confetti, or UV-reactive elements\n- Professional setup and cleanup included with every booking\n- Can be combined with our other services like foam or water games\n- Perfect for viral social media content creation\n- Various consistency options from thin to ultra-thick',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Safety & Cleanup',
      content: 'Our gunge experiences prioritize safety and convenience:\n\n**Safe Formulation:**\n- Non-toxic and hypoallergenic ingredients\n- Skin-safe and eye-safe formulations\n- Environmental considerations for disposal\n- Gluten-free and fragrance-free options available\n\n**Cleanup Services:**\n- Professional cleaning team included with all bookings\n- Protective coverings for the surrounding area\n- Changing facilities and rinse stations provided\n- Eco-friendly disposal or recycling of all materials\n\n**Participant Preparation:**\n- Detailed information provided in advance\n- Clothing recommendations\n- Protective eye gear available\n- Hair protection options\n\nWe conduct thorough site assessments before each event to ensure all safety measures are in place and appropriate for your venue. Our team handles all aspects of setup and cleanup, making the experience hassle-free for event organizers.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Clean changing and shower facilities at a gunge event',
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
    alt: 'Colorful gunge experience at a corporate team building event',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'gunge.json',
  route: '/gunge',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Colorful gunge experience at a corporate team building event',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Gunge being poured on a game show contestant',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Elaborate gunge tank setup for a charity event',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Clean changing and shower facilities at a gunge event',
      width: '800',
      height: '600',
    }
  ]
};

export default function GungeRedirect() {
  redirect('/services/gunge');
  return null;
} 