import React from 'react';
import { render } from '@testing-library/react';
import PageContent from '../../../components/content/PageContent';

describe('PageContent', () => {
  it('renders without crashing', () => {
    render(
      <PageContent
        content={{
          title: 'Test Page',
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