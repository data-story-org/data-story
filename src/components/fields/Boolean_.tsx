import React from 'react';

const Boolean_ = ({options, handleChange}) => {
  return (
    <div className="flex my-4 space-x-2 items-center justify-start text-gray-500 text-xs font-mono">
      <span className="my-2">{options.name}</span>
      <input
        key={`${options.name}`}
        type="checkbox"
        onChange={handleChange}
        className="px-2 py-1 rounded"
      />
    </div>
  );
};

export default Boolean_;
