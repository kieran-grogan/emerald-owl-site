import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Dripping in Confidence | Emerald Owl Productions',
  description: 'Empower your team or audience with our transformative Dripping in Confidence workshops and experiences - building self-esteem through creative and engaging activities.',
};

export default function DrippingInConfidencePage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: 'Dripping in Confidence',
    meta: {
      description: 'Empower your team or audience with our transformative Dripping in Confidence workshops and experiences - building self-esteem through creative and engaging activities.',
      keywords: 'confidence workshop, self-esteem building, empowerment experience, team confidence, motivational event, emerald owl productions',
    },
    content: {
      main_text: 'Our Dripping in Confidence programs combine proven psychological techniques with creative activities to help participants develop lasting self-assurance and personal growth. Through dynamic workshops and tailored experiences, we create environments where confidence can flourish.',
      sections: [],
    },
    standardized_sections: [
      {
        id: 'section-1',
        title: 'The Power of Confidence',
        content: 'Emerald Owl Productions has developed a unique approach to confidence building that goes beyond typical motivational speaking or team-building exercises. Our Dripping in Confidence program creates a supportive environment where participants are guided through a progressive series of activities designed to challenge limiting beliefs and build genuine self-assurance.\n\nLed by certified facilitators with backgrounds in psychology, performance arts, and organizational development, our workshops address confidence from multiple dimensions: physical presence, verbal communication, emotional resilience, and mindset transformation.',
        media: [
          {
            type: 'image',
            url: '/images/placeholder.svg',
            alt: 'Confidence workshop facilitator working with a group',
            width: '800',
            height: '600',
          }
        ],
        className: '',
      },
      {
        id: 'section-2',
        title: 'Program Components',
        content: 'Our Dripping in Confidence programs can be customized but typically include these core elements:\n\n- **Confidence Baseline Assessment**: Identifying current confidence levels and specific areas for growth\n- **Body Language Transformation**: Techniques for projecting confidence through posture, movement, and presence\n- **Voice and Communication Mastery**: Developing powerful verbal expression and active listening skills\n- **Fear Conquering Activities**: Safe challenges designed to expand comfort zones and build resilience\n- **Mindset Reframing Workshops**: Cognitive techniques to identify and transform limiting beliefs\n- **Practical Application Scenarios**: Role-playing and real-world simulations to practice new skills\n- **Personalized Confidence Toolkits**: Customized resources for ongoing development\n- **Follow-up Support**: Resources and check-ins to ensure lasting results\n\nAll components are adapted to your group\'s specific needs, goals, and comfort levels.',
        media: [
          {
            type: 'image',
            url: '/images/placeholder.svg',
            alt: 'Interactive confidence building exercise',
            width: '800',
            height: '600',
          }
        ],
        className: '',
      },
      {
        id: 'section-3',
        title: 'Benefits & Features',
        content: '- Creates profound personal transformation with lasting results\n- Builds genuine confidence from the inside out\n- Improves communication effectiveness across all contexts\n- Enhances professional presence and leadership potential\n- Reduces social anxiety and performance stress\n- Strengthens team cohesion and psychological safety\n- Increases willingness to contribute ideas and take initiative\n- Improves resilience when facing challenges\n- Supports diversity and inclusion by empowering all voices\n- Provides measurable outcomes with pre/post assessments',
        className: '',
      },
      {
        id: 'section-4',
        title: 'Applications',
        content: 'Dripping in Confidence programs are valuable for a wide range of organizations and contexts:\n\n- **Corporations and Businesses**: Enhancing employee confidence for better performance, leadership development, and team cohesion\n- **Educational Institutions**: Supporting students in developing self-esteem and presentation skills\n- **Non-profit Organizations**: Empowering staff and those they serve with confidence-building tools\n- **Healthcare Settings**: Helping patients build resilience during recovery or life transitions\n- **Performance Groups**: Enhancing stage presence and audition confidence for performers\n- **Youth Programs**: Developing confidence in young people during formative years\n- **Professional Conferences**: Delivering high-impact keynotes and breakout sessions\n- **Individual Coaching**: One-on-one confidence building for executives and professionals\n\nPrograms are customized to address the specific confidence challenges relevant to your organization and participants.',
        media: [
          {
            type: 'image',
            url: '/images/placeholder.svg',
            alt: 'Corporate team participating in confidence workshop',
            width: '800',
            height: '600',
          }
        ],
        className: '',
      },
      {
        id: 'section-5',
        title: 'Program Formats',
        content: 'We offer several formats to accommodate different needs and objectives:\n\n**Single-Day Intensive (6-8 hours)**\nA comprehensive one-day workshop covering essential confidence-building techniques and providing immediate tools for implementation.\n\n**Multi-Session Series (2-6 sessions)**\nSpaced sessions allowing for practice and integration between meetings, creating deeper transformation and habit formation.\n\n**Half-Day Workshop (3-4 hours)**\nA focused introduction to key confidence principles, ideal for conferences or as part of a larger event.\n\n**Executive Confidence Retreat (1-3 days)**\nImmersive experience for leadership teams combining confidence building with strategic planning and vision work.\n\n**Virtual Programs**\nAll programs can be adapted for online delivery with interactive digital tools and materials shipped to participants.',
        className: '',
      },
    ],
    featured_image: {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Diverse group participating in a Dripping in Confidence workshop',
      width: '1920',
      height: '1080',
    },
    content_type: 'service',
    url: '/services/dripping-in-confidence',
    route: '/services/dripping-in-confidence',
    resources: [
      {
        type: 'image',
        url: '/images/placeholder.svg',
        alt: 'Diverse group participating in a Dripping in Confidence workshop',
        width: '1920',
        height: '1080',
      },
      {
        type: 'image',
        url: '/images/placeholder.svg',
        alt: 'Confidence workshop facilitator working with a group',
        width: '800',
        height: '600',
      },
      {
        type: 'image',
        url: '/images/placeholder.svg',
        alt: 'Interactive confidence building exercise',
        width: '800',
        height: '600',
      },
      {
        type: 'image',
        url: '/images/placeholder.svg',
        alt: 'Corporate team participating in confidence workshop',
        width: '800',
        height: '600',
      }
    ]
  };

  return <ServiceContent content={content} />;
} 