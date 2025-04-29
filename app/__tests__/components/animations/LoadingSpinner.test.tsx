import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../components/animations/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders a spinner container', () => {
    render(<LoadingSpinner />);
    // Check if the container is rendered
    const container = document.querySelector('.flex.flex-col.items-center.justify-center');
    expect(container).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    const testText = 'Loading...';
    render(<LoadingSpinner text={testText} />);
    
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    // Verify container is rendered
    const container = document.querySelector('.flex.flex-col.items-center.justify-center');
    expect(container).toBeInTheDocument();
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    // Verify container is rendered
    const container = document.querySelector('.flex.flex-col.items-center.justify-center');
    expect(container).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const customColor = 'text-blue-500';
    render(<LoadingSpinner color={customColor} />);
    
    // Find elements with the custom color class
    const coloredElement = document.querySelector(`.${customColor}`);
    expect(coloredElement).toBeInTheDocument();
  });

  it('renders dots spinner type', () => {
    render(<LoadingSpinner type="dots" />);
    
    // Verify container is rendered
    const container = document.querySelector('.flex.flex-col.items-center.justify-center');
    expect(container).toBeInTheDocument();
  });

  it('renders pulse spinner type', () => {
    render(<LoadingSpinner type="pulse" />);
    
    // Verify container is rendered
    const container = document.querySelector('.flex.flex-col.items-center.justify-center');
    expect(container).toBeInTheDocument();
  });

  it('adds the correct size class to text', () => {
    const testText = 'Loading...';
    
    // Test small size
    const { rerender } = render(<LoadingSpinner size="sm" text={testText} />);
    let textElement = screen.getByText(testText);
    expect(textElement).toHaveClass('text-xs');
    
    // Test medium size
    rerender(<LoadingSpinner size="md" text={testText} />);
    textElement = screen.getByText(testText);
    expect(textElement).toHaveClass('text-sm');
    
    // Test large size
    rerender(<LoadingSpinner size="lg" text={testText} />);
    textElement = screen.getByText(testText);
    expect(textElement).toHaveClass('text-base');
  });
  
  it('applies custom color to text', () => {
    const testText = 'Loading...';
    const customColor = 'text-blue-500';
    
    render(<LoadingSpinner text={testText} color={customColor} />);
    
    const textElement = screen.getByText(testText);
    expect(textElement).toHaveClass(customColor);
  });
}); 