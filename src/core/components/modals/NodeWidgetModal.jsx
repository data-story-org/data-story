import React, { useState, useReducer } from 'react';
// import { PortWidget } from '@projectstorm/react-diagrams';
// import Modal from 'react-modal';
import _ from 'lodash';
import {
  DefaultPortModel,
  NodeModel as DefaultNodeModel,
} from '@projectstorm/react-diagrams';

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";

import { observer } from 'mobx-react';
import field from '../fields/factory';

// TODO make NodeWidgetModal definitely-typed
/* interface Props {
 *   node: NodeModel;
 *   closeModal: () => void;
 * } */

const NodeWidgetModal = observer(({ node, closeModal }) => {
  const [parameters, setParameters] = useState(
    _.cloneDeep(node.parameters),
  );
  const [_ignored, forceUpdate] = useReducer(
    (x) => x + 1,
    0,
  );

  const handleChange = (e, parameter) => {
    const updatedParameters = parameters;

    updatedParameters.find((p) => p.name == parameter.name)[
      e.target.getAttribute('name') ?? 'value'
    ] = e.target.value;

    setParameters([...updatedParameters]);
  };

  const handleCancel = (_e) => {
    closeModal();
  };

  const handleSave = (_e) => {
    node.parameters = parameters;
    closeModal();
  };

  const renderHeading = () => {
    return (
      <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-900 text-bold">
            <span className="text-indigo-500">
              {node.options.category}
            </span>
            <span className="">
              {' '}
              / {node.getDisplayName()}
            </span>
          </p>
          <p
            className="text-sm font-medium text-bold text-gray-400 hover:text-gray-500"
            onClick={handleCancel}
          >
            <i className="fa fa-close"></i>
          </p>
        </div>
      </div>
    );
  };

  const renderBody = () => {
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

  const renderEditableInPorts = () => {
    return (
      node.options.editableInPorts && (
        <div className="w-full px-6 py-1 text-gray-500 text-xs font-mono border border-t">
          <div className="my-2">Ports</div>
          {Object.values(node.getInPorts()).map((port) => {
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
                onKeyUp={saveNewInPort}
              />
            </div>
          </div>
        </div>
      )
    );
  };

  const renderEditableOutPorts = () => {
    return (
      node.options.editableOutPorts && (
        <div className="w-full px-6 py-1 text-gray-500 text-xs font-mono border border-t">
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

  const renderActions = () => {
    return (
      <div>
        <div className="w-full bg-gray-100 mt-6 px-6 py-2 border-t border-gray-300">
          <div className="flex justify-between my-4 justify-end align-bottom text-gray-500 text-xs font-mono">
            <div className="flex">
              {/* <button className="my-4 px-4 py-2 hover:text-malibu-700 hover:underline">Import schema</button> */}
            </div>
            <div className="flex">
              <button
                onClick={handleCancel}
                className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="m-4 px-4 py-2 hover:text-malibu-700 border border-gray-500 hover:bg-gray-200 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const editExistingPort = (e) => {};

  const saveNewInPort = (e) => {
    return saveNewPort(e, true);
  };

  const saveNewOutPort = (e) => {
    saveNewPort(e, false);
  };

  // blurNewOutPort(e) {
  //     saveNewPort(e, false)
  // }

  const saveNewPort = (e, isInPort) => {
    if (e.key != 'Enter') return;
    node.addPort(
      new DefaultPortModel({
        in: isInPort,
        name: e.target.value,
      }),
    );

    e.target.value = '';

    // Why is this needed?
    forceUpdate();
  };

  return (
    <div>
      {renderHeading()}
      {renderBody()}
      {renderEditableInPorts()}
      {renderEditableOutPorts()}
      {renderActions()}
      {/* <AceEditor
                mode="json"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                />                                 */}
    </div>
  );
});

export default NodeWidgetModal;
