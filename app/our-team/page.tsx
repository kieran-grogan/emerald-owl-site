import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';
import PageContent from '../components/content/PageContent';
import { TeamMember, TeamPageContent, BehindTheScenesImage } from '@/types/team';
import Icon from '../components/media/IconSystem';
import { generateMetadata } from '../lib/metadata';

// Dynamic imports for code splitting
const TeamMemberCard = dynamic(() => import('../components/team/TeamMemberCard'), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
  )
});

const BehindTheScenesGallery = dynamic(() => import('../components/team/BehindTheScenesGallery'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
      ))}
    </div>
  )
});

export const metadata: Metadata = generateMetadata({
  title: 'Our Team | Emerald Owl Productions',
  description: 'Meet the talented team behind Emerald Owl Productions - the people who make your events extraordinary.',
  keywords: 'Emerald Owl Productions team, event professionals, laser specialists, technicians, event staff',
  path: '/our-team',
  type: 'organization',
  images: [
    {
      url: '/images/content/team/team-group.jpg',
      alt: 'Emerald Owl Productions Team',
      width: 1200,
      height: 630,
    },
  ],
});

// Simulated content that would normally come from the JSON data
const ourTeamContent = {
  title: 'Our Team',
  meta: {
    title: 'Our Team | Emerald Owl Productions',
    description: 'Meet the talented team behind Emerald Owl Productions - the people who make your events extraordinary.',
    keywords: 'Emerald Owl Productions team, event professionals, laser specialists, technicians, event staff',
  },
  content: {
    main_text: 'At Emerald Owl Productions, our team is our greatest asset. Each member brings unique skills and expertise to deliver unforgettable experiences for our clients.',
    sections: [],
  },
  featured_image: {
    type: 'image',
    url: '/images/placeholders/placeholder.svg',
    alt: 'Emerald Owl Productions Leadership Team',
    width: '800',
    height: '600',
  },
  standardized_sections: [
    {
      id: 'section-1',
      title: 'Meet Our Team',
      content: 'Our dedicated team of professionals includes lighting designers, audio engineers, event coordinators, and technical specialists who work collaboratively to transform your vision into reality.\n\nWith decades of combined experience in the events industry, our team has developed the skills and expertise to handle events of any size and complexity. From intimate gatherings to large-scale productions, we approach each project with creativity, precision, and a commitment to excellence.',
      className: '',
      media: []
    }
  ],
  // Add missing required properties
  content_type: 'team',
  url: 'our-team.json',
  route: '/our-team',
  resources: [
    {
      type: 'image',
      url: '/placeholder.svg',
      alt: 'Emerald Owl Productions team group photo',
      width: '1200',
      height: '800',
    }
  ]
};

