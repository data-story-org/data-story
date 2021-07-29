import React from 'react';

const String_ = ({ options, handleChange }) => {
  return (
    <input
      onChange={(e) => {
        handleChange(e.target.value, options);
      }}
      className="px-2 py-1 rounded"
      value={options.value}
      type="number"
    />
  );
};

export default String_;
