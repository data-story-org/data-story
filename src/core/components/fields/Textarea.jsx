import React from 'react';

const Textarea = ({ options, handleChange }) => {
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
      <textarea
        onChange={(e) => {
          handleChange(e, options);
        }}
        className="px-2 py-1 rounded h-64"
        value={options.value}
      />
    </div>
  );
};

export default Textarea;
