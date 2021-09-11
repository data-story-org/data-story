import React, { FC } from 'react';
import ActiveStory from './ActiveStory'
import * as globalWindow from '../../types/globalWindow'
import { withLoadingProps } from '../../utils/isLoadingHOC';
import { Store } from '../../store';

interface Props extends withLoadingProps {
  store: Store;
}

const Header: FC<Props> = ({store}) => {
  return (
    <div className="w-full">
      <div className="w-full p-4 bg-gray-700 font-sans shadow shadow-lg">
        <span className="text-xl text-malibu-500 font-medium subpixel-antialiased">
          {window.config.appName}
        </span>
				<ActiveStory store={store} />
      </div>
    </div>
  );
};

export default Header;
