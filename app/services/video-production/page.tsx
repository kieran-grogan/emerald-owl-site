import { Metadata } from 'next';
import ServiceContent from '@/app/components/content/ServiceContent';
import { StandardizedContentData } from '@/app/lib/data-standardization';
import { BenefitOrFeature } from '@/app/lib/benefits-features';

export const metadata: Metadata = {
  title: 'Video Production | Emerald Owl Productions',
  description: 'Professional video production services for events, marketing, and corporate needs. From concept to final edit, our team creates compelling visual content that tells your story.',
};

export default function VideoProductionPage() {
  // Define benefits for video production
  const benefits: BenefitOrFeature[] = [
    {
      title: 'Increased Engagement',
      description: 'Video content captures attention and drives higher engagement rates than text or static images alone'
    },
    {
      title: 'Improved Brand Perception',
      description: 'Professional video enhances your brand credibility and showcases attention to quality'
    },
    {
      title: 'Clear Communication',
      description: 'Complex messages become more accessible and memorable through visual storytelling'
    },
    {
      title: 'Versatile Content',
      description: 'Videos can be repurposed across multiple platforms and marketing channels'
    },
    {
      title: 'Measurable Results',
      description: 'Track engagement metrics and conversion rates from your video content'
    }
  ];

  // Define features for video production
  const features: BenefitOrFeature[] = [
    {
      title: 'Full-Service Production',
      description: 'End-to-end services from concept development to final delivery'
    },
    {
      title: '4K and 6K Resolution',
      description: 'Ultra-high-definition filming capabilities for exceptional clarity and detail'
    },
    {
      title: 'Professional Sound Design',
      description: 'High-quality audio recording, editing, and mixing for crystal-clear sound'
    },
    {
      title: 'Drone Aerial Footage',
      description: 'Breathtaking aerial perspectives to enhance your visual storytelling'
    },
    {
      title: 'Motion Graphics',
      description: 'Custom animations and graphics to enhance your video content'
    },
    {
      title: 'Multi-Camera Setup',
      description: 'Capture events from multiple angles for dynamic and engaging editing'
    }
  ];

  // Create content in the format expected by ServiceContent
  const content: StandardizedContentData = {
    title: "Video Production",
    url: "/services/video-production",
    route: "/services/video-production",
    meta: {
      description: "Professional video production services for events, marketing, and corporate needs. From concept to final edit, our team creates compelling visual content that tells your story.",
      keywords: "video production, event videography, corporate video, marketing video, video editing, post-production"
    },
    content: {
      main_text: "Capture your vision with professional video production that tells your story with clarity and impact. From initial concept to final delivery, our experienced team creates high-quality video content designed to engage your audience and achieve your communication goals.",
      sections: []
    },
    content_type: "service",
    resources: [
      {
        type: "image",
        url: "/placeholder.svg",
        alt: "Professional video production setup",
        width: "1200",
        height: "800"
      }
    ],
    standardized_sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Emerald Owl Productions offers comprehensive video production services that combine technical expertise with creative storytelling. We specialize in creating visually compelling content that resonates with viewers and effectively communicates your message. Whether you need event documentation, marketing materials, or corporate communications, our team delivers professional video solutions tailored to your specific goals and audience."
      },
      {
        id: "approach",
        title: "Our Approach",
        content: "We follow a structured production process to ensure your vision is realized with precision and creativity. Starting with thorough pre-production planning, we develop concepts, scripts, and shot lists tailored to your objectives. During production, our experienced camera operators and directors capture high-quality footage using professional equipment. In post-production, our editors craft your story through careful editing, color grading, sound design, and motion graphics, resulting in a polished final product that exceeds expectations."
      },
      {
        id: "features",
        title: "Features & Equipment",
        content: "• 4K and 6K cinema cameras for exceptional image quality\n• Professional audio recording equipment\n• Stabilization systems (gimbals, sliders, dollies)\n• Drone aerial videography capabilities\n• Studio and location lighting kits\n• Multi-camera live switching systems\n• Advanced post-production software suite\n• Motion graphics and animation capabilities"
      },
      {
        id: "applications",
        title: "Applications",
        content: "• Event documentation and highlight reels\n• Corporate training and communication videos\n• Marketing and promotional content\n• Social media video campaigns\n• Product demonstrations and tutorials\n• Testimonials and case studies\n• Live event streaming and recording\n• Documentary-style storytelling"
      },
      {
        id: "highlights",
        title: "Service Highlights",
        content: "- Strategic Storytelling: Content planning that aligns with your brand and objectives\n- Technical Excellence: Professional equipment and experienced operators\n- Creative Direction: Artistic guidance to elevate visual impact\n- Comprehensive Editing: Advanced post-production capabilities beyond basic editing\n- Multi-format Delivery: Optimized outputs for various platforms and viewing environments"
      },
      {
        id: "details",
        title: "Service Details",
        content: "Pricing Model: Project-based quotes determined by production scope, shooting days, and editing requirements\nTypical Timeline: 2-6 weeks from concept to delivery (varies by project complexity)\nLead Time: Minimum 3 weeks advance booking for production scheduling\nService Area: Based in Washington state with travel options available nationwide"
      }
    ],
    featured_image: {
      type: "image",
      url: "/placeholder.svg",
      alt: "Professional video production team in action",
      width: "1920",
      height: "1080"
    },
    benefits: benefits,
    features: features,
    last_updated: "2024-04-28"
  };

  return <ServiceContent content={content} />;
} 