import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './sections/App';
import { StoreProvider } from './store/StoreProvider';
import { RootStore } from './store/';

ReactDOM.render(
  <StoreProvider store={RootStore}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
);
