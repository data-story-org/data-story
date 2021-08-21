import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Toolbar from '../../../src/components/Toolbar';
import { Store } from '../../../src/store';

const store = new Store();

describe('<Toolbar />', () => {
  it('Renders correctly', () => {
     render(
      <Toolbar store={store} />,
    );
  });
});
