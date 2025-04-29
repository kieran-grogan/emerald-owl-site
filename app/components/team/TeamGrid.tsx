import { useRef, useEffect, Suspense, lazy } from 'react';
import { TeamMember } from '@/types/team';
import { dynamicComponent, useDeferredMount } from '@/lib/performance';

interface TeamGridProps {
  teamMembers: TeamMember[];
  title?: string;
}

// Dynamically import TeamMemberCard with loading state
const TeamMemberCard = dynamicComponent(
  () => import('./TeamMemberCard'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96" />
    ),
  }
);

export default function TeamGrid({ teamMembers, title = 'Our Team' }: TeamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Only enable client-side features after initial render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isClient) return;

    const grid = gridRef.current;
    if (!grid) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const cards = Array.from(grid.querySelectorAll('[role="article"]'));
      const currentIndex = cards.indexOf(document.activeElement as HTMLElement);
      
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < cards.length - 1) {
            (cards[currentIndex + 1] as HTMLElement).focus();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) {
            (cards[currentIndex - 1] as HTMLElement).focus();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          const nextRowIndex = currentIndex + 3;
          if (nextRowIndex < cards.length) {
            (cards[nextRowIndex] as HTMLElement).focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevRowIndex = currentIndex - 3;
          if (prevRowIndex >= 0) {
            (cards[prevRowIndex] as HTMLElement).focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          (cards[0] as HTMLElement).focus();
          break;
        case 'End':
          e.preventDefault();
          (cards[cards.length - 1] as HTMLElement).focus();
          break;
      }
    };

    grid.addEventListener('keydown', handleKeyDown);
    return () => grid.removeEventListener('keydown', handleKeyDown);
  }, [isClient]);

  // Preload images for visible team members
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    const images = document.querySelectorAll('[data-src]');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [isClient]);

  return (
    <section
      ref={gridRef}
      aria-labelledby="team-grid-title"
      className="py-12"
    >
      <h2 
        id="team-grid-title" 
        className="sr-only"
      >
        {title}
      </h2>
      
      {teamMembers.length === 0 ? (
        <p 
          role="status"
          className="text-center text-gray-500 dark:text-gray-400"
        >
          No team members to display.
        </p>
      ) : (
        <div
          role="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-rowcount={Math.ceil(teamMembers.length / 3)}
          aria-colcount={3}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.email}
              role="gridcell"
              aria-rowindex={Math.floor(index / 3) + 1}
              aria-colindex={(index % 3) + 1}
              className="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 rounded-lg"
            >
              <Suspense
                fallback={
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96" />
                }
              >
                <TeamMemberCard 
                  member={member}
                  isReversed={index % 2 !== 0}
                />
              </Suspense>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 