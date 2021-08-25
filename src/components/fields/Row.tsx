import React, { FC } from 'react';
import { NodeParameter } from '@data-story-org/core';

import { fields } from './Field';

interface Props {
  options: NodeParameter;
  handleChange: (e: any) => void;
}

const Row: FC<Props> = ({ options, handleChange }) => {
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
                options={
                  {
                    ...options,
                    value: p.value,
                  } as NodeParameter
                }
                handleChange={handleRowChange(p)}
              />
            </div>
          );
        },
      )}
    </>
  );
};

export default Row;
