import React from 'react';
import { render } from '@testing-library/react';
import EventContent from '../../../components/content/EventContent';

describe('EventContent', () => {
  it('renders without crashing', () => {
    render(
      <EventContent
        content={{
          title: 'Test Event',
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