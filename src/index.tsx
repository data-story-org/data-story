import React, { FC } from 'react';
import { App } from './sections/App';
import { RootStore, StoreProvider } from './lib/store/';
import ReactModal from 'react-modal';

interface DataStoryConfig {
  appElement?: string | HTMLElement;
}

export const DataStory: FC<DataStoryConfig> = ({
  appElement = 'body',
}) => {
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  if (process.env.NODE_ENV !== 'test')
    ReactModal.setAppElement(appElement);

  return (
    <StoreProvider store={RootStore}>
      <App />
    </StoreProvider>
  );
};
