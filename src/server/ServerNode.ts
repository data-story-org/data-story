import ServerDiagram from './ServerDiagram';
import * as _ from 'lodash';
import { Feature } from '@data-story-org/core';
import UID from '../core/utils/UID';
import NodeParameter from '../core/NodeParameter';

type ServerNodeOptions = {
  diagram?: ServerDiagram;
  parameters?: object[];
  defaultInPorts?: string[];
  defaultOutPorts?: string[];
  editableInPorts?: boolean;
  editableOutPorts?: boolean;
  name?: string;
  summary?: string;
  category?: string;
  id?: string;
};

export default abstract class ServerNode {
  public id: string;
  public ports: any[];
  public diagram: ServerDiagram;
  public category = 'Custom';
  public editableInPorts = false;
  public editableOutPorts = false;
  public key = 'test-key';
  public name: string;
  public nodeType: string;
  public nodeReact = 'Node';
  public parameters: any[];
  public summary = 'No summary provided.';
  public defaultInPorts: string[];
  public defaultOutPorts: string[];

  abstract run(): any;

  constructor(options: ServerNodeOptions = {}) {
    this.diagram = options.diagram;
    this.id = options.id ?? UID();
    (this.name = options.name),
      (this.summary = options.summary),
      (this.category = options.category),
      (this.defaultInPorts = options.defaultInPorts ?? [
        'Input',
      ]),
      (this.defaultOutPorts = options.defaultOutPorts ?? [
        'Output',
      ]),
      (this.editableInPorts =
        options.editableInPorts ?? false);
    this.editableOutPorts =
      options.editableOutPorts ?? false;
    this.parameters = options.parameters
      ? options.parameters
      : [];
    this.ports = this.createPorts(options);
  }

  createPorts(options) {
    return (
      options.ports ?? [
        ...this.getDefaultInPorts(),
        ...this.getDefaultOutPorts(),
      ]
    );
  }

  getDefaultInPorts() {
    return this.defaultInPorts.map((name) => {
      return {
        name,
        in: true,
      };
    });
  }

  getDefaultOutPorts() {
    return this.defaultOutPorts.map((name) => {
      return {
        name,
        in: false,
      };
    });
  }

  serialize() {
    return {
      category: this.category,
      editableInPorts: this.editableInPorts,
      editableOutPorts: this.editableOutPorts,
      ports: this.ports,
      key: this.key,
      name: this.name,
      nodeReact: this.nodeReact,
      nodeType: this.name,
      parameters: this.getParameters(),
      summary: this.summary,
    };
  }

  getParameters() {
    return [
      NodeParameter.string('node_name').withValue(
        this.name,
      ),
    ];
  }

  protected getParameter(name: string) {
    return this.parameters.find((p) => p.name == name);
  }

  protected getParameterValue(
    name: string,
    feature: Feature = null,
  ) {
    const value = this.getParameter(name).value;

    if (!feature) return value;

    return this.interpretParameterValue(value, feature);
  }

  protected interpretParameterValue(parametric, feature) {
    const matches = parametric.match(
      /\{\{[\.a-zA-Z\s_]*\}\}/g,
    );
    if (matches) {
      for (const match of matches) {
        const originalMatch = match;

        const parts = match
          .replace('{{', '')
          .replace('}}', '')
          .trim()
          .split('.');

        parts.shift(); // Remove 'feature'

        const interpreted = parts.reduce(
          (carry, property) => {
            return carry[property];
          },
          feature.original,
        );

        parametric = parametric.replace(
          originalMatch,
          interpreted,
        );
      }
    }

    return parametric;
  }

  protected input(portName = 'Input') {
    return this.getDataAtPortNamed(portName);
  }

  protected getDataAtPortNamed(name = 'Input') {
    const port = this.portNamed(name);

    const features = port.links
      .map((linkId) => {
        const link = this.diagram.find(linkId);
        const source = this.diagram.find(link.sourcePort);

        return source.features ?? [];
      })
      .flat();

    return _.cloneDeep(features);
  }

  protected output(
    features: any[],
    port = 'Output',
  ) {
    this.portNamed(port).features = this.portNamed(port)
      .features
      ? this.portNamed(port).features.concat(features)
      : features;
  }

  protected portNamed(name: string) {
    return this.ports.find((port) => port.name == name);
  }
}
