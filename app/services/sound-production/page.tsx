import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Sound Production | Emerald Owl Productions',
  description: 'Professional sound production services for events of any size. High-quality audio equipment, experienced sound engineers, and custom solutions for concerts, corporate events, and private functions.',
};

export default function SoundProductionPage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Sound Production",
    url: "/services/sound-production",
    route: "/services/sound-production",
    meta: {
      description: "Professional sound production services for events of any size. High-quality audio equipment, experienced sound engineers, and custom solutions for concerts, corporate events, and private functions.",
      keywords: "sound production, audio services, sound engineering, event sound, live sound, audio equipment rental"
    },
    content: {
      main_text: "Elevate your event with crystal-clear audio that captivates your audience. Our professional sound production services combine top-quality equipment with experienced engineers to deliver exceptional audio experiences.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Professional sound system setup",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions delivers premium sound production services for events of all sizes. Whether you're hosting an intimate gathering or a large-scale concert, our team ensures every word, note, and sound is delivered with clarity and impact. We pride ourselves on providing technically excellent and aesthetically pleasing audio solutions that enhance your event's overall experience."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "We begin each project with a detailed consultation to understand your event's specific audio requirements. Our team conducts a thorough venue assessment, considering acoustics, audience size, and program content. Based on this analysis, we design a custom sound system configuration, select appropriate equipment, and develop a technical plan. During your event, our experienced sound engineers actively manage audio levels and quality, ensuring a flawless sound experience from start to finish."
      },
      {
        id: "features",
        title: "Features & Equipment",
        content: "• Line array speaker systems for clear, even coverage\n• Digital mixing consoles with advanced processing capabilities\n• Professional wireless microphone systems\n• In-ear monitoring solutions for performers\n• Digital signal processors and effects\n• Complete backline equipment (instruments and amplifiers)\n• Redundant power and signal paths for reliability\n• Recording capabilities for live events"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Live music performances and concerts\n• Corporate events and conferences\n• Theatrical productions\n• Wedding ceremonies and receptions\n• Public speaking events and presentations\n• Religious services\n• Outdoor festivals\n• Sporting events"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Tailored Solutions: Custom audio designs to match your specific venue and event needs\n- Expert Engineering: Experienced sound technicians who understand the nuances of live sound\n- Premium Equipment: High-end, well-maintained audio gear from industry-leading manufacturers\n- Comprehensive Support: From initial planning through to event completion\n- Multi-zone Audio: Capability to provide different audio experiences in separate areas of your venue"
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Custom quotes based on event duration, equipment needs, and technical requirements\nTypical Duration: Single-day events to multi-day festivals\nLead Time: Minimum 2 weeks advance booking recommended; 4+ weeks for complex productions\nService Area: Available throughout Washington state with additional travel fees for locations beyond"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Professional sound production setup",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 