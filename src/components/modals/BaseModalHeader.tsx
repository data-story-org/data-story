import React, { FC } from 'react';

interface Props {
  action: string;
}

const BaseModalHeader: FC<Props> = ({ action }) => {
  return (
    <div className="w-full bg-gray-100 p-6 font-bold border-b border-gray-300">
      <div className="flex justify-between">
        <p className="text-lg font-medium text-gray-900 text-bold">
          <span className="text-indigo-500">DataStory</span>
          <span className="">::{action}()</span>
        </p>
      </div>
    </div>
  );
};

export default BaseModalHeader;
