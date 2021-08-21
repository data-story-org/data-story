import React from 'react';

import { fields } from './Field';

const Row = ({ options, handleChange }) => {
  const handleRowChange = (param) => (e) => {
    const value = {
      ...options.value,
      [param.name]: {
        ...options.value[param.name],
        value: e.target.value,
      },
    };

    handleChange(value);
  };

  return (
    <>
      {Object.values(options.value).map((p, i) => {
        const Field = fields[p.fieldType];

        return (
          <div key={`field-${p.name}-${i}`}>
            <Field
              options={{ options, value: p.value }}
              handleChange={handleRowChange(p)}
            />
          </div>
        );
      })}
    </>
  );
};

export default Row;
