import React, { FC, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { observer } from 'mobx-react-lite';
import { Store } from '../../..//store';
import SaveModalBody from './SaveBody';
import SaveModalActions from './SaveActions';
import BaseModalHeader from '../BaseModalHeader';
import { SaveStoryI } from './SaveStoryI';
import { DataStory } from '@data-story-org/core';
import { SerializedReactDiagram } from '../../../types';

interface Props {
  store: Store;
  closeModal: () => void;
}

const SaveModal: FC<Props> = ({
  store,
  closeModal,
}: Props) => {
  const [story, setStory] = useState<SaveStoryI>({
    name: store.metadata.activeStory,
    desc: '',
    tags: {},
  });

  useHotkeys(
    'enter',
    (e) => {
      e.stopPropagation();
      handleSave(e);
    },
    {
      enableOnTags: ['INPUT'],
    },
  );

  const handleChange =
    (field: string, tagKey: number = 0) =>
    (e) => {
      field === 'tags'
        ? setStory({
            ...story,
            [field]: {
              ...story.tags,
              [tagKey]: e.target.value,
            },
          })
        : setStory({
            ...story,
            [field]: e.target.value,
          });
    };

  const addTag = (e) => {
    console.log('aga');
    setStory({
      ...story,
      tags: {
        ...story.tags,
        [Object.keys(story.tags).length]: '',
      },
    });
  };

  const handleCancel = (_e) => {
    closeModal();
  };

  const handleSave = (_e) => {
    store.getModel().clearLinkLabels();

    const dataStory = new DataStory<SerializedReactDiagram>(
      story.name,
      story.desc,
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
    <div>
      <BaseModalHeader action="save" />
      <SaveModalBody
        handleChange={handleChange}
        addTag={addTag}
        story={story}
      />
      <SaveModalActions
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </div>
  );
};

export default observer(SaveModal);
