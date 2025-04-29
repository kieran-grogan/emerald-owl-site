import React from 'react';
import { render } from '@testing-library/react';
import ContentDisplay from '../../components/ContentDisplay';

describe('ContentDisplay', () => {
  it('renders without crashing', () => {
    render(
      <ContentDisplay
        content={{
          title: 'Test',
          content: { main_text: 'Hello', sections: [] },
          meta: { description: '', keywords: '' },
          resources: [],
          url: '',
          route: ''
        }}
      />
    );
  });
}); 