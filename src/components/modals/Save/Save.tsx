import { Story } from '@data-story-org/core';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Store } from '../../../lib/store';
import {
  BaseVoidEventHandler,
  SerializedReactDiagram,
} from '../../../lib/types';
import { BaseModalHeader } from '../BaseModalHeader';
import { BaseStoryWidgetModal } from '../BaseStoryModal';
import { SaveStoryI } from '../BaseStoryModal/SaveStoryI';

interface Props {
  store: Store;
  closeModal: BaseVoidEventHandler;
}

export const SaveModal: FC<Props> = observer(
  ({ store, closeModal }) => {
    const handleCancel = (_e) => {
      closeModal();
    };

    const handleSave = (story: SaveStoryI) => {
      store.getModel().clearLinkLabels();

      const dataStory = new Story<SerializedReactDiagram>(
        story.name,
        story.description,
        Object.values(story.tags),
        store.getModel().serialize(),
      );

      store.setStories([
        ...store.metadata.stories,
        dataStory,
      ]);

      store.metadata.client
        .save(dataStory)
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          alert('Save error');
        });
    };

    return (
      <div id="story-save">
        <BaseModalHeader action="save" />
        <BaseStoryWidgetModal
          storySaver={handleSave}
          handleCancel={handleCancel}
          withHeader={false}
        />
      </div>
    );
  },
);
