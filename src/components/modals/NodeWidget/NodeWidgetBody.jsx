import React from 'react';
import Field from '../../fields/Field';

const NodeWidgetModalBody = ({
  parameters,
  handleChange,
  handleRepeatableChange,
  handleRepeatableAdd,
  handleRepeatableRemove,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        {Object.values(parameters).map((parameter, i) => {
          return (
            <Field
              id={`field-${parameter.name}`}
              key={`${parameter.name}${i}`}
              handleChange={handleChange(parameter)}
              handleRepeatableChange={handleRepeatableChange(
                parameter,
              )}
              handleRepeatableAdd={handleRepeatableAdd(
                parameter,
              )}
              handleRepeatableRemove={handleRepeatableRemove(
                parameter,
              )}
              options={parameter}
              fieldType={parameter.fieldType}
              isRepeatable={parameter.isRepeatable}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NodeWidgetModalBody;
