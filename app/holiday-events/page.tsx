import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import EventContent from '../components/content/EventContent';
import { StandardizedContentData } from '../lib/data-standardization';

export const metadata: Metadata = {
  title: "Holiday Events | Emerald Owl Productions",
  description: "Create memorable holiday celebrations with our professional event production services - from corporate parties to community festivals, winter wonderlands, and themed experiences.",
};

// Mock event data - would be fetched from CMS in production
const eventData: StandardizedContentData = {
  url: '/holiday-events',
  title: "Holiday Events",
  route: '/holiday-events',
  content_type: 'event',
  meta: {
    description: "Transform your seasonal celebrations with our custom holiday event production services, from corporate parties to community festivals and winter markets.",
    keywords: 'holiday events, Christmas productions, winter celebrations, corporate holiday parties, festival of lights, holiday markets, seasonal celebrations',
  },
  content: {
    main_text: 'Emerald Owl Productions specializes in creating memorable holiday celebrations that capture the spirit of the season. Our festive events bring communities together, inspire joy, and create lasting traditions for organizations, municipalities, and businesses.',
    sections: []
  },
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Festive holiday celebration with lights, decorations and entertainment',
      width: '1920',
      height: '1080'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Festive holiday celebration with decorative lighting and seasonal decor',
      width: '800',
      height: '600'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Holiday market with vendor booths and festive atmosphere',
      width: '800',
      height: '600'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Corporate holiday gala with elegant decorations and entertainment',
      width: '800',
      height: '600'
    }
  ],
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Holiday Event Production',
      content: 'The holiday season offers a unique opportunity to bring people together through shared celebration and tradition. Emerald Owl Productions creates custom holiday events that capture the magic of the season while achieving your specific goals, whether building company culture, driving retail traffic, or creating community connections.\n\nOur holiday production services blend creative concepts with flawless execution, incorporating seasonal aesthetics, entertainment, and interactive elements that create memorable experiences for all ages. We understand the importance of inclusivity in holiday programming and develop celebrations that welcome diverse audiences and honor multiple traditions.\n\nFrom intimate corporate gatherings to large-scale community festivals, we manage every aspect of your holiday event, ensuring a seamless experience that allows hosts and guests alike to fully immerse themselves in the joy of the season.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Festive holiday celebration with decorative lighting and seasonal decor',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Holiday Event Options',
      content: 'We offer holiday event production services for a variety of formats and audiences:\n\n**Corporate Holiday Celebrations:**\n- End-of-year appreciation events and galas\n- Holiday office parties and team celebrations\n- Client appreciation events with seasonal themes\n- Virtual and hybrid holiday gatherings\n- Employee family celebrations\n\n**Community Holiday Events:**\n- Tree lighting ceremonies and holiday kickoffs\n- Winter festivals and holiday markets\n- Seasonal parades and processions\n- Light displays and illumination events\n- New Year\'s Eve celebrations\n\n**Retail & Commercial Holiday Activations:**\n- Shopping center holiday experiences\n- Seasonal customer appreciation events\n- Holiday open houses and VIP events\n- Photos with Santa and character experiences\n- Storefront and plaza decorations\n\n**Specialty Holiday Productions:**\n- Holiday-themed performing arts events\n- Seasonal fundraising galas\n- Interactive holiday experiences\n- Themed dining events and experiences\n- Cultural holiday celebrations\n\nAll holiday events can be customized to reflect your organization\'s culture, community traditions, and specific celebration goals.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Holiday market with vendor booths and festive atmosphere',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'event-details',
      title: 'Holiday Event Details',
      content: 'Season: November through January\nLocations: Various venues across your choice of location\nPrice: Varies based on event size and components\n\nOur holiday events can be adapted for various budgets and venues. Contact us for a custom quote based on your specific needs and objectives.',
      media: [],
      className: 'event-details-section',
    },
    {
      id: 'section-3',
      title: 'Holiday Event Features',
      content: '- Custom themed environments and immersive decorations\n- Professional lighting design including display lighting\n- Seasonal entertainment programming\n- Custom branded holiday elements\n- Photo opportunities and shareable moments\n- Interactive holiday activities and crafts\n- Specialty food and beverage concepts\n- Holiday gift experiences and takeaways\n- Seasonal music programming\n- Character appearances and performance elements\n- Custom holiday merchandising displays\n- Themed staff costuming and training',
      className: 'highlights-section',
    },
    {
      id: 'section-4',
      title: 'Our Holiday Event Process',
      content: 'Creating exceptional holiday events requires both creativity and careful planning. Our process includes:\n\n**Goal Setting & Concept Development:**\n- Identifying celebration objectives and key messages\n- Determining target audience and experience level\n- Establishing budget parameters and priorities\n- Developing custom holiday themes and concepts\n- Creating design direction and aesthetic guidelines\n\n**Experience Design:**\n- Planning guest journey and experience flow\n- Designing themed environments and decor packages\n- Selecting appropriate entertainment and activities\n- Creating custom holiday programming\n- Integrating food, beverage and retail components\n\n**Production Planning:**\n- Securing appropriate venue and technical infrastructure\n- Developing detailed production schedules\n- Coordinating vendors and entertainment\n- Managing staffing and volunteer requirements\n- Creating contingency plans for weather and variables\n\n**Event Implementation:**\n- Managing installation and technical production\n- Coordinating day-of operations and guest services\n- Supervising entertainment and programmed elements\n- Ensuring safety and guest comfort\n- Documenting the event through photography and video\n\n**Evaluation & Future Planning:**\n- Gathering feedback and measuring success metrics\n- Debriefing with key stakeholders\n- Developing recommendations for future events\n- Planning for decor and asset storage/reuse\n- Beginning early planning for next year\'s event\n\nOur team brings extensive experience in holiday event production, understanding the unique challenges and opportunities of seasonal celebrations while managing the heightened expectations this special time of year brings.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Corporate holiday gala with elegant decorations and entertainment',
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
    alt: 'Festive holiday celebration with lights, decorations and entertainment',
    width: '1920',
    height: '1080',
  },
  last_updated: '2023-10-15',
};

export default function HolidayEventsRedirect() {
  redirect('/events/holiday-events');
  return null;
} 