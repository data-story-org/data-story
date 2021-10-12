import React, { FC } from 'react';
import { baseFieldStyle } from '../../lib/styles';
import { FieldProps } from './types';

export const Select: FC<FieldProps> = ({
  options,
  handleChange,
}) => {
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
