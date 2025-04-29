import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import IconSystem, { IconName } from '../../../components/media/IconSystem';

describe('IconSystem', () => {
  describe('Basic Rendering', () => {
    it('renders icon with correct name', () => {
      render(<IconSystem name="arrow-right" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<IconSystem name="arrow-right" className="custom-class" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('custom-class');
    });

    it('renders with correct size', () => {
      render(<IconSystem name="arrow-right" size="lg" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('width', '32');
      expect(icon).toHaveAttribute('height', '32');
    });

    it('renders with numeric size', () => {
      render(<IconSystem name="arrow-right" size={48} data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('width', '48');
      expect(icon).toHaveAttribute('height', '48');
    });
  });

  describe('Icon Button', () => {
    it('renders as button when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<IconSystem name="arrow-right" onClick={handleClick} data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveProperty('onclick');
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<IconSystem name="arrow-right" onClick={handleClick} data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling', () => {
    it('applies custom color', () => {
      render(<IconSystem name="arrow-right" color="text-emerald-500" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('stroke', 'text-emerald-500');
    });

    it('applies custom stroke width', () => {
      render(<IconSystem name="arrow-right" strokeWidth={3} data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('stroke-width', '3');
    });

    it('applies default stroke width', () => {
      render(<IconSystem name="arrow-right" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('stroke-width', '2');
    });
  });

  describe('SVG Properties', () => {
    it('applies correct SVG attributes', () => {
      render(<IconSystem name="arrow-right" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
      expect(icon).toHaveAttribute('fill', 'none');
    });
  });

  describe('Icon Variants', () => {
    const icons: IconName[] = [
      'arrow-right',
      'arrow-left',
      'arrow-up',
      'arrow-down',
      'check',
      'close',
      'menu',
      'search',
      'user',
      'settings'
    ];

    it('renders different icon types', () => {
      icons.forEach(iconName => {
        const { unmount } = render(<IconSystem name={iconName} data-testid="icon" />);
        const icon = screen.getByTestId('icon');
        expect(icon).toBeInTheDocument();
        unmount();
      });
    });
  });
}); 