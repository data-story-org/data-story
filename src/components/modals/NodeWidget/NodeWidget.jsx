import React, {
  useState,
  useReducer,
  useEffect,
} from 'react';
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

  const submitHandler = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      handleSave(e);
    }
  };

  useEffect(() => {
    // Convert repeatable arrays to the
    // object with a such structure
    // {
    // 0: 'value',
    // 1: 'another value',
    // ...,
    // n: "yet another value"
    // }
    setParameters(
      parameters.map((parameter) => {
        if (parameter.isRepeatable) {
          parameter.value = Object.assign(
            {},
            parameter.value,
          );
        }

        return parameter;
      }),
    );

    window.addEventListener('keyup', submitHandler);

    return () => {
      window.removeEventListener('keyup', submitHandler);
    };
  }, [node.parameter]);

  const handleChange = (param) => (e) => {
    const updatedParameters = parameters;

    updatedParameters.find((p) => p.name == param.name)[
      // e.target.getAttribute('name') ?? 'value'
      // parameter.name
      'value'
    ] = e.target.value;

    setParameters([...updatedParameters]);
  };

  const handleRepeatableChange =
    (param) => (key) => (value) => {
      const values = parameters.find(
        (p) => p.name == param.name,
      ).value;

      parameters.find((p) => p.name == param.name)[
        'value'
      ] = {
        ...values,
        [key]: value,
      };

      setParameters([...parameters]);
    };

  const handleRepeatableAdd = (param) => (key) => {
    const values = parameters.find(
      (p) => p.name == param.name,
    ).value;

    parameters.find((p) => p.name == param.name)['value'] =
      {
        ...values,
        [key + 1]: param.defaultValue,
      };

    setParameters([...parameters]);
  };

  const handleRepeatableRemove = (param) => (key) => {
    const values = parameters.find(
      (p) => p.name == param.name,
    ).value;

    const { [key]: omit, ...withoutKey } = values;

    parameters.find((p) => p.name === param.name)['value'] =
      withoutKey;

    setParameters([...parameters]);
  };

  const handleCancel = (_e) => {
    closeModal();
  };

  const handleSave = (_e) => {
    const updatedParameters = parameters.map(
      (parameter) => {
        if (parameter.isRepeatable) {
          parameter.repeatableConverter();
        }

        return parameter;
      },
    );

    node.parameters = updatedParameters;
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
        handleRepeatableChange={handleRepeatableChange}
        handleRepeatableAdd={handleRepeatableAdd}
        handleRepeatableRemove={handleRepeatableRemove}
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
