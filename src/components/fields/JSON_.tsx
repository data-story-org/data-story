import React from 'react';
import { baseFieldStyle } from '../../lib/styles';

export const JSON_ = ({ options, handleChange }) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        key={`${options.name}`}
        onChange={handleChange}
        className={`${baseFieldStyle} h-64`}
        value={options.value}
      />
    </>
  );
};
