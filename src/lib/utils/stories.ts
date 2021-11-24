import { DiagramModel } from '../diagram/models';
import { Store } from '../store';
import { Story } from '../types';
import partition from 'lodash/partition';

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
    store.setActiveStory(storyName);
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
  try {
    store.metadata.client.delete(storyName);

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
    store.setActiveStory('Untitled');
  } catch (e) {
    alert(
      `Could not create engine for demo ${demoName}. See console for details.`,
    );
    console.error(e);
  }
};

const isThisEditedStory =
  (defaultStory: Story) => (story: Story) => {
    return story.name === defaultStory.name;
  };

export const saveStory = async (
  store: Store,
  story: Story,
) => {
  const isSameStoryExist = store.metadata.stories.some(
    isThisEditedStory(story),
  );

  try {
    if (isSameStoryExist) {
      await editStory(store, story);
    } else {
      store.setStories([...store.metadata.stories, story]);
      await store.metadata.client.save(story);
    }
  } catch (err) {
    alert('Save error');
  }
};

export const editStory = async (
  store: Store,
  story: Story,
) => {
  try {
    const [editedStories, stories] = partition(
      store.metadata.stories,
      isThisEditedStory(story),
    );

    const storyToEdit = editedStories[0];
    const updatedStory = {
      ...storyToEdit,
      name: story.name,
      description: story.description,
      tags: story.tags,
    };

    store.setStories([...stories, updatedStory]);

    localStorage.removeItem(story.name);
    await store.metadata.client.save(updatedStory);
  } catch (err) {
    alert('Save error');
  }
};
