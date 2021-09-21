import { DiagramModel } from '../diagram/models';
import { Store } from '../store';

export const loadStory = (
  store: Store,
  storyName: string,
) => {
  try {
    const engine = store.diagram.engine;
    const model = new DiagramModel();
    const serializedModel =
      store.metadata.client.load(storyName);

    console.log(serializedModel);

    model.deserializeModel(serializedModel, engine);
    engine.setModel(model);
  } catch (e) {
    alert(
      `Could not create engine for story ${storyName}. See console for details.`,
    );
    console.error(e);
  }
};

export const loadDemo = (
  store: Store,
  demoName: string,
) => {
  try {
    const engine = store.diagram.engine;
    const model = new DiagramModel();

    engine.setModel(model);
    store.importDemo(demoName);
  } catch (e) {
    alert(
      `Could not create engine for demo ${demoName}. See console for details.`,
    );
    console.error(e);
  }
};
