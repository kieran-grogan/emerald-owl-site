import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import ServiceContent from '../components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Do It Now | Emerald Owl Productions',
  description: 'Actionable coaching and productivity services to help individuals and teams overcome procrastination and achieve their goals effectively.',
};

// Simulated content that would normally come from the JSON data
const doItNowContent = {
  title: 'Do It Now',
  meta: {
    title: 'Do It Now | Emerald Owl Productions',
    description: 'Motivational experiences that inspire immediate action and positive change - perfect for corporate events, schools, and community programs.',
    keywords: 'motivation, inspirational events, action-oriented, personal development, team building, emerald owl productions',
  },
  content: {
    main_text: 'Do It Now is our flagship motivational experience that empowers participants to take immediate action toward their goals. Through immersive activities, compelling storytelling, and interactive challenges, we inspire lasting positive change.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Inspiration in Action',
      content: 'Do It Now is more than just a motivational program—it\'s a transformative experience designed to overcome procrastination and inspire immediate positive action. This unique service combines powerful storytelling, interactive activities, and practical tools that participants can implement right away.\n\nUnlike traditional motivational programs that create temporary excitement, Do It Now is designed to create lasting behavior change through a proven methodology that addresses the psychological barriers to taking action. Our approach combines elements of positive psychology, behavior design, and neurological research with engaging, high-energy activities.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Participants engaged in a Do It Now workshop activity',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Program Components',
      content: 'The Do It Now experience can be customized for your specific audience and objectives, but typically includes these core components:\n\n**Motivational Kickoff:**\n- High-energy multimedia presentation\n- Compelling real-life success stories\n- Interactive audience engagement\n\n**Barrier-Breaking Activities:**\n- Symbolic challenges that represent personal obstacles\n- Team-based action competitions\n- Immediate goal-setting and accountability pairing\n\n**Implementation Workshop:**\n- Action planning with structured templates\n- Microcommitment creation and public declarations\n- Obstacle pre-emption strategies\n\n**Follow-Through System:**\n- Digital accountability platform\n- 30-day action challenge\n- Progress tracking tools\n- Recurring motivation triggers\n\nEach program concludes with a powerful commitment ceremony that anchors the experience and creates momentum for immediate action after the event.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Group commitment ceremony at Do It Now event',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Creates immediate momentum and action on important goals\n- Breaks through procrastination patterns and mental blocks\n- Provides practical tools that can be applied right away\n- Builds accountability systems that support long-term success\n- Energizes teams and creates shared commitment to results\n- Measurable outcomes with before/after action metrics\n- Adaptable to various organizational goals and challenges\n- Combines entertainment value with substantive content\n- Led by certified facilitators with proven track records\n- Includes comprehensive materials and follow-up resources',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Applications & Audiences',
      content: 'Our Do It Now program can be tailored for a variety of contexts:\n\n**Corporate Settings:**\n- Sales team motivation and goal achievement\n- Project launch acceleration\n- Change management initiatives\n- Leadership development programs\n- Annual kickoff events and strategic planning sessions\n\n**Educational Environments:**\n- Student success programs\n- College orientation programs\n- Faculty professional development\n- Graduation transition preparation\n\n**Personal Development:**\n- Entrepreneurship bootcamps\n- Life coaching groups\n- Health and wellness programs\n- Career transition support\n\nWe offer various program formats ranging from 90-minute keynote experiences to full-day workshops and multi-day retreats. Each format includes the core Do It Now methodology with appropriate depth and application for the time available.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Corporate team participating in Do It Now workshop',
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
    alt: 'Energetic Do It Now keynote with audience participation',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'do-it-now.json',
  route: '/do-it-now',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Energetic Do It Now keynote with audience participation',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Participants engaged in a Do It Now workshop activity',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Group commitment ceremony at Do It Now event',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Corporate team participating in Do It Now workshop',
      width: '800',
      height: '600',
    }
  ]
};

export default function DoItNowRedirect() {
  redirect('/services/do-it-now');
  return null;
} 