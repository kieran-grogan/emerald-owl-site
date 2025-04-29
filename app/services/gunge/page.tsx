import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Gunge Experience | Emerald Owl Productions',
  description: 'Exciting and messy gunge experiences for events, game shows, and fundraisers. Custom-designed setups with premium, safe materials that bring excitement and laughter to any event.',
};

export default function GungePage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Gunge Experience",
    url: "/services/gunge",
    route: "/services/gunge",
    meta: {
      description: "Exciting and messy gunge experiences for events, game shows, and fundraisers. Custom-designed setups with premium, safe materials that bring excitement and laughter to any event.",
      keywords: "gunge, slime, game show, charity events, fundraisers, messy games"
    },
    content: {
      main_text: "Add a splash of colorful excitement to your event with our premium gunge experiences. Whether for a charity fundraiser, television production, or corporate team building, our custom gunge setups create memorable, messy moments that audiences love.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Gunge tank setup at event",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions offers professional gunge experiences that bring excitement, laughter, and memorable moments to any event. Our gunge setups are custom-designed to match your event theme and objectives, using premium, safe materials that are both visually striking and gentle on participants. From charity fundraisers to corporate team building, our gunge experiences create engaging entertainment that participants and audiences will talk about long after your event."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "We begin with understanding your event goals, audience demographics, and venue constraints. Our team then designs a gunge experience that fits your specific needs, from simple setups to elaborate productions. We handle all aspects of preparation, operation, and cleanup, allowing you to focus on enjoying the fun. All our gunge formulations are non-toxic, skin-friendly, and environmentally responsible, with options for various colors, textures, and special effects to match your event theme."
      },
      {
        id: "features",
        title: "Features & Options",
        content: "• Custom gunge tanks and dumping mechanisms\n• Variety of colors and special effects (glitter, confetti, etc.)\n• Hypoallergenic, skin-safe formulations\n• Themed setups (game shows, branded experiences, etc.)\n• Professional operation and hosting available\n• Comprehensive setup and cleanup services\n• Waterproof participant protection (when requested)\n• Photography/videography services to capture moments\n• Temperature-controlled options for comfort\n• Indoor and outdoor capabilities"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Charity fundraisers and challenges\n• School carnivals and celebrations\n• Corporate team building events\n• Television and media productions\n• Birthday parties and celebrations\n• Festival attractions and entertainment\n• Youth group activities\n• Brand activations and promotional events"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Premium Experience: High-quality materials and professional equipment that elevate the standard gunge experience.\n- Safety Focus: All materials tested and certified safe for skin contact with clear participant instructions.\n- Complete Solution: Full service from design to cleanup with minimal venue impact.\n- Customizable: Fully adaptable to your event theme, branding, and audience preferences.\n- Entertainment Value: Creates high-energy, shareable moments that engage both participants and spectators."
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Based on setup complexity, participant numbers, and event duration\nTypical Duration: Available for single drops or full-day events\nLead Time: Minimum 2 weeks advance booking; 4 weeks recommended for custom setups\nService Area: Available nationwide with travel fees applied outside of regional service area\nCleanup: Complete cleanup included in all packages\nParticipant Requirements: Minimum age restrictions apply; waivers required"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Gunge experience at charity event",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 