import React from 'react';

import { fields } from './Field';

const Row = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  const handleRowChange = (param) => (e) => {
    const value = {
      ...repeatableValue,
      [param.name]: {
        ...repeatableValue[param.name],
        value: e.target.value,
      },
    };

    handleChange(value);
  };

  return (
    <>
      {Object.values(repeatableValue).map((p, i) => {
        const Field = fields[p.fieldType];

        return (
          <div key={`field-${p.name}-${i}`}>
            <Field
              options={options}
              handleChange={handleRowChange(p)}
              repeatableValue={
                repeatableValue[p.name]['value']
              }
            />
          </div>
        );
      })}
    </>
  );
};

export default Row;
