import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from '../../../src/components/Header';

describe('<Header />', () => {
  window.config = {
    appName: 'DataStoryTest',
    appDesc: 'Test',
  };

  it('Renders correctly', async () => {
    const { findByText } = render(<Header />);

    expect(await findByText(window.config.appName))
      .toBeInTheDocument;
    expect(await findByText(window.config.appDesc))
      .toBeInTheDocument;
  });
});
