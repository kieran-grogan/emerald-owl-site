import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTransition, { 
  FadeIn, 
  ScaleIn, 
  HoverScale, 
  SectionEntrance 
} from '../../../components/animations/PageTransition';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('PageTransition Components', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/test-path');
  });

  describe('PageTransition', () => {
    it('renders children correctly', () => {
      render(
        <PageTransition>
          <div data-testid="child-element">Test Content</div>
        </PageTransition>
      );
      
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('FadeIn', () => {
    it('renders children correctly', () => {
      render(
        <FadeIn>
          <div data-testid="fade-child">Fade Content</div>
        </FadeIn>
      );
      
      expect(screen.getByTestId('fade-child')).toBeInTheDocument();
      expect(screen.getByText('Fade Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <FadeIn className="custom-class">
          <div>Content</div>
        </FadeIn>
      );
      
      // Find the motion.div wrapper which should have the custom class
      const wrapper = screen.getByText('Content').parentElement;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('ScaleIn', () => {
    it('renders children correctly', () => {
      render(
        <ScaleIn>
          <div data-testid="scale-child">Scale Content</div>
        </ScaleIn>
      );
      
      expect(screen.getByTestId('scale-child')).toBeInTheDocument();
      expect(screen.getByText('Scale Content')).toBeInTheDocument();
    });
  });

  describe('HoverScale', () => {
    it('renders children correctly', () => {
      render(
        <HoverScale>
          <div data-testid="hover-child">Hover Content</div>
        </HoverScale>
      );
      
      expect(screen.getByTestId('hover-child')).toBeInTheDocument();
      expect(screen.getByText('Hover Content')).toBeInTheDocument();
    });
  });

  describe('SectionEntrance', () => {
    it('renders children correctly', () => {
      render(
        <SectionEntrance>
          <div data-testid="section-child">Section Content</div>
        </SectionEntrance>
      );
      
      expect(screen.getByTestId('section-child')).toBeInTheDocument();
      expect(screen.getByText('Section Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <SectionEntrance className="custom-entrance-class">
          <div>Entrance Content</div>
        </SectionEntrance>
      );
      
      // Find the motion.div wrapper which should have the custom class
      const wrapper = screen.getByText('Entrance Content').parentElement;
      expect(wrapper).toHaveClass('custom-entrance-class');
    });

    it('handles different direction props', () => {
      const { rerender } = render(
        <SectionEntrance direction="down">
          <div>Direction Test</div>
        </SectionEntrance>
      );
      
      expect(screen.getByText('Direction Test')).toBeInTheDocument();
      
      rerender(
        <SectionEntrance direction="left">
          <div>Direction Test</div>
        </SectionEntrance>
      );
      
      expect(screen.getByText('Direction Test')).toBeInTheDocument();
      
      rerender(
        <SectionEntrance direction="right">
          <div>Direction Test</div>
        </SectionEntrance>
      );
      
      expect(screen.getByText('Direction Test')).toBeInTheDocument();
      
      // Test with an invalid direction to trigger default case
      rerender(
        <SectionEntrance direction={"invalid" as any}>
          <div>Direction Test</div>
        </SectionEntrance>
      );
      
      expect(screen.getByText('Direction Test')).toBeInTheDocument();
    });
  });
}); 