// Team member data
const teamMembers = [
  {
    name: 'Krista Strosnider',
    title: 'Chief Executive Officer',
    bio: 'Krista Strosnider was elected in May, 2022 by the EOP Board to serve as the company\'s first CEO. Her banking background, combined with a passion for the performing arts, make Krista the ideal candidate to lead EOP. She resides in Pittsburgh, PA with her husband, and their 3 boys, ages 14, 7 and 2. When Krista takes some time for herself, you might find her onstage with some of Pittsburgh\'s local theater companies, helping to direct the musical at Bishop Canevin High School, or performing the National Anthem at various Pittsburgh sporting events.',
    image: {
      url: '/images/content/team/krista-strosnider.jpg',
      alt: 'Krista Strosnider - Chief Executive Officer'
    },
    specialties: ['Leadership', 'Performing Arts', 'Business Strategy'],
    contact: 'krista@emeraldowlproductions.com'
  },
  {
    name: 'Michael Meyer',
    title: 'Chief Operating Officer & President',
    bio: 'Mike brings extensive fundraising and event planning experience to Emerald Owl Productions. He holds a Bachelor\'s degree in Psychology from Allegheny College (Meadville, PA) and a Master\'s degree in School Counseling from Penn State. With EOP since its\' inception in 2015, he has overseen countless EOP Experiences from small birthday parties to large holiday light shows. Mike has always had a passion for bringing the fun in a unique way.',
    image: {
      url: '/images/content/team/michael-meyer.jpg',
      alt: 'Michael Meyer - Chief Operating Officer & President'
    },
    specialties: ['Event Planning', 'Fundraising', 'Operations Management'],
    contact: 'mike@emeraldowlproductions.com'
  },
  {
    name: 'Ali Cheely',
    title: 'Director of Partnership Development & Neurodivergent Events',
    bio: 'Ali Cheely is a mother of 4 children, 3 of which have special needs, including neurological differences. Ali brings her teaching and coaching experience from school, church, and home settings to EOP. She has worked with children and adults with autism, Down syndrome, Split brain syndrome, Cerebral palsy, OCD, ADHD, global cognitive delays, and short stature/dwarfism.',
    image: {
      url: '/images/content/team/ali-cheely.jpg',
      alt: 'Ali Cheely - Director of Partnership Development & Neurodivergent Events'
    },
    specialties: ['Special Needs Events', 'Teaching', 'Event Accessibility'],
    contact: 'ali@emeraldowlproductions.com'
  },
  {
    name: 'Carrie Jones',
    title: 'Western North Carolina Regional Director',
    bio: 'Carrie grew up in a small town outside Raleigh, NC. An art major at St. Andrews University, her focus became painting and sculpture. Carrie then attended graduate school at UCF\'s Florida Interactive Entertainment Academy, where she studied concept art, texturing, & 3D modeling. She even designed Emmy the Owl and our logo! Now Carrie lives near Asheville, NC where she is a freelance scenic artist and muralist.',
    image: {
      url: '/images/content/team/carrie-jones.jpg',
      alt: 'Carrie Jones - Western North Carolina Regional Director'
    },
    specialties: ['Art Direction', 'Design', 'Regional Management'],
    contact: 'carrie@emeraldowlproductions.com'
  },
  {
    name: 'Jason Salt',
    title: 'Lead Laser Technician',
    bio: 'Being in love with lasers his whole life, Jason has been providing immersive abstract laser art to the entertainment scene since 2007. His first show was at the IEEE annual banquet and featured a self-built single color laser projector. Jason made his debut into the professional scene in 2017 by winning first place for abstract show at the International Laser Display Association annual conference, followed by another win in 2018.',
    image: {
      url: '/images/content/team/jason-salt.jpg',
      alt: 'Jason Salt - Lead Laser Technician'
    },
    specialties: ['Laser Design', 'Technical Systems', 'Live Performance'],
    contact: 'jason@emeraldowlproductions.com'
  },
  {
    name: 'Roman Hines',
    title: 'Chief Technician & DJ for North Carolina Region',
    bio: 'Roman Keith Hines has been in the entertainment industry since 1984. Starting as a rink DJ in Hillsborough, North Carolina, he went on to study broadcasting and work for various radio stations. In 1991, he founded Sights and Sounds, specializing in professional lighting and lasers. Roman\'s passion is working with youth, and he is highly sought after for everything from small birthday parties to large high school proms.',
    image: {
      url: '/images/content/team/roman-hines.jpg',
      alt: 'Roman Hines - Chief Technician & DJ'
    },
    specialties: ['DJ Services', 'Event Production', 'Youth Events'],
    contact: 'roman@emeraldowlproductions.com'
  },
  {
    name: 'Adam Burns',
    title: 'Technical Director',
    bio: 'Adam brings over a decade of experience in technical production and event management. His expertise in audio-visual systems and stage management ensures flawless execution of our most complex productions.',
    image: {
      url: '/images/content/team/adam-burns.jpg',
      alt: 'Adam Burns - Technical Director'
    },
    specialties: ['Technical Production', 'Stage Management', 'AV Systems'],
    contact: 'adam@emeraldowlproductions.com'
  },
  {
    name: 'Jesse McDonald',
    title: 'Production Manager',
    bio: 'Jesse\'s background in theater and live events brings a unique perspective to our productions. He specializes in coordinating large-scale events and ensuring seamless integration of all technical elements.',
    image: {
      url: '/images/content/team/jesse-mcdonald.jpg',
      alt: 'Jesse McDonald - Production Manager'
    },
    specialties: ['Production Management', 'Event Coordination', 'Technical Integration'],
    contact: 'jesse@emeraldowlproductions.com'
  },
  {
    name: 'Mark Disora',
    title: 'Creative Director',
    bio: 'Mark leads our creative team with innovative vision and artistic excellence. His experience in design and multimedia production helps create unique and memorable experiences for our clients.',
    image: {
      url: '/images/content/team/mark-disora.jpg',
      alt: 'Mark Disora - Creative Director'
    },
    specialties: ['Creative Direction', 'Design', 'Multimedia Production'],
    contact: 'mark@emeraldowlproductions.com'
  },
  {
    name: 'Nisha Ramnath',
    title: 'Event Coordinator',
    bio: 'Nisha excels in event planning and client relations. Her attention to detail and organizational skills ensure that every event meets our high standards of excellence.',
    image: {
      url: '/images/content/team/nisha-ramnath.jpg',
      alt: 'Nisha Ramnath - Event Coordinator'
    },
    specialties: ['Event Planning', 'Client Relations', 'Project Management'],
    contact: 'nisha@emeraldowlproductions.com'
  },
  {
    name: 'Rod Shuler',
    title: 'Technical Specialist',
    bio: 'Rod\'s expertise in audio engineering and equipment maintenance is crucial to our operations. He ensures all our technical systems are performing at their best.',
    image: {
      url: '/images/content/team/rod-shuler.jpg',
      alt: 'Rod Shuler - Technical Specialist'
    },
    specialties: ['Audio Engineering', 'Equipment Maintenance', 'Technical Support'],
    contact: 'rod@emeraldowlproductions.com'
  },
  {
    name: 'Michael Harris',
    title: 'Lighting Designer',
    bio: 'Michael specializes in creating stunning lighting designs that enhance the atmosphere of every event. His creative use of light and color brings our productions to life.',
    image: {
      url: '/images/content/team/michael-harris.jpg',
      alt: 'Michael Harris - Lighting Designer'
    },
    specialties: ['Lighting Design', 'Color Theory', 'Visual Effects'],
    contact: 'michaelh@emeraldowlproductions.com'
  },
  {
    name: 'Hailey Downs',
    title: 'Client Success Manager',
    bio: 'Hailey ensures our clients receive the highest level of service throughout their journey with us. Her dedication to client satisfaction has helped build our strong reputation.',
    image: {
      url: '/images/content/team/hailey-downs.jpg',
      alt: 'Hailey Downs - Client Success Manager'
    },
    specialties: ['Client Success', 'Customer Service', 'Event Coordination'],
    contact: 'hailey@emeraldowlproductions.com'
  },
  {
    name: 'Susan Kellum',
    title: 'Marketing Director',
    bio: 'Susan leads our marketing initiatives with creativity and strategic thinking. Her expertise in digital marketing and brand development helps showcase our services to new audiences.',
    image: {
      url: '/images/content/team/susan-kellum.jpg',
      alt: 'Susan Kellum - Marketing Director'
    },
    specialties: ['Marketing Strategy', 'Brand Development', 'Digital Marketing'],
    contact: 'susan@emeraldowlproductions.com'
  },
  {
    name: 'Genny Moore',
    title: 'Operations Manager',
    bio: 'Genny oversees our day-to-day operations, ensuring smooth execution of all projects. Her organizational skills and leadership keep our team running efficiently.',
    image: {
      url: '/images/content/team/genny-moore.jpg',
      alt: 'Genny Moore - Operations Manager'
    },
    specialties: ['Operations Management', 'Team Leadership', 'Process Optimization'],
    contact: 'genny@emeraldowlproductions.com'
  }
];

