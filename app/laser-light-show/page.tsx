import ServiceContent from '../components/content/ServiceContent';

export const metadata = {
  title: 'Laser Light Show | Emerald Owl Productions',
  description: 'Create an unforgettable atmosphere with our professional laser light shows for events of all sizes.',
};

// Simulated content that would normally come from the JSON data
const laserLightShowContent = {
  title: 'Laser Light Show',
  meta: {
    title: 'Laser Light Show | Emerald Owl Productions',
    description: 'Create an unforgettable atmosphere with our professional laser light shows for events of all sizes.',
    keywords: 'laser light show, event laser show, laser entertainment, laser display, professional laser show, emerald owl productions',
  },
  content: {
    main_text: 'Our state-of-the-art laser light shows provide a visually stunning experience for events of all kinds. From corporate events to music festivals, we tailor each show to create an immersive and memorable experience.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Professional Laser Light Shows',
      content: 'Emerald Owl Productions offers high-end laser light shows that create magical environments through the artistic use of light, color, and motion. Our professional laser systems are capable of producing a wide variety of effects, from simple beams to complex animations and even custom logos and text.\n\nWe use the latest technology to ensure safety while maximizing the visual impact of our shows. Whether indoors or outdoors, our team has the expertise to design and execute stunning laser displays that will leave your guests in awe.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Indoor laser light show setup',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Customized to Your Event',
      content: 'No two events are the same, which is why we customize every laser light show to match your specific event theme, venue, and objectives. Our design team works closely with you to understand your vision and create a personalized experience that aligns with your brand or event concept.\n\nFrom color schemes that match your branding to synchronized displays that work with your music or presentation, we ensure that the laser show integrates seamlessly with the overall event experience.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Custom laser projection of corporate logo',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Benefits & Features of Our Laser Shows',
      content: 'Our professional laser light shows offer numerous advantages for your event:\n\n- Creates a memorable and immersive atmosphere that guests will talk about long after\n- Customizable to match your event theme, brand colors, or artistic vision\n- Works in various venue types, from outdoor festivals to intimate indoor spaces\n- Can be synchronized with music, speeches, or other event elements\n- Energy-efficient and environmentally friendly compared to traditional lighting\n- Safety-certified systems operated by experienced technicians\n- Ability to project custom logos, text, and animations\n- Scalable solutions for events of all sizes\n- Can be combined with other lighting effects for a more dynamic experience',
      className: '',
    },
    {
      id: 'section-4',
      title: 'Technical Specifications',
      content: 'Our laser systems include:\n\n- High-powered RGB laser projectors (1-40W)\n- Full-color spectrum capability with millions of colors\n- Advanced scanning technology for precise and smooth animations\n- Multiple beam effects, including liquid sky, tunnels, and fan effects\n- Professional control systems for perfect synchronization\n- DMX compatibility for integration with other lighting\n- Water-resistant options for outdoor events\n- Compact and versatile mounting solutions',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Laser equipment setup',
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
    alt: 'Spectacular laser light show',
    width: '1920',
    height: '1080',
  },
  content_type: 'service',
  url: 'laser-light-show.json',
  route: '/laser-light-show',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Spectacular laser light show',
      width: '1920',
      height: '1080',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Indoor laser light show setup',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Custom laser projection of corporate logo',
      width: '800',
      height: '600',
    },
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Laser equipment setup',
      width: '800',
      height: '600',
    }
  ]
};

export default function LaserLightShowPage() {
  return <ServiceContent content={laserLightShowContent} />;
} 