import {
  NodeModel as DefaultNodeModel,
  NodeModelGenerics,
} from '@projectstorm/react-diagrams';
import { BasePositionModelOptions } from '@projectstorm/react-canvas-core';
import PortModel from './PortModel';
import { UID } from '@data-story-org/core';
import { pickBy } from '@data-story-org/core';
import NodeParameter from './NodeParameter';
import { SerializedNodeModel } from './types/SerializedNodeModel';
import { ReactNode } from 'react';

export interface NodeModelOptions
  extends BasePositionModelOptions {
  category: ReactNode;
  name: string;
  parameters: any[];
}

export default class NodeModel extends DefaultNodeModel {
  declare options: NodeModelOptions;
  declare parent: any;
  features: [];
  category: string;
  summary: string;
  editableInPorts: false;
  editableOutPorts: false;
  name: string;
  nodeReact: 'Node';
  parameters: NodeParameter[];
  nodeType: string;
  id: string;

  constructor(options) {
    // Make id easier on humans
    const id =
      options.id ??
      `Node_${options.name}_${options.serial}_${UID()}`;

    super({
      ...options,
      type: 'NodeModel',
      id,
    });

    this.id = id;
    this.category = options.category;
    this.summary = options.summary;
    this.editableInPorts = options.editableInPorts;
    this.editableOutPorts = options.editableOutPorts;
    this.name = options.name;
    this.nodeReact = options.nodeReact;
    this.parameters = options.parameters;
    this.nodeType = options.nodeType;

    options.ports.forEach((port) => {
      this.addPort(
        new PortModel({
          in: port.in,
          name: port.name,
          parent: this,
        }),
      );
    });
  }

  serialize(): SerializedNodeModel {
    return {
      name: this.name,
      ...super.serialize(),

      parameters: this.parameters,
      category: this.category,
      summary: this.summary,
      editableInPorts: this.editableInPorts,
      editableOutPorts: this.editableOutPorts,
      nodeReact: this.nodeReact,
      nodeType: this.nodeType,
    };
  }

  parameter(name) {
    return this.parameters.find((parameter) => {
      return parameter.name == name;
    });
  }

  getDisplayName() {
    return this.parameter('node_name').value;
  }

  getDiagramModel() {
    return this.parent.parent;
  }

  getInPorts() {
    return pickBy(this.getPorts(), function (port) {
      return port.options.in;
    });
  }

  getOutPorts() {
    return pickBy(this.getPorts(), function (port, key) {
      return !port.options.in;
    });
  }

  dependencies() {
    const cached =
      this.getDiagramModel().getCachedNodeDependencies(
        this.id,
      );
    if (cached !== null) {
      return cached;
    }

    const inPorts = Object.values(this.getInPorts());
    const linkLists = inPorts
      .map((port: any) => port.links)
      .flat();
    const links = linkLists
      .map((linkList) => Object.values(linkList))
      .flat();

    const dependencies = links.map(
      (link: any) => link.sourcePort.parent,
    );

    const deepDependencies = dependencies.map((d) =>
      d.dependencies(),
    );

    const result = dependencies.concat(
      deepDependencies.flat(),
    );

    this.getDiagramModel().setCachedNodeDependencies(
      this.id,
      result,
    );

    return result;
  }

  dependsOn(n2) {
    return this.dependencies()
      .map((d) => d.options.id)
      .includes(n2.id);
  }

  isInspectable() {
    return (
      Array.isArray(this.features) && this.features.length
    );
  }
}
