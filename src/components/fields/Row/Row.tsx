import React, { FC } from 'react';
import { NodeParameter } from '@data-story-org/core';

import { fields } from '../Field';
import { FieldProps } from '../types';

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

  const parameters: NodeParameter[] = Object.values(
    options.value,
  );

  return (
    <>
      {parameters.map((p, i) => {
        const Field = fields[p.fieldType];

        return (
          <td
            className="px-6 py-4 whitespace-nowrap"
            key={`field-${p.name}-${i}`}
          >
            <div>
              <Field
                options={p}
                handleChange={handleRowChange(p)}
              />
            </div>
          </td>
        );
      })}
    </>
  );
};
