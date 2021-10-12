import React, { FC, useCallback } from 'react';

import { fields } from './Field';
import { FieldProps } from './types';

export const Port: FC<FieldProps> = ({ options, handleChange }) => {
  const Field = useCallback(
    fields[options.wrappedPortType],
    [],
  );

  return (
    <Field options={options} handleChange={handleChange} />
  );
};
