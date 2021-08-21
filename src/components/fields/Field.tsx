import React, { useCallback } from 'react';

import BaseFieldHeader from './BaseFieldHeader';
import withRepeatable from './Repeatable';

import Boolean_ from './Boolean_';
import Number from './Number';
import JS from './JS';
import JSON_ from './JSON_';
import String_ from './String_';
import Select from './Select';
import Textarea from './Textarea';
import Port from './Port';
import Row from './Row';

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

const Field = ({
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

export default Field;
