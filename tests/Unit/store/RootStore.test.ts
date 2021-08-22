import NodeModel from '../../../src/diagram/models/NodeModel';
import EngineFactory from '../../../src/diagram/factories/EngineFactory';
import { Store } from '../../../src/store';
import { generateRandomString } from '../../Browser/helpers';

describe('RootStore', () => {
  const store = new Store();
  const random = () => `${Math.random}`;

  // it("Clears link labels", () => {
  //    store.diagram.engine.model.layers[0].models = ;
  // })

  it('Changes page to inspector', () => {
    const id = random();
    store.goToInspector(id);

    expect(store.metadata.activeInspector.nodeId).toEqual(
      id,
    );
    expect(store.metadata.page).toEqual('Inspector');
  });

  it('Sets the active story', () => {
    const story = random();
    store.setActiveStory(story);

    expect(store.metadata.activeStory).toEqual(story);
  });

  it('Sets the active inspector', () => {
    const nodeId = random();
    store.setActiveInspector(nodeId);

    expect(store.metadata.activeInspector.nodeId).toEqual(
      nodeId,
    );
  });

  it('Sets the available nodes', () => {
    const nodes = Array.from({ length: 20 }, () =>
      random(),
    );
    store.setAvailableNodes(nodes);

    expect(store.diagram.availableNodes).toEqual(nodes);
  });

  it('Sets the engine', () => {
    const engine = random();
    store.setEngine(engine);

    expect(store.diagram.engine).toEqual(engine);
  });

  // it('Sets the page', () => {
  //   const page = random();
  //   store.setPage(page);

  //   expect(store.metadata.page).toEqual(page);
  // });

  it('Sets the result', () => {
    const results = random();
    store.setResults(results);

    expect(store.results).toEqual(results);
  });

  it('Sets running', () => {
    store.setRunning();

    expect(store.metadata.running).toEqual(true);
  });

  it('Sets stories', () => {
    const stories = Array.from({ length: 20 }, () =>
      random(),
    );
    store.setStories(stories);

    expect(store.metadata.stories).toEqual(stories);
  });

  it('Adds node', () => {
    const engine = EngineFactory.default();
    store.setEngine(engine);

    const name = generateRandomString();
    store.addNode({
      name: name,
    });

    const nodeExist = store.diagram.engine
      .getModel()
      .getNodes()
      .some((node) => node.name === name);

    expect(nodeExist).toBe(true);
  });

  it('Can clear results', () => {
    const engine = EngineFactory.default();
    store.setEngine(engine);

    store.addNode({
      name: 'find-me',
      features: [1, 2, 3],
    });
    store.clearResults();

    const node = store.diagram.engine
      .getModel()
      .getNodes()
      .find((node) => node.name === 'find-me');

    expect(node.features).toStrictEqual([]);
  });
});
