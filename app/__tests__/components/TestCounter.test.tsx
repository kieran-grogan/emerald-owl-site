import React from 'react';
import { render } from '@testing-library/react';
import TestCounter from '../../components/TestCounter';

describe('TestCounter', () => {
  it('renders without crashing', () => {
    render(<TestCounter />);
  });
}); 