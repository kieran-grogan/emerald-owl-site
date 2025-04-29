import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Sensory Friendly Experiences | Emerald Owl Productions',
  description: 'Inclusive entertainment and event experiences designed for individuals with sensory sensitivities and special needs. Create accessible, enjoyable events for all participants.',
};

export default function SensoryFriendlyPage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Sensory Friendly Experiences",
    url: "/services/sensory-friendly-experiences",
    route: "/services/sensory-friendly-experiences",
    meta: {
      description: "Inclusive entertainment and event experiences designed for individuals with sensory sensitivities and special needs. Create accessible, enjoyable events for all participants.",
      keywords: "sensory friendly, special needs events, inclusive entertainment, accessible experience, autism-friendly events"
    },
    content: {
      main_text: "Our sensory-friendly experiences make entertainment accessible to everyone. We design engaging, inclusive events that accommodate individuals with sensory sensitivities, autism spectrum disorders, and other special needs, ensuring everyone can participate and enjoy.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Sensory friendly light display at an inclusive event",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions is committed to making entertainment accessible to all audiences. Our sensory-friendly experiences are thoughtfully designed to create enjoyable, comfortable environments for individuals with sensory sensitivities, autism spectrum disorders, and other special needs. By modifying standard entertainment elements while maintaining engagement and excitement, we ensure that everyone can participate in meaningful ways during your event. Our team works closely with specialists to implement best practices in accessibility and inclusion."
      },
      {
        id: "approach",
        title: "Our Inclusive Approach",
        content: "We begin by understanding the specific needs of your audience, consulting with occupational therapists and special education professionals when needed. Every element of the experience is carefully planned to minimize potential triggers while maximizing engagement. We create detailed sensory maps of the venue, establish quiet zones, provide visual schedules, and train all staff in appropriate interaction techniques. Our goal is to create an environment where everyone feels welcomed, understood, and able to participate at their own comfort level."
      },
      {
        id: "features",
        title: "Sensory-Friendly Features",
        content: "• Modified lighting with reduced flashing and intensity\n• Sound management with controlled volume and frequency ranges\n• Sensory-considerate special effects\n• Quiet zones and decompression spaces\n• Visual schedules and social stories\n• Trained support staff\n• Sensory kits with fidgets, headphones, and other tools\n• Accessible seating arrangements\n• Clear signage and communication\n• Extended entry/exit times to avoid crowding\n• Flexible participation options"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Family entertainment events\n• School and community activities\n• Holiday celebrations and festivals\n• Theater and performance experiences\n• Museum and educational exhibits\n• Corporate family days\n• Fundraisers and awareness events\n• Birthday parties and private celebrations\n• Community festivals and gatherings"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Customized Experiences: Each event is tailored to the specific audience and venue, with careful attention to individual needs.\n- Professional Consultation: Development work with occupational therapists and special education experts.\n- Staff Training: All team members receive specialized training in supporting participants with diverse needs.\n- Accommodation Without Compromise: Experiences that maintain excitement and engagement while removing barriers to participation.\n- Comprehensive Planning: Detailed pre-event preparation including venue assessment, accessibility mapping, and personalized accommodations."
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Custom quotes based on event scope, accommodations required, and duration\nTypical Duration: Flexible to accommodate varying attention spans and comfort levels\nLead Time: Minimum 4 weeks recommended for proper planning and preparation\nService Area: Available nationwide with travel fees applicable for locations outside our region\nAccommodation Requests: Specific accommodations can be arranged with advance notice\nPre-Event Support: Social stories and preparation materials provided to participants"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Child enjoying a sensory-friendly light display",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 