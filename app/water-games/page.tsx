import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import ServiceContent from '../components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Water Games | Emerald Owl Productions',
  description: 'Elevate your event with our exciting water games and attractions - perfect for summer events, corporate team building, festivals, and private celebrations.',
};

// Simulated content that would normally come from the JSON data
const waterGamesContent = {
  title: 'Water Games',
  meta: {
    title: 'Water Games | Emerald Owl Productions',
    description: 'Cool down your event with our exciting water games - perfect for summer festivals, corporate events, and private parties.',
    keywords: 'water games, water activities, outdoor games, summer events, water attractions, emerald owl productions',
  },
  content: {
    main_text: 'Beat the heat with our refreshing water games and activities. Perfect for summer events, our water games provide a fun way to cool down while creating memorable experiences for participants of all ages.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Refreshing Water Entertainment',
      content: 'Emerald Owl Productions offers a wide range of water games and activities designed to cool down and entertain guests at outdoor events. Our water games provide the perfect solution for hot summer days, creating a refreshing and interactive experience that everyone can enjoy.\n\nFrom simple splash pads to elaborate water battles, our activities are designed to be inclusive, safe, and most importantly, fun! All of our water equipment is professionally maintained, and we use environmentally friendly water treatments when necessary.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Children playing in water splash zone',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Available Water Activities',
      content: 'Our extensive collection of water games includes something for every event type and age group:\n\n- Giant slip-and-slides (up to 100 feet long)\n- Water balloon battle stations\n- Water gun zones with refill stations\n- Splash pads and sprinkler systems\n- Inflatable water slides (various sizes)\n- Dunk tanks with digital or traditional targets\n- Water obstacle courses\n- Foam-and-water combination activities\n- Misting stations for cooling zones\n- Giant inflatable water toys and floats\n\nMany of our water activities can be customized with your event branding, color schemes, or themes.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Giant slip-and-slide at a community event',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Perfect solution for hot weather events\n- Creates a memorable and unique experience\n- Suitable for all ages with appropriate activities\n- Encourages physical activity and interaction\n- Provides relief from summer heat\n- Creates great photo opportunities\n- Can be combined with other entertainment options\n- Scalable from small backyard parties to large festivals\n- Professional staff handles all setup and water management\n- Water conservation options available for environmentally conscious events',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Event Planning Considerations',
      content: 'When planning water games for your event, we help you consider all the necessary details:\n\n**Venue Requirements:**\n- Adequate water source and drainage\n- Appropriate space for activities\n- Surface considerations (grass, concrete, etc.)\n- Changing area recommendations\n\n**Weather Contingencies:**\n- Backup plans for unexpected weather changes\n- Heating options for cooler days\n\n**Participant Preparation:**\n- Suggested communications to attendees about appropriate attire\n- Towel service options\n- Secure storage solutions for personal items\n\nOur team conducts a thorough site assessment before your event to ensure all water activities are safely and appropriately planned. We handle all water supply, drainage, and cleanup to make the experience hassle-free for event organizers.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Water games setup at a corporate team building event',
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
    alt: 'Fun water games at an outdoor summer festival',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'water-games.json',
  route: '/water-games',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Fun water games at an outdoor summer festival',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Children playing in water splash zone',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Giant slip-and-slide at a community event',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Water games setup at a corporate team building event',
      width: '800',
      height: '600',
    }
  ]
};

export default function WaterGamesRedirect() {
  redirect('/services/water-games');
  return null;
} 