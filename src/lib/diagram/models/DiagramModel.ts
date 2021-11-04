import {
  DefaultLinkModel,
  DiagramModel as DefaultDiagramModel,
} from '@projectstorm/react-diagrams';
import { NodeModel } from './NodeModel';
import { SerializedReactDiagram } from '../../types';
import { version as VERSION } from '../../utils';
import { stringify } from 'flatted';

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export class DiagramModel extends DefaultDiagramModel {
  latestNodes: NodeModel[] = [];

  addNode(node) {
    this.attemptLinkToLatest(node);
    this.smartInspectorNames(node);
    this.latestNodes.unshift(node);

    const added = super.addNode(node);
    this.clearSelection();
    added.setSelected(true);

    return added;
  }

  toJson(indentation = 0): string {
    return stringify(this.serialize(), null, indentation);
  }

  toPrettyJson(): string {
    return JSON.stringify(this.serialize(), null, 4);
  }

  serialize(): SerializedReactDiagram {
    // The default react-diagrams format
    const layered = super.serialize();

    const simplified = {
      // Provide links and nodes as simple arrays
      nodes: Object.values(layered.layers[1].models),
      links: Object.values(layered.layers[0].models),

      // Default serialization
      ...layered,

      // Serialized at version
      version: VERSION,
    };

    // Cleanup unused keys
    delete simplified.layers;

    return simplified as unknown as SerializedReactDiagram;
  }

  deserializeModel(data, engine): void {
    // Restore the default react-diagrams layer format
    data.layers = [
      {
        id: 'diagram-links-layer',
        type: 'diagram-links',
        isSvg: true,
        transformed: true,
        models: data.links,
      },
      {
        id: 'diagram-nodes-layer',
        type: 'diagram-nodes',
        isSvg: false,
        transformed: true,
        models: data.nodes,
      },
    ];

    // Cleanup unused keys
    delete data.links;
    delete data.nodes;

    super.deserializeModel(data, engine);
  }

  hasNode(node) {
    return Boolean(node.id && this.getNode(node.id));
  }

  attemptLinkToLatest(node) {
    let linked = false;

    // Try to link to latest nodes
    this.latestNodes.find((latest) => {
      if (this.hasNode(latest)) {
        if (this.canLink(latest, node)) {
          // Spread the nodes nicely
          this.setLinkedNodePosition(latest, node);
          // Link to latest node
          this.addAll(this.getAutomatedLink(latest, node));
          // Dont continue traversing latestNodes array
          return (linked = true);
        }
      }
    });

    if (linked) return;

    // Fallback 1: place below latest node
    // Fallback 2: place at 100, 100
    const latest: any = [...this.latestNodes][0] ?? null;

    node.setPosition(
      latest?.position?.x ? latest.position.x : 100,
      latest?.position?.y ? latest.position.y + 75 : 100,
    );
  }

  setLocked(locked = true) {
    super.setLocked(locked);
  }

  smartInspectorNames(node) {
    if (node.options.name !== 'Inspect') return;

    const nameParam = node.options.parameters.find(
      (n) => n.name === 'node_name',
    );

    const sourceLink: any =
      Object.values(node.ports?.Input?.links)[0] ?? null;
    if (!sourceLink) return;
    const sourcePortName =
      sourceLink.sourcePort.options.name ?? false;

    // It must be a specific name to make sense
    if (!sourcePortName || sourcePortName === 'Output')
      return;

    nameParam.value = sourcePortName;
  }

  getAutomatedLink(from, to) {
    if (!this.canLink(from, to)) return;

    // fromPort: prefer first unused outPort. Otherwise defaults to first
    const fromPort: any = this.getAutomatedFromPort(from);

    // toPort: the first inPort
    const toPort: any = Object.values(to.getInPorts())[0];

    // Links
    const link = new DefaultLinkModel();
    link.setSourcePort(fromPort);
    link.setTargetPort(toPort);

    // track: https://github.com/projectstorm/react-diagrams/issues/617
    //link.addLabel(Math.floor(Math.random()*1000));

    // Report
    fromPort.reportPosition();
    toPort.reportPosition();

    return link;
  }

  getAutomatedFromPort(fromNode) {
    // fromPort: prefer first unused outPort. Otherwise defaults to first
    return (
      Object.values(fromNode.getOutPorts()).find(
        (candidate: any) => {
          return (
            Object.values(candidate.links).length === 0
          );
        },
      ) ?? Object.values(fromNode.getOutPorts())[0]
    );
  }

  canLink(from, to) {
    // Has from node?
    if (!from) return;

    // Resolve ports
    const fromPort =
      Object.values(from.getOutPorts())[0] ?? false;
    const toPort =
      Object.values(to.getInPorts())[0] ?? false;

    // Ensure there are ports to connect to
    return fromPort && toPort;
  }

  setLinkedNodePosition(latest, node) {
    const fromPort = this.getAutomatedFromPort(latest);
    const position = Object.values(
      latest.getOutPorts(),
    ).indexOf(fromPort);

    node.setPosition(
      latest.position.x + 200,
      latest.position.y + position * 75,
    );
  }

  syncFeatures(serverDiagram) {
    // Transfer node features
    serverDiagram.nodes.forEach((serverNode) => {
      // TODO how use type node: NodeModel here?
      const node: any = this.getNode(serverNode.id);
      node.features = serverNode.features;
    });

    // Transfer port feature counts
    this.clearLinkLabels();
    serverDiagram.nodes
      .map((node) => {
        return node.ports;
      })
      .flat()
      .filter((port) => {
        return port.features;
      })
      .forEach((port) => {
        const allLinks = Object.values(
          (this.layers[0] as any).models,
        );

        allLinks
          .filter((link) => {
            return (
              // @ts-ignore
              link.sourcePort.options.id == port.id
            );
          })
          .forEach((link) => {
            port.features.length &&
              this.getLink(link['options']['id']).addLabel(
                port.features.length,
              );
          });
      });
  }

  clearLinkLabels(): void {
    Object.values((this.layers[0] as any).models).forEach(
      (link: any) => {
        link.labels = [];
      },
    );
  }

  clearNodeFeatures(): void {
    this.getNodes().forEach((node: NodeModel) => {
      node.features = [];
    });
  }

  findByName(name: string): NodeModel | null {
    const searchables: NodeModel[] =
      this.getNodes() as NodeModel[];

    // Add ports to searchables!

    return searchables.find(
      (entity) => entity.name == name,
    );
  }
}
