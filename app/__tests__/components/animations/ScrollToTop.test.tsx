import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ScrollToTop from '../../../components/animations/ScrollToTop';

// Mock window functions and properties
const originalScrollTo = window.scrollTo;

describe('ScrollToTop Component', () => {
  // Setup before each test
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();
    
    // Mock addEventListener and removeEventListener
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });
  
  // Cleanup after each test
  afterEach(() => {
    window.scrollTo = originalScrollTo;
    jest.restoreAllMocks();
  });
  
  it('adds scroll event listener on mount', () => {
    render(<ScrollToTop />);
    
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
  
  it('removes scroll event listener on unmount', () => {
    const { unmount } = render(<ScrollToTop />);
    unmount();
    
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
  
  it('should not display button initially when below threshold', () => {
    render(<ScrollToTop />);
    
    const button = screen.queryByRole('button', { name: 'Scroll to top' });
    expect(button).not.toBeInTheDocument();
  });
}); 