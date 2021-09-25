import React from 'react';

const String_ = ({ options, handleChange }) => {
  return (
    <input
      key={`${options.name}`}
      onChange={handleChange}
      className="p-2 rounded"
      value={options.value}
      placeholder={options.placeholder ?? ''}
    />
  );
};

export default String_;
