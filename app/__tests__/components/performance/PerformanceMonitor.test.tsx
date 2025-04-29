import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PerformanceMonitor, withPerformanceTracking } from '../../../components/performance/PerformanceMonitor';

describe('PerformanceMonitor', () => {
  beforeAll(() => {
    // Mock window.performance.getEntriesByType
    Object.defineProperty(window, 'performance', {
      value: {
        getEntriesByType: (type: string) => {
          if (type === 'navigation') {
            return [{ domComplete: 123, loadEventEnd: 456 }];
          }
          if (type === 'paint') {
            return [
              { name: 'first-paint', startTime: 10 },
              { name: 'first-contentful-paint', startTime: 20 }
            ];
          }
          return [];
        }
      },
      writable: true
    });
  });

  it('renders children and displays metrics when showMetrics is true', async () => {
    render(
      <PerformanceMonitor showMetrics componentName="TestComponent">
        <div data-testid="child">Child</div>
      </PerformanceMonitor>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/TestComponent Performance:/)).toBeInTheDocument());
    expect(screen.getByText(/Render:/)).toBeInTheDocument();
    expect(screen.getByText(/First Paint:/)).toBeInTheDocument();
    expect(screen.getByText(/First Contentful Paint:/)).toBeInTheDocument();
  });

  it('calls onMetricsCalculated callback', async () => {
    const callback = jest.fn();
    render(
      <PerformanceMonitor showMetrics onMetricsCalculated={callback} componentName="TestComponent">
        <div>Child</div>
      </PerformanceMonitor>
    );
    await waitFor(() => expect(callback).toHaveBeenCalled());
    expect(callback.mock.calls[0][0]).toMatchObject({ domComplete: 123, loadEvent: 456 });
  });
});

describe('withPerformanceTracking', () => {
  it('wraps a component and provides performance monitoring', async () => {
    const Test = () => <div data-testid="wrapped">Wrapped</div>;
    const Wrapped = withPerformanceTracking(Test, { showMetrics: true, componentName: 'WrappedTest' });
    render(<Wrapped />);
    expect(screen.getByTestId('wrapped')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/WrappedTest Performance:/)).toBeInTheDocument());
  });
}); 