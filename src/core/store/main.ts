import { action, observable } from 'mobx';
import NodeModel from '../../core/NodeModel';
import clientFactory from '../clients/ClientFactory';

export class Store {
  results;

  @observable diagram = {
    engine: null,
    availableNodes: [],
    refresh: 0,
    latestNodes: [],
    nodeSerial: 1,
  };

  @observable metadata = {
    running: false,
    page: 'Workbench',
    activeInspector: null,
    stories: [],
    activeStory: '',
    client: clientFactory((window as any).config),
  };

  @action.bound addNode(data): void {
    this.diagram.engine.model.addNode(
      new NodeModel({
        serial: this.diagram.nodeSerial++,
        ...data,
      }),
    );

    this.refreshDiagram();
  }

  @action.bound clearLinkLabels(): void {
    Object.values(
      this.diagram.engine.model.layers[0].models,
    ).forEach((link: any) => {
      link.labels = [];
    });
  }

  @action.bound goToInspector(id): void {
    this.metadata.activeInspector = id;
    this.metadata.page = 'Inspector';
  }

  @action.bound nodesWithInspectables() {
    // React diagram is not observable outside of its own context
    // Reference the refresh counter to ensure we have the latest data
    this.diagram.refresh;

    // Get all nodes with features
    return this.diagram.engine.model
      .getNodes()
      .filter((node) => node.isInspectable());
  }

  @action.bound refreshDiagram(): void {
    this.diagram.refresh++;
  }

  @action.bound increaseNodeSerial(): void {
    this.diagram.nodeSerial++;
  }

  @action.bound setActiveStory(story): void {
    this.metadata.activeStory = story;
  }

  @action.bound setActiveInspector(nodeId): void {
    this.metadata.activeInspector = nodeId;
  }

  @action.bound setAvailableNodes(nodes): void {
    this.diagram.availableNodes = nodes;
  }

  @action.bound setEngine(engine): void {
    this.diagram.engine = engine;
  }

  @action.bound setPage(name): void {
    this.clearLinkLabels();
    this.metadata.page = name;
  }

  @action.bound setResults(results): void {
    this.results = results;
  }

  @action.bound setNotRunning(): void {
    setTimeout(() => {
      this.metadata.running = false;
    }, 500);
  }

  @action.bound setRunning(): void {
    this.metadata.running = true;
  }

  @action.bound setStories(stories): void {
    this.metadata.stories = stories;
  }
}
export default (window as any).store = new Store();
