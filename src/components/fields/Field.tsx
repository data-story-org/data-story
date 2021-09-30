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
  fieldType,
  isRepeatable,
}) => {
  const BaseField = useCallback(
    isRepeatable
      ? withRepeatable(fields[fieldType])
      : fields[fieldType],
    [],
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
