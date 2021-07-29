import React from 'react';

const Textarea = ({ options, handleChange }) => {
  return (
    <textarea
      onChange={(e) => {
        handleChange(e.target.value, options);
      }}
      className="px-2 py-1 rounded h-64"
      value={options.value}
    />
  );
};

export default Textarea;
