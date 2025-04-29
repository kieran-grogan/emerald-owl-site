import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DynamicImport, createDynamicComponent } from '../../../components/performance/DynamicImport';

describe('DynamicImport', () => {
  it('renders fallback and then the loaded module', async () => {
    const importFn = () => Promise.resolve({ value: 'Loaded!' });
    render(
      <DynamicImport
        importFn={importFn}
        render={(mod) => <div data-testid="loaded">{mod.value}</div>}
        fallback={<div data-testid="fallback">Loading...</div>}
      />
    );
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('loaded')).toBeInTheDocument());
  });

  it('renders error content if import fails', async () => {
    const importFn = () => Promise.reject(new Error('fail'));
    render(
      <DynamicImport
        importFn={importFn}
        render={() => <div>Should not render</div>}
        errorContent={<div data-testid="error">Error!</div>}
      />
    );
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
  });
});

describe('createDynamicComponent', () => {
  it('renders a dynamically imported component', async () => {
    const TestComponent = ({ text }: { text: string }) => <div data-testid="dynamic">{text}</div>;
    const importFn = () => Promise.resolve({ default: TestComponent });
    render(createDynamicComponent(importFn, { text: 'Dynamic!' }, { fallback: <div>Loading...</div> }));
    await waitFor(() => expect(screen.getByTestId('dynamic')).toHaveTextContent('Dynamic!'));
  });
}); 