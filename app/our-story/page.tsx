import Image from 'next/image';
import PageContent from '../components/content/PageContent';
import ImageGallery, { ImageItem } from '../components/media/ImageGallery';
import Icon, { IconName } from '../components/media/IconSystem';

export const metadata = {
  title: 'Our Story | Emerald Owl Productions',
  description: 'Learn about the history and mission of Emerald Owl Productions, bringing interactive experiences to events nationwide.',
};

// Simulated content that would normally come from the JSON data
const ourStoryContent = {
  title: 'Our Story',
  meta: {
    title: 'Our Story | Emerald Owl Productions',
    description: 'Learn about the history and mission of Emerald Owl Productions, bringing interactive experiences to events nationwide.',
    keywords: 'Emerald Owl Productions, event production, company history, our mission, laser light shows, foam parties',
  },
  content: {
    main_text: 'Emerald Owl Productions has a rich history of creating memorable experiences through innovative entertainment solutions.',
    sections: [],
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Our Beginning',
      content: 'Emerald Owl Productions was founded in 2012 with a simple mission: to transform ordinary events into extraordinary experiences. What began as a small operation providing laser light shows for local venues has evolved into a full-service production company serving clients nationwide.\n\nOur founder, John Doebird, combined his technical expertise in lighting design with his passion for creating immersive experiences. The name "Emerald Owl" symbolizes our commitment to wisdom (the owl) and providing vibrant, emerald-quality experiences that shine brilliantly.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Emerald Owl Productions founder with early laser equipment',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-2',
      title: 'Our Growth',
      content: 'Over the years, we\'ve expanded our offerings to include a diverse range of interactive experiences. From dazzling laser light shows to fun-filled foam parties, neon nights to sensory-friendly experiences, we\'ve continuously innovated to meet the evolving needs of our clients.\n\nIn 2018, we marked a significant milestone by servicing our 1,000th event. Today, we\'re proud to have brought joy and excitement to over 5,000 events across the country, from small community gatherings to large corporate functions and major festivals.',
      media: [
        {
          type: 'image',
          url: '/images/placeholder.svg',
          alt: 'Emerald Owl team at a major event',
          width: '800',
          height: '600',
        }
      ],
      className: '',
    },
    {
      id: 'section-3',
      title: 'Our Mission',
      content: 'At Emerald Owl Productions, our mission remains the same as when we first started: to create unforgettable experiences that bring people together through shared moments of wonder and joy.\n\nWe believe that the most memorable events are those that engage all the senses and create a sense of community. Whether it\'s the visual spectacle of a laser show or the tactile fun of a foam party, our goal is to craft experiences that resonate with audiences and leave a lasting impression.\n\nOur core values guide everything we do:',
      className: '',
    },
  ],
  featured_image: {
    type: 'image',
    url: '/images/placeholder.svg',
    alt: 'Emerald Owl Productions team',
    width: '1200',
    height: '800',
  },
  content_type: 'about',
  url: 'our-story.json',
  route: '/our-story',
  resources: [
    {
      type: 'image',
      url: '/images/placeholder.svg',
      alt: 'Emerald Owl Productions team',
      width: '1200',
      height: '800',
    }
  ]
};

// Define interface for our values items
interface ValueItem {
  icon: IconName;
  title: string;
  description: string;
}

// Our values section with icons
const ourValues: ValueItem[] = [
  { 
    icon: 'laser', 
    title: 'Innovation', 
    description: 'We constantly explore new technologies and creative approaches to enhance our experiences.' 
  },
  { 
    icon: 'check', 
    title: 'Quality', 
    description: 'We never compromise on the quality of our productions, using only the best equipment and techniques.' 
  },
  { 
    icon: 'user', 
    title: 'People-First', 
    description: 'We prioritize the needs and safety of our clients and their guests above all else.' 
  },
  { 
    icon: 'owl', 
    title: 'Accessibility', 
    description: 'We ensure our experiences are inclusive and accessible to people of all abilities.' 
  },
];

// Team gallery images
const teamImages: ImageItem[] = [
  { url: '/images/placeholder.svg', alt: 'Team member 1' },
  { url: '/images/placeholder.svg', alt: 'Team member 2' },
  { url: '/images/placeholder.svg', alt: 'Team member 3' },
  { url: '/images/placeholder.svg', alt: 'Behind the scenes' },
  { url: '/images/placeholder.svg', alt: 'Setting up for an event' },
  { url: '/images/placeholder.svg', alt: 'Emerald Owl equipment' },
];

export default function OurStoryPage() {
  return (
    <div className="pt-8">
      {/* Main content using PageContent component */}
      <PageContent content={ourStoryContent} />
      
      {/* Our Values section - custom display */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ourValues.map((value, index) => (
            <div key={index} className="flex space-x-4 items-start">
              <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                <Icon name={value.icon} size="lg" color="#047857" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Team Gallery */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Team</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Meet the passionate professionals behind Emerald Owl Productions. Our diverse team brings together expertise in lighting design, audio engineering, event planning, and more.
          </p>
          
          <ImageGallery 
            images={teamImages}
            displayMode="grid"
            aspectRatio="square"
            showThumbnails={false}
            enableLightbox={true}
          />
        </div>
      </section>
      
      {/* Timeline section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Journey</h2>
        
        <div className="relative border-l-4 border-emerald-500 dark:border-emerald-400 ml-6 pl-12 py-4 space-y-16">
          {/* Timeline items */}
          <div className="relative">
            <div className="absolute -left-16 top-0 bg-emerald-500 dark:bg-emerald-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Icon name="calendar" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">2012</h3>
            <p className="text-gray-700 dark:text-gray-300">Emerald Owl Productions is founded, offering laser light shows to local venues.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-16 top-0 bg-emerald-500 dark:bg-emerald-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Icon name="calendar" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">2015</h3>
            <p className="text-gray-700 dark:text-gray-300">Expansion into foam parties and water games, reaching clients in ten states.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-16 top-0 bg-emerald-500 dark:bg-emerald-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Icon name="calendar" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">2018</h3>
            <p className="text-gray-700 dark:text-gray-300">Milestone of 1,000 events serviced. Introduction of sensory-friendly experiences.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-16 top-0 bg-emerald-500 dark:bg-emerald-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Icon name="calendar" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">2021</h3>
            <p className="text-gray-700 dark:text-gray-300">Expansion of services nationwide. Development of proprietary laser show technology.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-16 top-0 bg-emerald-500 dark:bg-emerald-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Icon name="calendar" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Today</h3>
            <p className="text-gray-700 dark:text-gray-300">Over 5,000 events and counting. Continuing to innovate and create unforgettable experiences.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 