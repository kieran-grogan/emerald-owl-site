import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import EventContent from '../components/content/EventContent';
import { StandardizedContentData } from '../lib/data-standardization';

export const metadata: Metadata = {
  title: "Fundraiser Events | Emerald Owl Productions",
  description: "Create impactful fundraising events that inspire giving and maximize donations with our specialized production services for charity galas, fun runs, auctions, and community fundraisers.",
};

// Mock event data - would be fetched from CMS in production
const eventData: StandardizedContentData = {
  url: '/fundraisers',
  title: "Fundraising Events",
  route: '/fundraisers',
  content_type: 'event',
  meta: {
    description: "Maximize your nonprofit's fundraising potential with our strategic event production services designed to increase donor engagement and drive meaningful contributions.",
    keywords: 'fundraising events, nonprofit fundraisers, charity galas, benefit concerts, donor events, fundraising production, auction events',
  },
  content: {
    main_text: 'Emerald Owl Productions specializes in creating impactful fundraising events that inspire generosity while advancing your mission. Our strategically designed fundraisers combine compelling storytelling with seamless guest experiences to maximize donor engagement and financial results.',
    sections: []
  },
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Charity gala fundraiser with elegant decor and auction displays',
      width: '1920',
      height: '1080'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Elegant charity gala with auction items and stage presentation',
      width: '800',
      height: '600'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Community fun run fundraiser with participants and sponsors',
      width: '800',
      height: '600'
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Benefit concert fundraiser with stage and audience',
      width: '800',
      height: '600'
    }
  ],
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Fundraising Event Production',
      content: 'Successful fundraising events require a delicate balance of inspiration, entertainment, and strategic giving opportunities. Emerald Owl Productions partners with nonprofits, schools, foundations, and community organizations to create fundraising experiences that generate immediate financial support while building lasting donor relationships.\n\nOur fundraising production services combine compelling storytelling that communicates your mission with seamless logistics that create positive donor experiences. We understand the importance of managing both hard costs and opportunity costs to maximize net revenue, working within your budget constraints while identifying areas where strategic investment will yield significant returns.\n\nFrom intimate major donor receptions to large-scale community fundraisers, we manage every aspect of your event, allowing your team to focus on building relationships with supporters and communicating your mission effectively.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Elegant charity gala with auction items and stage presentation',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Fundraising Event Options',
      content: 'We offer fundraising event production services for a variety of formats:\n\n**Traditional Fundraising Events:**\n- Annual galas and formal dinners\n- Luncheon programs and breakfast fundraisers\n- Award ceremonies and recognition events\n- Auction events (live, silent, and online)\n- Fundraising receptions and cocktail events\n\n**Experiential Fundraisers:**\n- Unique venue experiences and behind-the-scenes access\n- Themed parties and immersive environments\n- Cultural experiences and arts-focused events\n- Celebrity and influencer appearances\n- VIP experiences and exclusive access events\n\n**Active Fundraising Events:**\n- Walks, runs, and athletic challenges\n- Golf tournaments and sporting competitions\n- Dance marathons and performance challenges\n- Community service events with sponsorship\n- Outdoor adventures and excursions\n\n**Entertainment-Based Fundraisers:**\n- Benefit concerts and performances\n- Comedy nights and entertainment showcases\n- Film screenings and premiere events\n- Fashion shows and runway events\n- Celebrity roasts and speaker events\n\nAll fundraising formats can be tailored to your specific audience, mission focus, and revenue goals while incorporating your organization\'s culture and brand identity.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Community fun run fundraiser with participants and sponsors',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'event-details',
      title: 'Fundraising Event Details',
      content: 'Availability: Year-round with 3-6 month lead time recommended\nLocations: Flexible - can be held at your venue or we can source appropriate venues\nPrice: Customized based on event scale, goals, and components\n\nWe structure our pricing to maximize your ROI and net proceeds. Contact us for a consultation to discuss your fundraising goals and event budget.',
      media: [],
      className: 'event-details-section',
    },
    {
      id: 'section-3',
      title: 'Fundraising Event Features',
      content: '- Strategic event design focused on revenue generation\n- Compelling mission moments and impact storytelling\n- Integrated giving opportunities and donation technologies\n- Donor recognition elements and VIP experiences\n- Live and silent auction management\n- Fund-a-need/paddle raise orchestration\n- Corporate sponsorship fulfillment\n- Donor cultivation areas and major gift facilitation\n- Mission-aligned decor and environment design\n- Impact demonstrations and program showcases\n- Beneficiary involvement and testimonials\n- Post-event stewardship opportunities',
      className: 'highlights-section',
    },
    {
      id: 'section-4',
      title: 'Our Fundraising Process',
      content: 'Creating successful fundraisers requires both strategic planning and meticulous execution. Our process includes:\n\n**Goal Setting & Strategic Planning:**\n- Establishing clear financial objectives\n- Identifying target donor audiences\n- Analyzing previous fundraising results\n- Setting ticket prices and sponsorship levels\n- Developing event-specific fundraising strategies\n\n**Revenue Opportunity Design:**\n- Creating strategic giving moments\n- Designing sponsorship packages\n- Developing auction strategies and item acquisition\n- Planning fund-a-need and direct appeal moments\n- Identifying unique revenue enhancement opportunities\n\n**Experience Development:**\n- Creating compelling mission moments\n- Designing impactful program flow\n- Planning hospitality and guest experience\n- Developing pre- and post-event touchpoints\n- Integrating mission elements throughout experience\n\n**Production Management:**\n- Coordinating vendors and partners\n- Managing technical production elements\n- Overseeing venue logistics and guest flow\n- Coordinating staff and volunteer roles\n- Managing risk and contingency planning\n\n**Fundraising Execution & Analysis:**\n- Facilitating day-of giving opportunities\n- Managing live appeal and auction moments\n- Tracking giving results and donor data\n- Processing gifts and acknowledgments\n- Analyzing results and ROI for future planning\n\nOur team brings extensive fundraising event experience to each project, understanding the unique considerations of mission-driven events and the importance of maximizing net revenue while building meaningful donor connections.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Benefit concert fundraiser with stage and audience',
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
    alt: 'Charity gala fundraiser with elegant decor and auction displays',
    width: '1920',
    height: '1080',
  },
  last_updated: '2023-10-15',
};

export default function FundraisersRedirect() {
  redirect('/events/fundraisers');
  return null;
} 