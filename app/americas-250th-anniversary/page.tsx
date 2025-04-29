import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import EventContent from '../components/content/EventContent';
import { StandardizedContentData } from '../lib/data-standardization';

export const metadata: Metadata = {
  title: "America's 250th Anniversary | Emerald Owl Productions",
  description: "Celebrate America's 250th anniversary with our specialized event production services designed for commemorative celebrations, civic events, and historical tributes.",
};

// Mock event data - would be fetched from CMS in production
const eventData: StandardizedContentData = {
  url: '/americas-250th-anniversary',
  title: "America's 250th Anniversary",
  route: '/americas-250th-anniversary',
  content_type: 'event',
  meta: {
    description: "Celebrate America's 250th birthday with spectacular event productions designed for communities, organizations, and municipalities.",
    keywords: 'America 250, semiquincentennial, July 4th 2026, patriotic events, American celebration, emerald owl productions',
  },
  content: {
    main_text: 'Emerald Owl Productions is proud to offer specialized event production services for America\'s 250th Anniversary celebrations in 2026. Our patriotic-themed experiences create memorable, immersive events that honor this historic milestone.',
    sections: []
  },
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'America 250 celebration with fireworks and patriotic displays',
      width: '1920',
      height: '1080'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Spectacular laser light show with American themes',
      width: '800',
      height: '600'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Interactive historical experience with colonial crafts',
      width: '800',
      height: '600'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Planning session for America 250 celebration with community leaders',
      width: '800',
      height: '600'
    }
  ],
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Celebrating 250 Years of America',
      content: 'The 250th anniversary of the United States represents a once-in-a-generation opportunity to celebrate our nation\'s founding and history. Emerald Owl Productions has developed a comprehensive suite of event production services specifically designed for America\'s Semiquincentennial celebrations.\n\nOur team has created immersive patriotic experiences that combine cutting-edge technology with thoughtful historical references, creating events that are both entertaining and meaningful. From small community gatherings to large municipal celebrations, we can scale our services to meet the needs of any organization planning to commemorate this historic milestone.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Spectacular laser light show with American themes',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'event-details',
      title: 'America 250 Event Details',
      content: 'Dates: Planning for 2025-2026 celebrations is currently underway\nLocation: Available nationwide for communities, organizations, and institutions\nPrice: Custom pricing based on event scope and components\n\nWe recommend beginning conversations about America 250 celebrations at least 12-18 months in advance to ensure proper planning, funding, and community involvement.',
      media: [],
      className: 'event-details-section',
    },
    {
      id: 'section-2',
      title: 'America 250 Event Options',
      content: 'We offer several specialized event packages that can be customized for your community or organization:\n\n**Patriotic Spectaculars:**\n- Red, white, and blue themed laser light shows\n- Synchronized drone displays forming historical imagery\n- Immersive projection mapping of American historical events\n- Musical productions featuring American history themes\n\n**Interactive Historical Experiences:**\n- Revolutionary era reenactment zones\n- Hands-on colonial craft demonstrations\n- Virtual reality historical journeys\n- Multi-sensory historical exhibits\n\n**Community Engagement Activities:**\n- "America\'s Story" recording booths for citizen stories\n- Collaborative community art installations\n- Intergenerational history exchange programs\n- Cultural diversity celebrations highlighting America\'s multicultural heritage\n\nAll of our America 250 experiences can be fully customized to highlight local history and the unique contributions your community has made to the American story.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Interactive historical experience with colonial crafts',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Creates a memorable celebration of this historic national milestone\n- Combines entertainment with educational and historical content\n- Customizable to reflect local history and community contributions\n- Provides opportunities for community engagement and participation\n- Creates shareable, photo-worthy moments for social media\n- Offers scalable solutions for communities of all sizes\n- Includes patriotic themes that resonate with multi-generational audiences\n- Creates a sense of unity and shared experience\n- Aligns with official America 250 themes and initiatives\n- Option to include legacy projects that continue beyond the celebration',
      className: 'highlights-section',
    },
    {
      id: 'section-4',
      title: 'Planning Your America 250 Celebration',
      content: 'Planning for America\'s 250th anniversary should begin well in advance. When you partner with Emerald Owl Productions, our event specialists will guide you through the entire planning process:\n\n**Initial Consultation:**\n- Exploring your community\'s historical significance\n- Identifying key stakeholders and potential partners\n- Establishing goals and budget parameters\n- Discussing preliminary themes and concepts\n\n**Customized Planning:**\n- Developing detailed event proposals\n- Creating timelines and implementation schedules\n- Coordinating with local historical societies and organizations\n- Securing necessary permits and approvals\n\n**Comprehensive Production:**\n- Professional event management\n- Technical production and equipment\n- Staffing and volunteer coordination\n- Documentation and archiving\n\nWe recommend beginning conversations about America 250 celebrations at least 12-18 months in advance to ensure proper planning, funding, and community involvement. Our team can also assist with grant applications and sponsorship opportunities specifically available for America 250 celebrations.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Planning session for America 250 celebration with community leaders',
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
    alt: 'America 250 celebration with fireworks and patriotic displays',
    width: '1920',
    height: '1080',
  },
  last_updated: '2023-10-15',
};

export default function Americas250thAnniversaryRedirect() {
  redirect('/events/americas-250th');
  return null;
} 