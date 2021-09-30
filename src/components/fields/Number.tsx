import React from 'react';

export const Number = ({ options, handleChange }) => {
  return (
    <input
      key={`${options.name}`}
      onChange={handleChange}
      className="px-2 py-1 rounded"
      value={options.value}
      type="number"
    />
  );
};
