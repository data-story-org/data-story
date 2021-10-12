import React, { FC } from 'react';
import { baseFieldStyle } from '../../lib/styles';
import { FieldProps } from './types';

export const JS: FC<FieldProps> = ({
  options,
  handleChange,
}) => {
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
