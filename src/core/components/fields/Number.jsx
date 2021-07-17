import React from 'react';

const String_ = ({ options, handleChange }) => {
  return (
    <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
      <span className="my-2">
        <div className="">
          {options.name}
          {options.description
            ? ' (' + options.description + ')'
            : ''}
        </div>
      </span>
      <input
        onChange={(e) => {
          handleChange(e, options);
        }}
        className="px-2 py-1 rounded"
        value={options.value}
        type="number"
      />
    </div>
  );
};

export default String_;
