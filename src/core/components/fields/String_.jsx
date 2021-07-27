import React from 'react';

const String_ = ({ options, handleChange }) => {
  return (
    <input
      onChange={(e) => {
        handleChange(e, options);
      }}
      className="px-2 py-1 rounded"
      value={options.value}
    />
  );
};

export default String_;
