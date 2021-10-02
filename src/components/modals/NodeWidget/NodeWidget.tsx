import React, { FC, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  NodeParameter,
  repeatableConverter,
} from '@data-story-org/core';

import { NodeModel, PortModel } from '../../../lib/diagram';
import { NodeWidgetModalActions } from './NodeWidgetActions';
import { NodeWidgetModalBody } from './NodeWidgetBody';
import { NodeWidgetModalHeader } from './NodeWidgetHeader';
import { Store } from '../../../lib/store';

interface Props {
  node: NodeModel;
  closeModal: () => void;
  store: Store;
}

export const NodeWidgetModal: FC<Props> = observer(
  ({ node, closeModal, store }) => {
    const [parameters, setParameters] = useState(
      cloneDeep(node.parameters),
    );

    useHotkeys(
      'enter',
      (e) => {
        e.stopPropagation();
        handleSave(false)(e);
      },
      {
        filterPreventDefault: false,
        enableOnTags: ['INPUT', 'TEXTAREA'],
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
        parameters.map((parameter: NodeParameter) => {
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

    const handleChange = (param: NodeParameter) => (e) => {
      const updatedParameters = parameters;

      updatedParameters.find((p) => p.name == param.name)[
        // e.target.getAttribute('name') ?? 'value'
        // parameter.name
        'value'
      ] = e.target.value;

      setParameters([...updatedParameters]);
    };

    const handleRepeatableChange =
      (param: NodeParameter) =>
      (key: number) =>
      (value: any) => {
        const values = parameters.find(
          (p) => p.name == param.name,
        ).value;

        const parameter = parameters.find(
          (p) => p.name == param.name,
        );
        const previousValue = parameter['value'][key];
        parameter['value'] = {
          ...values,
          [key]: value,
        };

        if (param.fieldType === 'Port') {
          handleRemovePort(previousValue);
        }
        setParameters([...parameters]);
      };

    const handleRepeatableAdd =
      (param: NodeParameter) => (key: number) => {
        const values = parameters.find(
          (p) => p.name == param.name,
        ).value;

        const parameter = parameters.find(
          (p) => p.name == param.name,
        );
        parameter['value'] = {
          ...values,
          [key + 1]:
            param.fieldType === 'Port'
              ? ''
              : param.defaultValue,
        };

        setParameters([...parameters]);
      };

    const handleRepeatableRemove =
      (param: NodeParameter) => (key: number) => {
        const values = parameters.find(
          (p) => p.name == param.name,
        ).value;

        const { [key]: omit, ...withoutKey } = values;

        const parameter = parameters.find(
          (p) => p.name == param.name,
        );

        parameter['value'] = withoutKey;

        if (param.fieldType === 'Port') {
          handleRemovePort(omit);
        }
        setParameters([...parameters]);
      };

    const addPort = (name: string) => {
      node.addPort(
        new PortModel({
          in: false,
          name: name,
          parent: node,
        }),
      );
    };

    const handlePortsUpdate = (param: NodeParameter) => {
      let portsNames = Object.keys(node.getPorts());

      if (param.isRepeatable) {
        param['value'].forEach((value) => {
          portsNames = Object.keys(node.getPorts());
          if (!portsNames.includes(value)) {
            addPort(value);
          }
        });
      } else {
        const value = param.value;
        if (!portsNames.includes(value)) {
          addPort(value);
        }
      }
    };

    const handleRemovePort = (portName: string) => {
      if (portName in node.getPorts()) {
        const port = node.getPort(portName);
        node.removePortAndLinks(port as PortModel);
        store.diagram.engine.repaintCanvas();
      }
    };

    const handleSave = (semi: boolean) => (_e) => {
      const updatedParameters = parameters.map(
        (param: NodeParameter) => {
          if (param.isRepeatable) {
            param.value = repeatableConverter(param.value);
          }

          if (!semi) {
            if (param.fieldType === 'Port') {
              handlePortsUpdate(param);
            }
          }

          return param;
        },
      );
      node.parameters = updatedParameters;

      if (!semi) {
        closeModal();
        store.diagram.engine.repaintCanvas();
      }
    };

    const handleCancel = (_e) => {
      closeModal();
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
        <NodeWidgetModalActions
          handleCancel={handleCancel}
          handleSave={handleSave(false)}
        />
      </div>
    );
  },
);