// Behind the scenes gallery with placeholder images
const behindTheScenes: BehindTheScenesImage[] = [
  { 
    url: '/images/placeholders/setup-laser.svg', 
    alt: 'Setting up laser equipment for a show',
    width: 800,
    height: 600
  },
  { 
    url: '/images/placeholders/team-planning.svg', 
    alt: 'Team planning session for upcoming events',
    width: 800,
    height: 600
  },
  { 
    url: '/images/placeholders/placeholder.svg', 
    alt: 'Equipment maintenance and safety checks',
    width: 800,
    height: 600
  },
  { 
    url: '/images/placeholders/placeholder.svg', 
    alt: 'Event preparation and venue setup',
    width: 800,
    height: 600
  }
];

export default function OurTeamPage() {
  // Generate organization structured data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Emerald Owl Productions',
    url: 'https://emeraldowlproductions.com',
    logo: 'https://emeraldowlproductions.com/images/logo.png',
    description: ourTeamContent.content.main_text,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pittsburgh',
      addressRegion: 'PA',
      addressCountry: 'US'
    },
    employee: teamMembers.map(member => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.title,
      image: member.image.url,
      description: member.bio,
      email: member.contact
    }))
  };

  return (
    <>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
    <div className="pt-8">
        <main id="main-content" role="main" tabIndex={-1}>
      {/* Main content using PageContent component */}
          <PageContent content={ourTeamContent as TeamPageContent} />
      
      {/* Team members section */}
          <section 
            className="py-16 bg-gray-50 dark:bg-gray-800"
            aria-labelledby="team-heading"
          >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                <h2 
                  id="team-heading" 
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                >
                  Leadership Team
                </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the experts who lead our team in creating exceptional experiences.
            </p>
          </div>
          
          {/* Leadership team */}
              <div 
                className="space-y-20"
                role="list"
                aria-label="Team members"
              >
                <Suspense 
                  fallback={
                    <div className="space-y-20">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
                      ))}
                    </div>
                  }
                >
                  {teamMembers.map((member, index) => (
                    <TeamMemberCard 
                      key={member.name} 
                      member={member} 
                      isReversed={index % 2 !== 0} 
                    />
            ))}
                </Suspense>
          </div>
        </div>
      </section>
      
      {/* Behind the scenes gallery */}
          <section 
            className="py-16 bg-gray-50 dark:bg-gray-900"
            aria-labelledby="gallery-heading"
          >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 
                id="gallery-heading"
                className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white"
              >
                Behind the Scenes
              </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Take a look behind the curtain and see our team in action as they prepare, plan, and execute our extraordinary events.
          </p>
          
              <Suspense 
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
                    ))}
                  </div>
                }
              >
                <BehindTheScenesGallery images={behindTheScenes} />
              </Suspense>
        </div>
      </section>
      
      {/* Join our team section */}
          <section 
            className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white"
            aria-labelledby="join-team-heading"
          >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Are you passionate about creating extraordinary experiences? We're always looking for talented individuals to join our team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left my-12">
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3">Creativity</h3>
              <p className="text-emerald-100">
                We value innovative thinking and creative problem-solving. Our team members approach each project with imagination and originality.
              </p>
            </div>
            
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-emerald-100">
                Great experiences are created together. We foster a collaborative environment where every voice is heard and valued.
              </p>
            </div>
            
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-emerald-100">
                We're committed to excellence in everything we do, from the smallest detail to the grand finale of every production.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Current Openings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                <h4 className="text-xl font-bold">Event Technician</h4>
                <p className="text-sm text-emerald-100 mb-4">Full-time position</p>
                <p className="mb-4">Join our technical team to set up and operate equipment for various events.</p>
                <Link href="/careers/event-technician" className="inline-block bg-white text-emerald-700 px-4 py-2 rounded font-medium hover:bg-emerald-50 transition-colors">
                  View Details
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                <h4 className="text-xl font-bold">Marketing Coordinator</h4>
                <p className="text-sm text-emerald-100 mb-4">Part-time position</p>
                <p className="mb-4">Help us showcase our amazing experiences through various marketing channels.</p>
                <Link href="/careers/marketing-coordinator" className="inline-block bg-white text-emerald-700 px-4 py-2 rounded font-medium hover:bg-emerald-50 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          <Link 
            href="/careers" 
            className="inline-block bg-white text-emerald-700 py-3 px-8 rounded-md font-bold hover:bg-emerald-50 transition-colors"
          >
            See All Opportunities
          </Link>
        </div>
      </section>
        </main>
    </div>
    </>
  );
} 