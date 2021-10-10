import React from 'react';

export const String_ = ({ options, handleChange }) => {
	console.log(options.name)

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
