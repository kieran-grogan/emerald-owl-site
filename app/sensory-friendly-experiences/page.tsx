import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import ServiceContent from '../components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Sensory Friendly Experiences | Emerald Owl Productions',
  description: 'Inclusive and accessible entertainment experiences designed for individuals with sensory sensitivities and special needs.',
};

// Simulated content that would normally come from the JSON data
const sensoryFriendlyContent = {
  title: 'Sensory Friendly Experiences',
  meta: {
    title: 'Sensory Friendly Experiences | Emerald Owl Productions',
    description: 'Inclusive sensory experiences designed for individuals with sensory sensitivities - adaptable, accessible, and enjoyable for everyone.',
    keywords: 'sensory friendly, inclusive events, sensory experiences, accessibility, neurodiversity, special needs events, emerald owl productions',
  },
  content: {
    main_text: 'Our Sensory Friendly Experiences are thoughtfully designed to provide engaging and accessible entertainment for individuals with sensory sensitivities, autism spectrum disorders, and other special needs.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Inclusive Entertainment for Everyone',
      content: 'Emerald Owl Productions is committed to creating events that everyone can enjoy. Our Sensory Friendly Experiences are specifically designed with accessibility and inclusivity at their core, providing engaging entertainment options for individuals with sensory processing differences, autism spectrum disorders, and various other special needs.\n\nWith input from specialists in therapeutic recreation and sensory integration, we\'ve developed a range of activities and experiences that can be adapted to different sensory preferences and needs. Our goal is to create environments where everyone feels comfortable, welcomed, and able to participate at their own comfort level.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Children enjoying a sensory-friendly light display',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Customizable Sensory Experiences',
      content: 'We offer a variety of sensory experiences that can be tailored to your specific event and audience needs:\n\n**Gentle Light Displays:**\n- Modified laser and light shows with reduced intensity\n- Adjustable brightness and movement control\n- No rapid flashing or strobing effects\n- Gradual transitions between effects\n\n**Tactile Exploration Zones:**\n- Various texture stations for hands-on interaction\n- Temperature-varying elements\n- Pressure-adjustable activities\n- Clean, organized sensory bins with various materials\n\n**Sound-Managed Spaces:**\n- Volume-controlled audio environments\n- Noise-cancelling headphone stations\n- Sound dampening equipment for venues\n- Music and sound effects with adjustable intensity\n\n**Movement and Proprioceptive Activities:**\n- Body-aware obstacle courses\n- Deep pressure experiences\n- Vestibular-friendly motion activities\n- Adaptable physical challenges\n\nAll experiences can be combined and customized to create the perfect event for your specific audience.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Tactile exploration zone with various textures',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features',
      content: '- Creates truly inclusive events where everyone can participate\n- Provides appropriate sensory stimulation at comfortable levels\n- Offers options for various sensory preferences and needs\n- Staffed by professionals trained in accessibility and inclusion\n- Includes quiet zones for decompression and sensory breaks\n- Features visual schedules and clear signage throughout\n- Offers pre-event social stories and preparation materials\n- Accommodates various mobility needs with accessible setups\n- Provides one-on-one assistance when needed\n- Creates positive experiences for individuals who might otherwise avoid events',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Event Planning & Preparation',
      content: 'Planning a sensory-friendly event requires careful consideration of multiple factors. When you work with us, we provide comprehensive support through each step:\n\n**Pre-Event Preparation:**\n- Venue assessment for sensory considerations\n- Customized social stories and visual schedules\n- Detailed event maps with sensory information\n- Attendee preparation materials\n\n**Staff Training:**\n- Sensitivity and awareness training for all event staff\n- Communication strategies for various needs\n- De-escalation techniques for overwhelm situations\n- Identification of signs of sensory overload\n\n**Environmental Modifications:**\n- Lighting adjustments throughout the venue\n- Sound management systems\n- Clear wayfinding and visual supports\n- Designated quiet/break spaces\n\n**Post-Event Support:**\n- Feedback collection from participants\n- Debriefing and improvement planning\n- Follow-up resources for participants\n\nOur goal is to create not just an accessible event, but a truly enjoyable and meaningful experience for all participants regardless of sensory needs or neurodiversity.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Staff providing assistance at a sensory-friendly event',
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
    alt: 'Inclusive sensory-friendly experience with adaptable lighting',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'sensory-friendly-experiences.json',
  route: '/sensory-friendly-experiences',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Inclusive sensory-friendly experience with adaptable lighting',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Children enjoying a sensory-friendly light display',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Tactile exploration zone with various textures',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Staff providing assistance at a sensory-friendly event',
      width: '800',
      height: '600',
    }
  ]
};

export default function SensoryFriendlyExperiencesRedirect() {
  redirect('/services/sensory-friendly-experiences');
  return null;
} 