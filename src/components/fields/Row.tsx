import React, { FC } from 'react';
import { NodeParameter } from '@data-story-org/core';

import { fields } from './Field';
import { FieldProps } from './types';

export const Row: FC<FieldProps> = ({
  options,
  handleChange,
}) => {
  const handleRowChange = (param: NodeParameter) => (e) => {
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
      {Object.values(options.value).map(
        (p: NodeParameter, i) => {
          const Field = fields[p.fieldType];

          return (
            <div key={`field-${p.name}-${i}`}>
              <Field
                options={p}
                handleChange={handleRowChange(p)}
              />
            </div>
          );
        },
      )}
    </>
  );
};
