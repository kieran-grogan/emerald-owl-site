import Image from 'next/image';
import Icon from '../media/IconSystem';
import { TeamMember } from '@/types/team';
import Script from 'next/script';

interface TeamMemberCardProps {
  member: TeamMember;
  isReversed?: boolean;
}

export default function TeamMemberCard({ member, isReversed = false }: TeamMemberCardProps) {
  // Generate JSON-LD structured data for the team member
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    description: member.bio,
    image: member.image.url,
    email: member.contact,
    worksFor: {
      '@type': 'Organization',
      name: 'Emerald Owl Productions',
      url: 'https://emeraldowlproductions.com'
    },
    knowsAbout: member.specialties
  };

  return (
    <>
      <Script
        id={`structured-data-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div 
        role="listitem"
        className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
      >
        <div className="w-full md:w-1/3">
          <div 
            className="relative rounded-lg overflow-hidden aspect-square shadow-lg"
            role="img"
            aria-label={member.image.alt}
          >
            <Image
              src={member.image.url}
              alt={member.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {member.name}
          </h3>
          <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            {member.title}
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {member.bio}
          </p>
          
          <div className="mb-4">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Specialties
            </h4>
            <div 
              className="flex flex-wrap gap-2"
              role="list"
              aria-label={`${member.name}'s specialties`}
            >
              {member.specialties.map((specialty, idx) => (
                <span 
                  key={idx}
                  role="listitem"
                  className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <Icon 
              name="email" 
              size="sm" 
              className="text-emerald-600 dark:text-emerald-400 mr-2"
              aria-hidden="true"
            />
            <a 
              href={`mailto:${member.contact}`}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              aria-label={`Email ${member.name}`}
            >
              {member.contact}
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 