import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Lighting Design | Emerald Owl Productions',
  description: 'Custom lighting design services for events, venues, and productions. Create the perfect atmosphere with our professional lighting solutions for concerts, corporate events, weddings, and theatrical productions.',
};

export default function LightingDesignPage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Lighting Design",
    url: "/services/lighting-design",
    route: "/services/lighting-design",
    meta: {
      description: "Custom lighting design services for events, venues, and productions. Create the perfect atmosphere with our professional lighting solutions for concerts, corporate events, weddings, and theatrical productions.",
      keywords: "lighting design, event lighting, stage lighting, architectural lighting, mood lighting, LED lighting"
    },
    content: {
      main_text: "Transform any space with sophisticated lighting design that creates the perfect atmosphere for your event. Our expert lighting designers combine technical precision with artistic vision to enhance your venue's architecture and elevate your event experience.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Professional event lighting design",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions specializes in creating immersive environments through expert lighting design. We understand how lighting shapes perception, influences mood, and highlights key elements of your event. From subtle ambient washes to dynamic stage productions, our lighting design services transform ordinary spaces into extraordinary experiences, perfectly aligned with your event's goals and aesthetic vision."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "Our design process begins with understanding your event's purpose, audience, and desired atmosphere. We conduct a thorough venue assessment, examining architectural features, power capabilities, and existing infrastructure. Our designers then create detailed lighting plots and visual concepts for your approval. During installation, our technicians meticulously position and program each fixture, ensuring precise focus and color. Throughout your event, our lighting operators execute cues with perfect timing, responding to the dynamic nature of live events."
      },
      {
        id: "features",
        title: "Features & Equipment",
        content: "• Intelligent moving fixtures for dynamic effects\n• LED color-changing systems for energy-efficient ambient lighting\n• Conventional lighting for precise control and warm tones\n• Architectural lighting to highlight venue features\n• Specialized fixtures (gobos, hazers, followspots)\n• DMX-controlled systems with sophisticated programming\n• Wireless DMX options for difficult installations\n• Energy-efficient options for sustainable events"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Corporate events and galas\n• Weddings and social celebrations\n• Theatrical productions\n• Concert and festival stages\n• Product launches\n• Fashion shows\n• Museum and gallery exhibitions\n• Architectural and permanent installations"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Customized Design: Lighting solutions tailored to your specific event theme and venue architecture\n- Mood Enhancement: Strategic use of color, intensity, and movement to create atmosphere and emotional impact\n- Dynamic Programming: Timed lighting changes that evolve throughout your event to support different phases\n- Technical Excellence: Flawless execution through proper equipment selection and experienced operation\n- Energy Efficiency: LED technology options that reduce power consumption while maintaining visual impact"
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Custom quotes based on design complexity, equipment requirements, and event duration\nTypical Timeline: Design process begins 3-8 weeks before event; installation 1-3 days before\nLead Time: Minimum 3 weeks advance booking; 6+ weeks recommended for complex designs\nService Area: Primary service in Washington state with nationwide capabilities for select projects"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Professional lighting design setup",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 