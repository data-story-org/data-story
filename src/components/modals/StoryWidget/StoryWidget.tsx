import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../../lib/store';
import {
  GenericStory,
  BaseEventHandler,
  DataStory,
} from '../../../lib/types';
import { BaseStoryWidgetModal } from '../BaseStoryModal';
import { SaveStoryI } from '../BaseStoryModal/SaveStoryI';
import { saveStory } from '../../../lib/utils';

interface Props {
  store: Store;
  defaultStory: GenericStory;
  handleCancel: BaseEventHandler;
}

export const StoryWidgetModal: FC<Props> = observer(
  ({ store, defaultStory, handleCancel }) => {
    const handleStoryEdit = async (story: SaveStoryI) => {
      const dataStory = new DataStory(
        story.name,
        story.description,
        Object.values(story.tags),
        store.getModel().serialize(),
      );

      await saveStory(store, dataStory);
      handleCancel(1);
    };

    return (
      <div>
        <BaseStoryWidgetModal
          defaultStory={defaultStory}
          storySaver={handleStoryEdit}
          handleCancel={handleCancel}
          store={store}
        />
      </div>
    );
  },
);
