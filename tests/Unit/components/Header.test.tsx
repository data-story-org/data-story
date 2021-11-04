import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Header } from '../../../src/sections/Header';
import { Store } from '../../../src/lib/store';

describe('<Header />', () => {
  it('Renders correctly', async () => {
    const store = new Store();
    const { findByText } = render(<Header store={store} />);

    expect(await findByText('DataStory')).toBeInTheDocument;
    expect(await findByText('Untitled')).toBeInTheDocument;
  });
});
