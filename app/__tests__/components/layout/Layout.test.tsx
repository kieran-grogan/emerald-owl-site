import React from 'react';
import { render, screen } from '../../utils/test-utils';
import Layout from '../../../components/layout/Layout';

// Mock the Header and Footer components
jest.mock('../../../components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('../../../components/layout/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

describe('Layout Component', () => {
  test('renders header, footer and children', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );
    
    // Check that header, content and footer are rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
  
  test('includes appropriate accessibility landmarks', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    
    // Check for main content area
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });
}); 