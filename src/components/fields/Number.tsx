import React from 'react';
import { baseFieldStyle } from '../../lib/styles';

export const Number = ({ options, handleChange }) => {
  return (
    <input
      key={`${options.name}`}
      onChange={handleChange}
      className={baseFieldStyle}
      value={options.value}
      type="number"
    />
  );
};
