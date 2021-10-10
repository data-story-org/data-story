import React from 'react';
import { baseFieldStyle } from '../../lib/styles';

export const Textarea = ({ options, handleChange }) => {
  return (
    <input
      type="textarea"
      key={`${options.name}`}
      onChange={handleChange}
      className={`${baseFieldStyle} h-64`}
      value={options.value}
    />
  );
};
