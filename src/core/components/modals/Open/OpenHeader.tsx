import React, { FC } from 'react';

const OpenModalHeader: FC = () => {
  return (
    <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
      <div className="flex justify-between">
        <p className="text-sm font-medium text-gray-900 text-bold">
          <span className="text-indigo-500">Story</span>
          <span className="">::open()</span>
        </p>
      </div>
    </div>
  );
};

export default OpenModalHeader;
