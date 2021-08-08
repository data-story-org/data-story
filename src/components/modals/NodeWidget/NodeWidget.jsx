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

import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';
import NodeWidgetModalHeader from './NodeWidgetHeader';
import NodeWidgetModalBody from './NodeWidgetBody';
import NodeWidgetModalActions from './NodeWidgetActions';
import NodeWidgetModalEditableInPorts from './NodeWidgetEditableInPorts';
import NodeWidgetModalEditableOutPorts from './NodeWidgetEditableOutPorts';
import PortModel from '../../../diagram/models/PortModel';

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

  useHotkeys(
    'enter',
    (e) => {
      e.stopPropagation();
      handleSave(false)(e);
    },
    {
      filter: (e) => e.target.type !== 'textarea',
      filterPreventDefault: false,
      enableOnTags: ['INPUT'],
    },
  );

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

    const autoSaveTimer = setTimeout(() => {
      handleSave(true)(null);
    }, 500);

    return () => clearTimeout(autoSaveTimer);
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

      const parameter = parameters.find(
        (p) => p.name == param.name,
      );
      parameter['value'] = {
        ...values,
        [key]: value,
      };

      setParameters([...parameters]);
    };

  const handleRepeatableAdd = (param) => (key) => {
    const values = parameters.find(
      (p) => p.name == param.name,
    ).value;

    const parameter = parameters.find(
      (p) => p.name == param.name,
    );
    parameter['value'] = {
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

    const parameter = parameters.find(
      (p) => p.name == param.name,
    );

    parameter['value'] = withoutKey;

    setParameters([...parameters]);
  };

  const addPort = (name) => {
    //   // update options
    node.options.ports[name] = {
      in: false,
      name: name,
    };

    //   // update actual react-diagrams nodes?
    node.addPort(
      new PortModel({
        in: false,
        name: name,
        parent: node,
      }),
    );

    console.log(node.getOutPorts());
  };

  const handlePortsUpdate = (param) => {
    if (param.isPort) {
      if (param.isRepeatable) {
        param.repeatableConverter();
        param['value'].forEach((value) => {
          addPort(value);
        });
      } else {
        addPort(param.value);
      }
      forceUpdate();
    }
  };

  const handleSave = (semi) => (_e) => {
    const updatedParameters = parameters.map(
      (parameter) => {
        if (parameter.isRepeatable) {
          parameter.repeatableConverter();
        }

        return parameter;
      },
    );

    node.parameters = updatedParameters;
    if (!semi) {
      closeModal();
      updatedParameters.forEach((p) => {
        handlePortsUpdate(p);
      });
    }
  };

  const handleCancel = (_e) => {
    closeModal();
  };

  const editExistingPort = (e) => {};

  const saveNewInPort = (e) => {
    return saveNewPort(e, true);
  };

  const saveNewOutPort = (e) => {
    saveNewPort(e, false);
  };

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
    <div id="node-modal">
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
        handleSave={handleSave(false)}
      />
    </div>
  );
};

export default observer(NodeWidgetModal);
