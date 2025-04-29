import { Metadata } from 'next';
import { StandardizedContentData } from '@/app/lib/data-standardization';
import ServiceContent from '@/app/components/content/ServiceContent';

export const metadata: Metadata = {
  title: 'Professional Light Design Services | Emerald Owl Productions',
  description: 'Enhance your event with professionally designed lighting solutions from Emerald Owl Productions. Our lighting experts create immersive experiences for concerts, festivals, corporate events, and more.',
};

export default function LightDesignPage() {
  const content: StandardizedContentData = {
    url: '/services/light-design',
    title: 'Professional Light Design Services',
    route: '/services/light-design',
    meta: {
      description: 'Enhance your event with professionally designed lighting solutions from Emerald Owl Productions.',
      keywords: 'light design, event lighting, professional lighting, stage lighting'
    },
    content: {
      main_text: '<p>Create the perfect ambiance with our professional lighting design services. From subtle mood lighting to dynamic stage effects, we bring your vision to life.</p>',
      sections: []
    },
    featured_image: {
      type: 'image',
      url: '/placeholder.svg',
      alt: 'Professional light design services',
      width: '1200',
      height: '800'
    },
    standardized_sections: [
      {
        id: 'overview',
        title: 'Light Design Overview',
        content: '<p>Our skilled lighting designers create captivating visual environments that transform ordinary spaces into extraordinary experiences. Using state-of-the-art equipment and creative design principles, we develop lighting solutions that enhance the mood, highlight key areas, and create unforgettable moments for your audience.</p><p>Whether you need subtle ambiance for a corporate dinner, dynamic effects for a concert, or themed lighting for a special celebration, our team delivers tailored solutions that exceed expectations.</p>',
        media: [{
          type: 'image',
          url: '/placeholder.svg',
          alt: 'Light design overview',
          width: '800',
          height: '600'
        }]
      },
      {
        id: 'approach',
        title: 'Our Approach',
        content: '<p>Our lighting design process begins with understanding your vision and objectives. We consider factors such as venue architecture, event theme, audience experience, and practical requirements to develop a comprehensive lighting plan that achieves your goals.</p><ul><li>Consultation and concept development</li><li>3D visualization and mood boards</li><li>Technical planning and equipment selection</li><li>On-site installation and programming</li><li>Event-day operation and support</li></ul><p>This methodical approach ensures that every element of your lighting design is carefully considered and flawlessly executed.</p>'
      },
      {
        id: 'services',
        title: 'Light Design Services',
        content: '<p>We offer a complete range of lighting design services for events of all types and sizes:</p><ul><li><strong>Architectural Lighting</strong> - Enhance venue features and create atmosphere</li><li><strong>Stage Lighting</strong> - Professional solutions for performances</li><li><strong>Decorative Lighting</strong> - Creative installations and themed environments</li><li><strong>Dynamic Lighting</strong> - Synchronized light shows and effects</li><li><strong>Outdoor Lighting</strong> - Weather-resistant solutions for exterior spaces</li><li><strong>LED Solutions</strong> - Energy-efficient, versatile options</li></ul><p>Each service can be customized to match your specific requirements and vision.</p>',
        media: [{
          type: 'image',
          url: '/placeholder.svg',
          alt: 'Light design services',
          width: '800',
          height: '600'
        }]
      },
      {
        id: 'equipment',
        title: 'Equipment & Technology',
        content: '<p>We utilize professional-grade lighting equipment from industry-leading manufacturers:</p><ul><li>Intelligent moving heads and spotlights</li><li>LED wash fixtures and color mixing systems</li><li>Architectural lighting tools</li><li>Atmospheric effects (haze, fog)</li><li>DMX controllers and programming interfaces</li><li>Trussing and rigging solutions</li><li>Battery-powered and wireless fixtures</li></ul><p>Our team is continuously trained on the latest lighting technologies, ensuring we bring innovative solutions to every project.</p>'
      },
      {
        id: 'applications',
        title: 'Applications & Event Types',
        content: '<p>Our lighting design services are suitable for a wide range of events and venues:</p><ul><li><strong>Corporate Events</strong> - Conferences, galas, product launches</li><li><strong>Concerts & Festivals</strong> - Stage lighting and audience effects</li><li><strong>Weddings & Celebrations</strong> - Elegant, romantic atmospheres</li><li><strong>Theatrical Productions</strong> - Dramatic lighting for performances</li><li><strong>Trade Shows & Exhibitions</strong> - Booth and display lighting</li><li><strong>Permanent Installations</strong> - Ongoing solutions for venues</li></ul><p>Each application receives specialized attention to meet the unique requirements of the event type.</p>',
        media: [{
          type: 'image',
          url: '/placeholder.svg',
          alt: 'Light design applications',
          width: '800',
          height: '600'
        }]
      }
    ],
    resources: [
      {
        type: 'pdf',
        url: '/resources/light-design-brochure',
        alt: 'Light Design Services Brochure',
        width: '0',
        height: '0'
      }
    ],
    content_type: 'service',
    benefits: [
      {
        title: 'Enhanced Atmosphere',
        description: 'Create the perfect mood and ambiance for your event'
      },
      {
        title: 'Professional Equipment',
        description: 'Access to high-end lighting technology without purchase costs'
      },
      {
        title: 'Creative Design',
        description: 'Unique lighting concepts tailored to your event theme'
      },
      {
        title: 'Technical Expertise',
        description: 'Skilled technicians handle all aspects of setup and operation'
      },
      {
        title: 'Energy Efficiency',
        description: 'Modern LED solutions reduce power consumption'
      }
    ],
    features: [
      {
        title: 'Custom Programming',
        description: 'Choreographed lighting sequences synchronized to your event'
      },
      {
        title: 'Scalable Solutions',
        description: 'Options for events of any size, from intimate gatherings to large productions'
      },
      {
        title: '3D Visualization',
        description: 'Preview your lighting design before the event'
      },
      {
        title: 'Responsive Support',
        description: 'On-site technicians throughout your event'
      }
    ],
    last_updated: '2024-04-27'
  };

  return <ServiceContent content={content} />;
} 