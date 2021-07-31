import {
  DefaultLinkModel,
  DiagramModel as DefaultDiagramModel,
} from '@projectstorm/react-diagrams';
import NodeModel from './NodeModel';
import { SerializedReactDiagram } from './types/SerializedReactDiagram';
import VERSION from './utils/version';

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export default class DiagramModel extends DefaultDiagramModel {
  latestNodes: NodeModel[] = [];

  addNode(node) {
    this.attemptLinkToLatest(node);
    this.smartInspectorNames(node);
    this.latestNodes.unshift(node);
    return super.addNode(node);
  }

  serialize(): SerializedReactDiagram {
    // The default react-diagrams format
    const layered = super.serialize();

    let simplified = {
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

    if (locked) {
      //console.log(this.listeners)
      // this.deregisterListener(DiagramListener)
      //this.deregisterListener('zoom')
    } else {
      //this.registerListener(DiagramListener)
      //this.registerListener('zoom')
    }
  }

  smartInspectorNames(node) {
    if (node.options.name != 'Inspect') return;

    const nameParam = node.options.parameters.find(
      (n) => n.name == 'node_name',
    );

    const sourceLink: any =
      Object.values(node.ports?.Input?.links)[0] ?? null;
    if (!sourceLink) return;
    const sourcePortName =
      sourceLink.sourcePort.options.name ?? false;

    // It must be a specific name to make sense
    if (!sourcePortName || sourcePortName == 'Output')
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
}
