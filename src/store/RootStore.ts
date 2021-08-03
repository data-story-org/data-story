import { action, observable, makeObservable } from 'mobx';
import NodeModel from '../diagram/models/NodeModel';
import clientFactory from '../clients/ClientFactory';
import { showNotification } from '../utils/Notifications';

export class Store {
  results;

  diagram = {
    engine: null,
    availableNodes: [],
    refresh: 0,
    nodeSerial: 1,
  };

  metadata = {
    running: false,
    page: 'Workbench',
    activeInspector: null,
    requestOpenNodeModal: null,
    stories: [],
    activeStory: '',
    client: clientFactory((window as any).config),
  };

  constructor() {
    makeObservable(this, {
      // Observables
      diagram: observable,
      metadata: observable,

      // Setters
      addNode: action.bound,
      increaseNodeSerial: action.bound,
      goToInspector: action.bound,
      openNodeModal: action.bound,
      refreshDiagram: action.bound,
      resetOpenNodeModalRequest: action.bound,
      setActiveInspector: action.bound,
      setActiveStory: action.bound,
      setAvailableNodes: action.bound,
      setEngine: action.bound,
      setPage: action.bound,
      setResults: action.bound,
      setNotRunning: action.bound,
      setRunning: action.bound,
      setStories: action.bound,

      // Notifications
      showRunFail: action.bound,
      showRunSuccessful: action.bound,
    });
  }

  addNode(data) {
    delete data.id; // TODO remove id at availableNodes prep

    this.diagram.engine.model.addNode(
      new NodeModel({
        serial: this.diagram.nodeSerial++,
        ...data,
      }),
    );

    this.refreshDiagram();
  }

  goToInspector(id) {
    this.metadata.activeInspector = id;
    this.metadata.page = 'Inspector';
  }

  nodesWithInspectables() {
    // React diagram is not observable outside of its own context
    // Reference the refresh counter to ensure we have the latest data
    this.diagram.refresh;

    // Get all nodes with features
    return this.diagram.engine.model
      .getNodes()
      .filter((node) => node.isInspectable());
  }

  openNodeModal(nodeId: string): void {
    this.metadata.requestOpenNodeModal = nodeId;
    this.refreshDiagram();
  }

  resetOpenNodeModalRequest(): void {
    this.metadata.requestOpenNodeModal = null;
  }

  refreshDiagram() {
    this.diagram.refresh++;
  }

  increaseNodeSerial() {
    this.diagram.nodeSerial++;
  }

  setActiveStory(story) {
    this.metadata.activeStory = story;
  }

  setActiveInspector(nodeId) {
    this.metadata.activeInspector = nodeId;
  }

  setAvailableNodes(nodes) {
    this.diagram.availableNodes = nodes;
  }

  setEngine(engine) {
    this.diagram.engine = engine;
  }

  setPage(name) {
    this.diagram.engine.model.clearLinkLabels();
    const alreadyOnPage = this.metadata.page == name;
    this.metadata.page = alreadyOnPage ? 'Workbench' : name;
  }

  setResults(results) {
    this.results = results;
  }

  setNotRunning() {
    setTimeout(() => {
      this.metadata.running = false;
    }, 500);
  }

  setRunning() {
    this.metadata.running = true;
  }

  setStories(stories) {
    this.metadata.stories = stories;
  }

  showRunFail(error) {
    showNotification({
      message: 'Crap! Could not run story! Check console.',
      type: 'error',
    });
  }

  showRunSuccessful() {
    showNotification({
      message: 'Successfully ran story!',
      type: 'success',
    });
  }
}

export const RootStore = ((window as any).store =
  new Store());
