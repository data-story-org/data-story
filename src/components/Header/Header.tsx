import React, { FC } from 'react';
import { ActiveStory } from './ActiveStory';
import * as globalWindow from '../../types/globalWindow';
import { Store } from '../../store';

interface Props {
  store: Store;
}

export const Header: FC<Props> = ({ store }) => {
  const onClick = () => {
    store.setPage('Splash');
  };

  return (
    <div className="w-full">
      <div className="w-full p-4 bg-gray-700 font-sans shadow shadow-lg">
        <span
          className="text-xl text-malibu-500 hover:text-malibu-600 cursor-pointer font-medium subpixel-antialiased"
          onClick={onClick}
        >
          {window.config.appName}
        </span>
        <ActiveStory store={store} />
      </div>
    </div>
  );
};
