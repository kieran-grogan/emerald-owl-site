import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';

export const metadata: Metadata = {
  title: 'Equipment Rental | Emerald Owl Productions',
  description: 'Professional audio, video, and lighting equipment available for rent. From single microphones to complete production setups, we provide high-quality gear for events of any size.',
};

export default function EquipmentRentalPage() {
  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Equipment Rental",
    url: "/services/equipment-rental",
    route: "/services/equipment-rental",
    meta: {
      description: "Professional audio, video, and lighting equipment available for rent. From single microphones to complete production setups, we provide high-quality gear for events of any size.",
      keywords: "equipment rental, audio rental, video rental, lighting rental, event equipment, production equipment"
    },
    content: {
      main_text: "Access professional-grade production equipment without the commitment of ownership. Our comprehensive rental inventory includes high-quality audio, video, and lighting equipment to meet the technical requirements of any event or production.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Professional equipment rental inventory",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions offers a comprehensive equipment rental service providing professional-grade audio, video, and lighting gear for events and productions of all sizes. Our inventory features well-maintained, industry-standard equipment that delivers reliable performance. Whether you need a single microphone or a complete production setup, our rental service provides cost-effective access to high-quality equipment, backed by technical support from our experienced team."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "We take a consultative approach to equipment rental, helping you identify the right gear for your specific needs. Our team can advise on equipment selection based on your venue, audience size, and technical requirements. We provide detailed equipment specifications, setup instructions, and phone support for all rentals. For more complex setups, we offer optional technical support services, including delivery, setup, operation, and pickup, ensuring your event runs smoothly even if you lack technical expertise."
      },
      {
        id: "features",
        title: "Equipment Categories",
        content: "• Audio: Speakers, amplifiers, mixers, microphones, in-ear monitoring, processors\n• Video: Projectors, screens, cameras, switching systems, media servers\n• Lighting: Stage lights, architectural fixtures, control consoles, truss systems\n• Staging: Portable stages, podiums, pipe and drape, dance floors\n• Power: Generators, distribution systems, cables and adapters\n• Specialty: Fog machines, bubble machines, confetti cannons, special effects"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Corporate meetings and conferences\n• Live music performances\n• Theater productions\n• Weddings and social events\n• Film and video production\n• Worship services\n• Trade shows and exhibitions\n• Educational presentations"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Comprehensive Inventory: Wide selection of professional equipment to meet diverse needs\n- Flexible Rental Periods: Daily, weekend, weekly, and monthly rates available\n- Technical Support: Optional setup, operation, and troubleshooting services\n- Equipment Packages: Pre-configured systems for common applications\n- Regular Maintenance: All equipment is tested and serviced between rentals\n- Delivery Available: Optional delivery and pickup for your convenience"
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Daily, weekend, weekly, and monthly rates based on equipment type and quantity\nSecurity Deposit: Required for all rentals, fully refundable upon equipment return in original condition\nLead Time: 48-hour minimum notice recommended; 1-2 weeks for large equipment packages\nReservation Policy: 50% deposit required to confirm reservation\nService Area: Pickup available from our Washington state location; delivery available within 150-mile radius"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Professional audio, video, and lighting equipment for rent",
      width: "1920",
      height: "1080"
    }
  };

  return <ServiceContent content={content} />;
} 