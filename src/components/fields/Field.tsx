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

export interface Props {}

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

  return (
    <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
      <BaseFieldHeader {...options} />
      <BaseField
        options={options}
        handleChange={handleChange}
        handleRepeatableChange={handleRepeatableChange}
        handleRepeatableAdd={handleRepeatableAdd}
        handleRepeatableRemove={handleRepeatableRemove}
      />
    </div>
  );
};
