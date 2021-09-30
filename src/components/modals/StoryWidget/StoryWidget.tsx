import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import partition from 'lodash/partition';
import { Store } from '../../../store';
import { Story, GenericStory } from '../../../types';
import { BaseStoryWidgetModal } from '../BaseStoryModal';
import { SaveStoryI } from '../BaseStoryModal/SaveStoryI';

interface Props {
  store: Store;
  defaultStory: GenericStory;
  handleCancel: (e) => void;
}

export const StoryWidgetModal: FC<Props> = observer(
  ({ store, defaultStory, handleCancel }) => {
    const isThisEditedStory = (story: Story) => {
      return story.name === defaultStory.name;
    };

    const handleStoryEdit = (story: SaveStoryI) => {
      const [omitedStories, stories] = partition(
        store.metadata.stories,
        isThisEditedStory,
      );

      const omitedStory = omitedStories[0];
      const updatedStory = {
        ...omitedStory,
        name: story.name,
        description: story.description,
        tags: Object.values(story.tags),
      };

      store.setStories([...stories, updatedStory]);

      localStorage.removeItem(defaultStory.name);
      store.metadata.client
        .save(updatedStory)
        .then(() => {
          handleCancel(1);
        })
        .catch((err) => {
          alert('Save error');
        });
    };

    return (
      <div>
        <BaseStoryWidgetModal
          defaultStory={defaultStory}
          storySaver={handleStoryEdit}
          handleCancel={handleCancel}
        />
      </div>
    );
  },
);
