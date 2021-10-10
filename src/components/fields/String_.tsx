import React from 'react';
import { baseFieldStyle } from '../../lib/styles';

export const String_ = ({ options, handleChange }) => {
  return (
    <input
      key={`${options.name}`}
      onChange={handleChange}
      className={baseFieldStyle}
      value={options.value}
      placeholder={options.placeholder ?? ''}
    />
  );
};
