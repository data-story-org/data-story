import React, { useCallback } from 'react';

import { fields } from './Field';

const Port = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  const Field = useCallback(
    fields[options.wrappedPortType],
    [],
  );

  return (
    <Field
      options={options}
      handleChange={handleChange}
      repeatableValue={repeatableValue}
    />
  );
};

export default Port;
