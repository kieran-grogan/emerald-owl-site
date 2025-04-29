import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import ServiceContent from '../components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Dripping in Confidence | Emerald Owl Productions',
  description: 'Empower your team or audience with our transformative Dripping in Confidence workshops and experiences - building self-esteem through creative and engaging activities.',
};

// Simulated content that would normally come from the JSON data
const drippingInConfidenceContent = {
  title: 'Dripping in Confidence',
  meta: {
    title: 'Dripping in Confidence | Emerald Owl Productions',
    description: 'A unique motivational experience that builds confidence through symbolic interactive activities - perfect for team building and personal development.',
    keywords: 'confidence building, team building, motivation, personal development, interactive experience, emerald owl productions',
  },
  content: {
    main_text: 'Dripping in Confidence is our signature experience that uses symbolic elements and guided activities to help participants build self-assurance, overcome personal barriers, and develop a positive mindset.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'A Transformative Experience',
      content: 'Dripping in Confidence is a unique program that combines motivational elements with interactive experiences to help participants develop self-assurance and a positive outlook. The experience uses the symbolic act of being "drenched" in colorful, washable substances as a metaphor for embracing challenges and emerging stronger.\n\nThis immersive program is led by our certified facilitators who guide participants through a series of activities designed to push comfort zones, challenge limiting beliefs, and foster a growth mindset. The physical experience of "getting messy" serves as a powerful symbol for breaking through personal barriers.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Participants celebrating during a Dripping in Confidence workshop',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Program Components',
      content: 'Our Dripping in Confidence experience includes several key components:\n\n- **Interactive Workshops:** Guided sessions focused on identifying limiting beliefs and developing confidence strategies\n\n- **Symbolic Activities:** Physical challenges that represent personal hurdles, culminating in the signature "confidence splash"\n\n- **Team Building Exercises:** Collaborative activities that build trust and communication skills\n\n- **Reflection Sessions:** Structured time to process experiences and identify actionable insights\n\n- **Follow-up Resources:** Digital materials to help participants maintain momentum after the event\n\nEach program is customized to the specific needs and goals of your group, whether it\'s a corporate team, youth organization, or community group.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Team building exercise during Dripping in Confidence program',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Develops lasting confidence and self-assurance in participants\n- Creates a memorable shared experience that strengthens team bonds\n- Provides practical strategies for overcoming self-doubt and fear\n- Uses physical metaphors to reinforce psychological concepts\n- Delivers proven techniques backed by positive psychology research\n- Creates a safe environment for personal growth and exploration\n- Facilitated by certified coaches with extensive experience\n- Customizable to address specific challenges faced by your team\n- Includes pre-program assessment and post-program support\n- Accommodates various group sizes and physical ability levels',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Who Can Benefit',
      content: 'Dripping in Confidence is ideal for a variety of groups and organizations:\n\n**Corporate Teams:**\n- Sales teams needing to build resilience\n- Leadership groups developing confidence\n- Departments going through change or challenges\n- New teams working to build connection\n\n**Educational Groups:**\n- High school students preparing for transitions\n- College organizations developing leadership\n- Faculty professional development\n\n**Community Organizations:**\n- Youth groups and camps\n- Adult development programs\n- Community outreach initiatives\n\nWe offer specialized versions of the program for different age groups, including youth-focused programs that emphasize age-appropriate activities and messaging.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Corporate team participating in Dripping in Confidence workshop',
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
    alt: 'Participants celebrating after completing Dripping in Confidence experience',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'dripping-in-confidence.json',
  route: '/dripping-in-confidence',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Participants celebrating after completing Dripping in Confidence experience',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Participants celebrating during a Dripping in Confidence workshop',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Team building exercise during Dripping in Confidence program',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Corporate team participating in Dripping in Confidence workshop',
      width: '800',
      height: '600',
    }
  ]
};

export default function DrippingInConfidenceRedirect() {
  redirect('/services/dripping-in-confidence');
  return null;
} 