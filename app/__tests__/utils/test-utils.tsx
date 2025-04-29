import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Add in any providers here if needed
interface TestWrapperProps {
  children: React.ReactNode;
}

const TestWrapper = ({ children }: TestWrapperProps) => {
  return <>{children}</>;
};

// Custom render function to include providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: TestWrapper, ...options })
  };
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method with our customized version
export { customRender as render }; 