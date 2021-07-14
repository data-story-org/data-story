import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { StoreProvider } from './store/StoreProvider';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
);
