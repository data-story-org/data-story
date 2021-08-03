import React from 'react';
import { observer } from 'mobx-react-lite';

const NodeWidgetModalEditableInPorts = ({
  node,
  editExistingPort,
  saveNewOutPort,
}) => {
  return (
    node.options.editableOutPorts && (
      <div className="w-full px-6 py-1 text-gray-500 text-xs border border-t">
        <div className="my-2">Ports</div>
        {Object.values(node.getOutPorts()).map((port) => {
          return (
            <div
              key={port.options.id}
              className="w-full flex items-center"
            >
              <div className="w-full rounded">
                <input
                  className="w-full px-2 py-1"
                  type="text"
                  value={port.options.label}
                  onChange={editExistingPort}
                />
              </div>
            </div>
          );
        })}
        <div className="w-full flex items-center">
          <div className="w-full rounded">
            <input
              className="w-full px-2 py-1"
              type="text"
              placeholder={'add port...'}
              onKeyUp={saveNewOutPort}
              // onBlur={blurNewOutPort}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default observer(NodeWidgetModalEditableInPorts);
