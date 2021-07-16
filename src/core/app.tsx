import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { StoreProvider } from './store/StoreProvider';
import store from './store/main';

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
);
