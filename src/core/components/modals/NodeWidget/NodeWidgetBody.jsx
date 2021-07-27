import React from 'react';
import Field from '../../fields/Field';

const NodeWidgetModalBody = ({
  parameters,
  handleChange,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        {Object.values(parameters).map((parameter) => {
          return (
            <Field
              key={parameter.name}
              handleChange={handleChange}
              options={parameter}
              fieldType={parameter.fieldType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NodeWidgetModalBody;
