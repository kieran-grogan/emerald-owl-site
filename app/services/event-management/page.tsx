import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Event Management | Emerald Owl Productions',
  description: 'Comprehensive event planning and coordination services for corporate events, private celebrations, and public gatherings. From concept to execution, our team handles every detail for a seamless event experience.',
};

export default function EventManagementPage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Event Management",
    url: "/services/event-management",
    route: "/services/event-management",
    meta: {
      description: "Comprehensive event planning and coordination services for corporate events, private celebrations, and public gatherings. From concept to execution, our team handles every detail for a seamless event experience.",
      keywords: "event management, event planning, event coordination, corporate events, private celebrations, event production"
    },
    content: {
      main_text: "Bring your vision to life with our comprehensive event management services. From initial concept to flawless execution, our experienced team handles every detail, allowing you to focus on enjoying your event and connecting with your guests.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Professional event management",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions provides end-to-end event management services that transform your ideas into exceptional experiences. Our team of event professionals combines creative vision with meticulous planning to deliver seamless, memorable events. Whether you're hosting a corporate conference, private celebration, or public gathering, we manage all aspects of your event, ensuring that every detail aligns with your goals and exceeds your expectations."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "We begin with a detailed consultation to understand your vision, objectives, audience, and budget. Based on this foundation, we develop a comprehensive event strategy and implementation plan. Our team handles vendor selection and management, location scouting, contract negotiations, timeline development, and logistical planning. During the event, our on-site coordinators manage all operations, troubleshoot issues, and ensure a smooth guest experience. Post-event, we provide detailed reporting and analysis to measure success against your objectives."
      },
      {
        id: "features",
        title: "Features & Services",
        content: "• Strategic event planning and concept development\n• Venue selection and contract negotiation\n• Vendor coordination and management\n• Budget development and tracking\n• Guest list management and RSVP tracking\n• Timeline creation and schedule management\n• On-site coordination and troubleshooting\n• Post-event evaluation and reporting"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Corporate conferences and meetings\n• Product launches and brand activations\n• Galas and fundraising events\n• Award ceremonies\n• Weddings and social celebrations\n• Company retreats and team-building events\n• Public festivals and community gatherings\n• Grand openings and milestone celebrations"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Comprehensive Management: End-to-end service from concept to execution\n- Streamlined Communication: Single point of contact for all event elements\n- Stress Reduction: Professional handling of logistics, timing, and vendor management\n- Creative Solutions: Innovative approaches to maximize impact within budget constraints\n- Attention to Detail: Meticulous planning ensures nothing is overlooked"
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Custom quotes based on event scope, complexity, and level of service required\nTypical Timeline: 3-12 months of planning (varies by event size and complexity)\nLead Time: Minimum 3 months advance booking recommended; 6-12 months for large-scale events\nService Area: Primary service in Washington state with capabilities to manage events nationwide"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Professional event management team in action",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 