import React from 'react';
import { observer } from 'mobx-react';
import field from '../../fields/factory';

const NodeWidgetModalEditableInPorts = ({
  node,
  editExistingPort,
  saveNewInPort,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        {Object.values(parameters).map((parameter) => {
          const Field = field(parameter.fieldType);

          return (
            <Field
              key={parameter.name}
              handleChange={handleChange}
              options={parameter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default observer(NodeWidgetModalEditableInPorts);
