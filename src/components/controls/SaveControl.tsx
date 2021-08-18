import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';
import Modal from 'react-modal';
import { modalStyle } from '../../utils/modalStyle';

import BaseControl from './BaseControl';
import SaveModal from '../modals/Save';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const SaveControl: FC<Props> = ({ store }) => {
  const [title, icon] = ['Save story', 'fas fa-save'];
  const [isOpen, setIsOpen] = useState(false);
  const [defaultStory, setDefaultStory] = useState(
    store.metadata.activeStory,
  );

  useHotkeys('shift+s', () => {
    onClick();
  });

  const onClick = () => {
    store.setDiagramLocked(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    store.setDiagramLocked(false);
    setIsOpen(false);
  };

  return (
    <span>
      <BaseControl
        title={title}
        icon={icon}
        onClick={onClick}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <SaveModal
          store={store}
          storyName={defaultStory}
          setStoryName={setDefaultStory}
          closeModal={closeModal}
        />
      </Modal>
    </span>
  );
};

export default observer(SaveControl);
