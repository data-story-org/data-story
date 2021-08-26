import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../..//store';
import SaveModalBody from './SaveBody';
import SaveModalActions from './SaveActions';
import BaseModalHeader from '../BaseModalHeader';
import { useHotkeys } from 'react-hotkeys-hook';

interface Props {
  store: Store;
  storyName: string;
  setStoryName: (story: string) => void;
  closeModal: () => void;
}

const SaveModal: FC<Props> = ({
  store,
  storyName,
  setStoryName,
  closeModal,
}: Props) => {
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

  const handleChange = (e) => {
    setStoryName(e.target.value);
  };

  const handleCancel = (_e) => {
    closeModal();
  };

  const handleSave = (_e) => {
    store.getModel().clearLinkLabels();

    store.metadata.client
      .save(storyName, store.getModel())
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
      <SaveModalBody handleChange={handleChange} />
      <SaveModalActions
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </div>
  );
};

export default observer(SaveModal);
