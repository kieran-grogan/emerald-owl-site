import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Do It Now | Emerald Owl Productions',
  description: 'High-energy motivational experiences designed to inspire action and breakthrough moments at corporate events, retreats, and team building sessions.',
};

export default function DoItNowPage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Do It Now Experience",
    url: "/services/do-it-now",
    route: "/services/do-it-now",
    meta: {
      description: "High-energy motivational experiences designed to inspire action and breakthrough moments at corporate events, retreats, and team building sessions.",
      keywords: "motivation, team building, corporate events, breakthrough experiences, transformational events"
    },
    content: {
      main_text: "Our Do It Now Experience creates powerful breakthrough moments that inspire immediate action and lasting change. Through a combination of immersive elements, physical challenges, and motivational techniques, we help participants break through barriers and commit to meaningful change.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Group breakthrough moment at Do It Now event",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "The Do It Now Experience is a transformative event designed to help individuals and teams overcome limiting beliefs, build confidence, and take decisive action. By combining physical challenges, motivational psychology, and immersive production elements, we create powerful breakthrough moments that inspire participants to make significant changes in their personal and professional lives. Each experience is customized to address specific goals and obstacles, whether for corporate teams, sales organizations, leadership groups, or individuals seeking personal growth."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "Our methodology combines proven psychological techniques with theatrical production elements to create emotionally charged experiences. We begin with a detailed consultation to understand your organization's culture, challenges, and objectives. We then design a custom Do It Now Experience that addresses specific limiting beliefs and creates opportunities for meaningful breakthroughs. Our facilitators guide participants through a carefully structured progression of exercises, building toward peak moments of transformation. Throughout the experience, we incorporate music, lighting, and environmental elements that amplify emotional impact and reinforce key messages."
      },
      {
        id: "features",
        title: "Experience Features",
        content: "• Progressive physical challenges tailored to group capabilities\n• Breakthrough ceremonies with symbolic obstacles\n• Custom motivational soundtracks and lighting\n• Professional facilitation by trained coaches\n• Video capture of breakthrough moments\n• Personalized affirmation development\n• Group energy-building exercises\n• Immersive environmental design\n• Commitment rituals and accountability tools\n• Post-event support materials\n• Follow-up resources and implementation guides"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Corporate retreats and team building\n• Sales kickoff events and motivation sessions\n• Leadership development programs\n• Product launches and new initiatives\n• Organizational change management\n• Personal development workshops\n• Performance improvement programs\n• Annual meetings and conventions\n• Executive coaching enhancements"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Immediate Impact: Creates powerful moments that inspire action rather than just motivation.\n- Customized Content: All exercises and messaging align with your organization's specific goals and culture.\n- Evidence-Based: Uses proven psychological techniques from behavioral science and peak performance research.\n- Production Excellence: Professional-grade sound, lighting, and environmental design amplify the experience.\n- Sustainable Results: Includes follow-up resources to maintain momentum after the initial experience."
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Based on group size, customization level, and production requirements\nTypical Duration: Half-day to full-day experiences available\nLead Time: Minimum 4 weeks for proper customization and preparation\nGroup Size: Effective for groups from 10 to 500+ participants\nVenue Requirements: Indoor space with specific dimensions based on group size\nPhysical Considerations: Adaptable to various fitness and ability levels\nFollow-up: Optional reinforcement sessions and materials available"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Breakthrough moment at corporate Do It Now experience",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 