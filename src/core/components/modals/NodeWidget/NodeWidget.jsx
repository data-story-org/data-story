import React, { useState, useReducer } from 'react';
import { cloneDeep } from 'lodash';
import {
  DefaultPortModel,
  NodeModel as DefaultNodeModel,
} from '@projectstorm/react-diagrams';

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";

import { observer } from 'mobx-react';
import NodeWidgetModalHeader from './NodeWidgetHeader';
import NodeWidgetModalBody from './NodeWidgetBody';
import NodeWidgetModalActions from './NodeWidgetActions';
import NodeWidgetModalEditableInPorts from './NodeWidgetEditableInPorts';
import NodeWidgetModalEditableOutPorts from './NodeWidgetEditableOutPorts';

// TODO make NodeWidgetModal definitely-typed
/* interface Props {
 *   node: NodeModel;
 *   closeModal: () => void;
 * } */

const NodeWidgetModal = ({ node, closeModal }) => {
  const [parameters, setParameters] = useState(
    cloneDeep(node.parameters),
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
      <NodeWidgetModalHeader
        node={node}
        handleCancel={handleCancel}
      />
      <NodeWidgetModalBody
        parameters={parameters}
        handleChange={handleChange}
      />
      <NodeWidgetModalEditableInPorts
        node={node}
        editExistingPort={editExistingPort}
        saveNewInPort={saveNewInPort}
      />
      <NodeWidgetModalEditableOutPorts
        node={node}
        editExistingPort={editExistingPort}
        saveNewOutPort={saveNewOutPort}
      />
      <NodeWidgetModalActions
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
      {/* <AceEditor
                mode="json"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                />                                 */}
    </div>
  );
};

export default observer(NodeWidgetModal);
