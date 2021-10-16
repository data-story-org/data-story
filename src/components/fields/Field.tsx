import React, { useCallback } from 'react';

import {
  Boolean_,
  JS,
  JSON_,
  Number,
  Select,
  String_,
  Textarea,
  Port,
  Row,
  BaseFieldHeader,
  withRepeatable,
} from './';
import { RowTable } from './Row/RowTable';
import { FieldProps, RepeatableFieldProps } from './types';

export const fields = {
  Boolean_,
  JS,
  JSON_,
  Number,
  Select,
  String_,
  Textarea,
  Port,
  Row,
};

export const Field = ({
  options,
  handleChange,
  handleRepeatableChange,
  handleRepeatableAdd,
  handleRepeatableRemove,
}: FieldProps & RepeatableFieldProps) => {
  const BaseField = useCallback(
    options.isRepeatable
      ? withRepeatable(fields[options.fieldType])
      : fields[options.fieldType],
    [options],
  );

  const isRow = options.fieldType === 'Row';
  let columnNames: string[];
  if (isRow) {
    columnNames = Object.keys(
      Object.values(options.value)[0],
    );
  }

  const Field = (
    <BaseField
      options={options}
      handleChange={handleChange}
      handleRepeatableChange={handleRepeatableChange}
      handleRepeatableAdd={handleRepeatableAdd}
      handleRepeatableRemove={handleRepeatableRemove}
      isRow={isRow}
    />
  );

  return (
    <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
      <BaseFieldHeader {...options} />

      {isRow ? (
        <RowTable columnNames={columnNames}>
          {Field}
        </RowTable>
      ) : (
        Field
      )}
    </div>
  );
};
