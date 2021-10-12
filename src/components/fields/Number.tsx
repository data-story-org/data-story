import React, { FC } from 'react';
import { baseFieldStyle } from '../../lib/styles';
import { FieldProps } from './types';

export const Number: FC<FieldProps> = ({
  options,
  handleChange,
}) => {
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
