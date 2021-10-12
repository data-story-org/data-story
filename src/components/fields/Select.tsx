import React from 'react';
import { baseFieldStyle } from '../../lib/styles';

export const Select = ({ options, handleChange }) => {
  return (
    <select
      key={`${options.name}`}
      onChange={handleChange}
      className={baseFieldStyle}
      value={options.value}
    >
      {options.options.map((o) => {
        return (
          <option value={o} key={o}>
            {o}
          </option>
        );
      })}
    </select>
  );
};
