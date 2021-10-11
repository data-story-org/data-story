import React, { FC } from 'react';
import { baseFieldStyle } from '../../lib/styles';
import { FieldProps } from './types';

export const Textarea: FC<FieldProps> = ({
  options,
  handleChange,
}) => {
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
