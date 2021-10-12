import React, { FC } from 'react';
import { baseFieldStyle } from '../../lib/styles';
import { FieldProps } from './types';

export const Boolean_: FC<FieldProps> = ({
  options,
  handleChange,
}) => {
  return (
    <div className="flex my-4 space-x-2 items-center justify-start text-gray-500 text-xs font-mono">
      <span className="my-2">{options.name}</span>
      <input
        key={`${options.name}`}
        type="checkbox"
        onChange={handleChange}
        className={baseFieldStyle}
      />
    </div>
  );
};
