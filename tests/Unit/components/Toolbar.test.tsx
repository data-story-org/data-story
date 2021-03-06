import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Toolbar } from '../../../src/sections/Toolbar';
import { Store } from '../../../src/lib/store';

const store = new Store();

describe('<Toolbar />', () => {
  it('Renders correctly', () => {
    render(<Toolbar store={store} />);
  });
});
