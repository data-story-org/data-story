import React from 'react';

const BaseFieldHeader = ({ name, description }) => {
  return (
    <span className="my-2 font-sans font-medium text-sm">
      <div className="">
        <span className="text-indigo-500">{name}</span>
        {description ? ` (${description})` : ''}
      </div>
    </span>
  );
};

export default BaseFieldHeader;
