import React, { useCallback } from 'react';

import { fields } from './Field';

export const Port = ({ options, handleChange }) => {
  const Field = useCallback(
    fields[options.wrappedPortType],
    [],
  );

  return (
    <Field options={options} handleChange={handleChange} />
  );
};
