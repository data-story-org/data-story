import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './sections/App';
import { RootStore, StoreProvider } from './lib/store/';

ReactDOM.render(
  <StoreProvider store={RootStore}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
);
