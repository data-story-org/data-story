import React, { FC } from 'react';
import * as globalWindow from '../types/globalWindow'

const Header: FC = () => {
  return (
    <div className="w-full">
      <div className="w-full p-4 bg-gray-700 font-sans shadow shadow-lg">
        <span className="text-xl text-malibu-500 font-medium subpixel-antialiased">
          {window.config.appName}
          <span className="ml-2 text-sm text-gray-400 font-light subpixel-antialiased">
            {window.config.appDesc}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
