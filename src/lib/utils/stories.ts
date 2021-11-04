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

    model.deserializeModel(serializedModel, engine);
    engine.setModel(model);

    store.setDiagramLocked(false);
		store.setPage('Workbench');
		store.setActiveStory(storyName)
  } catch (e) {
    alert(
      `Could not create engine for story ${storyName}. See console for details.`,
    );
    console.error(e);
  }
};

export const deleteStory = (
  store: Store,
  storyName: string,
) => {
  if (window.confirm(`Delete the '${storyName} story?'`)) {
    try {
      store.metadata.client.delete(storyName);

      const withoutDeletedStory =
        store.metadata.stories.filter(
          (story) => story.name !== storyName,
        );

      store.setStories(withoutDeletedStory);
    } catch (e) {
      alert(
        `Could not delete story ${storyName}. See console for details.`,
      );
      console.error(e);
    }
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
		store.setActiveStory('Untitled')		
  } catch (e) {
    alert(
      `Could not create engine for demo ${demoName}. See console for details.`,
    );
    console.error(e);
  }
};
