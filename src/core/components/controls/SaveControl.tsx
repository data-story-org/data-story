import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import modalStyle from '@data-story-org/core/src/utils/modalStyle';
import SaveModal from '../modals/SaveModal';
import { Store } from '../../store/main';

interface Props {
  store: Store;
}

const SaveControl: FC<Props> = observer(({ store }) => {
  const [title, icon] = ['Save story', 'fas fa-save'];
  const [isOpen, setIsOpen] = useState(false);
  const [defaultStory, _setDefaultStory] = useState(
    store.metadata.activeStory,
  );

  const onClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    //this.props.store.diagram.engine.model.setLocked(false);
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
          defaultStory={defaultStory}
          closeModal={closeModal}
        />
      </Modal>
    </span>
  );
});

export default SaveControl;
