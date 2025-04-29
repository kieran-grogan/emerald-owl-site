import { render, screen, fireEvent } from '@testing-library/react';
import TeamMemberCard from '../TeamMemberCard';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock the IconSystem component
jest.mock('../../media/IconSystem', () => ({
  __esModule: true,
  default: () => <span data-testid="mock-icon" />,
}));

describe('TeamMemberCard', () => {
  const mockMember = {
    name: 'John Doe',
    title: 'CEO',
    bio: 'Experienced leader with 15+ years in the industry',
    specialties: ['Strategy', 'Management'],
    email: 'john@example.com',
    image: '/images/team/john.jpg'
  };

  it('renders member information correctly', () => {
    render(<TeamMemberCard member={mockMember} />);
    
    expect(screen.getByText(mockMember.name)).toBeInTheDocument();
    expect(screen.getByText(mockMember.title)).toBeInTheDocument();
    expect(screen.getByText(mockMember.bio)).toBeInTheDocument();
    mockMember.specialties.forEach(specialty => {
      expect(screen.getByText(specialty)).toBeInTheDocument();
    });
  });

  it('renders member image with correct attributes', () => {
    render(<TeamMemberCard member={mockMember} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockMember.image);
    expect(image).toHaveAttribute('alt', `${mockMember.name} - ${mockMember.title}`);
  });

  it('displays email contact button', () => {
    render(<TeamMemberCard member={mockMember} />);
    
    const emailButton = screen.getByRole('link', { name: /contact/i });
    expect(emailButton).toHaveAttribute('href', `mailto:${mockMember.email}`);
  });

  it('applies hover effects to the card', () => {
    render(<TeamMemberCard member={mockMember} />);
    
    const card = screen.getByTestId('team-member-card');
    expect(card).toHaveClass('transform', 'transition-transform', 'hover:scale-105');
  });

  it('has proper accessibility attributes', () => {
    render(<TeamMemberCard member={mockMember} />);
    
    const card = screen.getByTestId('team-member-card');
    expect(card).toHaveAttribute('role', 'article');
    expect(card).toHaveAttribute('aria-labelledby', expect.stringMatching(/member-name-/));
  });

  it('renders specialties with proper styling', () => {
    render(<TeamMemberCard member={mockMember} />);
    
    const specialtiesList = screen.getByRole('list');
    expect(specialtiesList).toHaveClass('flex', 'flex-wrap', 'gap-2');
    
    const specialtyTags = screen.getAllByRole('listitem');
    specialtyTags.forEach(tag => {
      expect(tag).toHaveClass('bg-emerald-100', 'text-emerald-800', 'px-2', 'py-1', 'rounded');
    });
  });

  it('applies correct layout based on isReversed prop', () => {
    const { rerender } = render(<TeamMemberCard member={mockMember} />);
    
    // Default (not reversed)
    expect(screen.getByRole('listitem')).toHaveClass('md:flex-row');

    // Reversed
    rerender(<TeamMemberCard member={mockMember} isReversed />);
    expect(screen.getByRole('listitem')).toHaveClass('md:flex-row-reverse');
  });

  it('includes proper ARIA attributes for accessibility', () => {
    render(<TeamMemberCard member={mockMember} />);

    // Check if image has proper aria-label
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', `${mockMember.name} - ${mockMember.title}`);

    // Check if specialties list has proper aria-label
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', `${mockMember.name}'s specialties`);

    // Check if email link has proper aria-label
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', `Email ${mockMember.name}`);
  });

  it('renders structured data script', () => {
    render(<TeamMemberCard member={mockMember} />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const structuredData = JSON.parse(script?.innerHTML || '');
    expect(structuredData['@type']).toBe('Person');
    expect(structuredData.name).toBe(mockMember.name);
    expect(structuredData.jobTitle).toBe(mockMember.title);
  });
}); 