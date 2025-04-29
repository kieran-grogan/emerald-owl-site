import React from 'react';
import { render } from '@testing-library/react';
import ServiceContent from '../../../components/content/ServiceContent';

describe('ServiceContent', () => {
  it('renders without crashing', () => {
    render(
      <ServiceContent
        content={{
          title: 'Test Service',
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