import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TeamGrid from '../TeamGrid';

// Mock the TeamMemberCard component
jest.mock('../TeamMemberCard', () => {
  return function MockTeamMemberCard({ member }: any) {
    return (
      <div 
        data-testid="team-member-card"
        role="article"
        tabIndex={0}
      >
        {member.name}
      </div>
    );
  };
});

describe('TeamGrid', () => {
  const mockTeamMembers = [
    {
      name: 'John Doe',
      title: 'CEO',
      bio: 'Experienced leader',
      specialties: ['Strategy', 'Management'],
      email: 'john@example.com',
      image: {
        url: '/images/team/john.jpg',
        alt: 'John Doe - CEO'
      }
    },
    {
      name: 'Jane Smith',
      title: 'CTO',
      bio: 'Tech expert',
      specialties: ['Development', 'Architecture'],
      email: 'jane@example.com',
      image: {
        url: '/images/team/jane.jpg',
        alt: 'Jane Smith - CTO'
      }
    },
    {
      name: 'Bob Wilson',
      title: 'COO',
      bio: 'Operations expert',
      specialties: ['Operations', 'Management'],
      email: 'bob@example.com',
      image: {
        url: '/images/team/bob.jpg',
        alt: 'Bob Wilson - COO'
      }
    }
  ];

  it('renders correct number of team member cards', () => {
    render(<TeamGrid teamMembers={mockTeamMembers} />);
    const cards = screen.getAllByTestId('team-member-card');
    expect(cards).toHaveLength(mockTeamMembers.length);
  });

  it('displays team members in correct order', () => {
    render(<TeamGrid teamMembers={mockTeamMembers} />);
    const cards = screen.getAllByTestId('team-member-card');
    cards.forEach((card, index) => {
      expect(card).toHaveTextContent(mockTeamMembers[index].name);
    });
  });

  it('applies correct grid layout classes', () => {
    render(<TeamGrid teamMembers={mockTeamMembers} />);
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8');
  });

  it('handles empty team members array gracefully', () => {
    render(<TeamGrid teamMembers={[]} />);
    expect(screen.getByRole('status')).toHaveTextContent('No team members to display');
    expect(screen.queryByTestId('team-member-card')).not.toBeInTheDocument();
  });

  it('has proper grid accessibility attributes', () => {
    render(<TeamGrid teamMembers={mockTeamMembers} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-rowcount', '1');
    expect(grid).toHaveAttribute('aria-colcount', '3');

    const cells = screen.getAllByRole('gridcell');
    cells.forEach((cell, index) => {
      expect(cell).toHaveAttribute('aria-rowindex', String(Math.floor(index / 3) + 1));
      expect(cell).toHaveAttribute('aria-colindex', String((index % 3) + 1));
    });
  });

  it('supports keyboard navigation', async () => {
    render(<TeamGrid teamMembers={mockTeamMembers} />);
    const cards = screen.getAllByRole('article');
    
    // Focus first card
    cards[0].focus();
    expect(document.activeElement).toBe(cards[0]);

    // Test right arrow navigation
    fireEvent.keyDown(cards[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(cards[1]);

    // Test left arrow navigation
    fireEvent.keyDown(cards[1], { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(cards[0]);

    // Test down arrow navigation (if there's a next row)
    if (cards.length > 3) {
      fireEvent.keyDown(cards[0], { key: 'ArrowDown' });
      expect(document.activeElement).toBe(cards[3]);
    }

    // Test Home key
    fireEvent.keyDown(cards[1], { key: 'Home' });
    expect(document.activeElement).toBe(cards[0]);

    // Test End key
    fireEvent.keyDown(cards[0], { key: 'End' });
    expect(document.activeElement).toBe(cards[cards.length - 1]);
  });

  it('renders with custom title', () => {
    const customTitle = 'Leadership Team';
    render(<TeamGrid teamMembers={mockTeamMembers} title={customTitle} />);
    
    const title = screen.getByText(customTitle);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('sr-only');
  });

  it('applies focus styles to grid cells', () => {
    render(<TeamGrid teamMembers={mockTeamMembers} />);
    
    const cells = screen.getAllByRole('gridcell');
    cells.forEach(cell => {
      expect(cell).toHaveClass('focus-within:ring-2', 'focus-within:ring-emerald-500', 'focus-within:ring-offset-2');
    });
  });
}); 