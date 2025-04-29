import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Water Games | Emerald Owl Productions',
  description: 'Epic water wars and splash battles for events of all sizes. Perfect for summer events, school functions, and community gatherings.',
};

export default function WaterGamesPage() {
  const content: StandardizedContentData = {
    title: "Water Games",
    url: "/services/water-games",
    route: "/services/water-games",
    meta: {
      description: "Epic water wars and splash battles for events of all sizes. Perfect for summer events, school functions, and community gatherings.",
      keywords: "water games, water wars, water battles, summer events, outdoor activities"
    },
    content: {
      main_text: "Transform your event into an epic water battle! Our water games are designed for maximum fun and complete drenching. Perfect for summer events, school functions, and community gatherings.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c3284f980e1005f8294cb.jpeg",
        alt: "Kids enjoying water games with water blasters",
        width: "1200",
        height: "800"
      },
      {
        type: "image",
        url: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c35f2d88b411473f4fc7d.jpeg",
        alt: "Water war battle in action",
        width: "800",
        height: "600"
      },
      {
        type: "image",
        url: "https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c357b15ee062e43bff020.jpeg",
        alt: "Water games setup with filling stations",
        width: "800",
        height: "600"
      }
    ],
    standardized_sections: [
      {
        id: 'overview',
        title: 'Water Wars',
        content: 'Who does not love a great all-out water war? This activity is fun for kids and adults alike! If you are just wanting to get a little splashed, THIS IS NOT FOR YOU! Our water wars are TOTAL & COMPLETE DRENCHERS!\n\nWe bring everything needed for an epic water battle:\n- Professional water blasters\n- Plastic buckets for dumping\n- Filling stations\n- Safety equipment\n- Game coordination\n\nYou just provide the running water, and we\'ll handle the rest!',
        media: [
          {
            type: 'image',
            url: 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c31ed17d9a926f3443657.jpeg',
            alt: 'Water war participants in action',
            width: '800',
            height: '600',
          }
        ],
        className: '',
      },
      {
        id: 'features',
        title: 'Game Features',
        content: '• Multiple game modes for different age groups\n• Team-based or free-for-all battles\n• Safe, monitored play areas\n• Professional game coordinators\n• Optional add-ons like slime or washable paint\n• Perfect for summer camps and school events\n• Great for fundraisers and community events\n• Can be combined with our foam party experience',
        media: [
          {
            type: 'image',
            url: 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c315517d9a969d244352c.jpeg',
            alt: 'Water games equipment and setup',
            width: '800',
            height: '600',
          }
        ],
        className: '',
      },
      {
        id: 'ideas',
        title: 'Event Ideas',
        content: '• School vs School Challenges\n• High School vs Elementary School Events (great for volunteer hours!)\n• Summer Camp Activities\n• Church Youth Group Events\n• Community Festival Attractions\n• Birthday Party Entertainment\n• Corporate Team Building\n• Fundraising Events\n\nWant to add more excitement? Ask us about combining water wars with:\n- Slime battles\n- Washable paint wars\n- Foam party finale',
        media: [
          {
            type: 'image',
            url: 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c3110f980e18fd68293fa.jpeg',
            alt: 'Community water games event',
            width: '800',
            height: '600',
          }
        ],
        className: '',
      }
    ],
    featured_image: {
      type: 'image',
      url: 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673c3284f980e1005f8294cb.jpeg',
      alt: 'Epic water war battle in progress',
      width: '1920',
      height: '1080',
    }
  };

  return <ServiceContent content={content} />;
} 