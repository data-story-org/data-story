import React, { useState } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import modalStyle from '@data-story-org/core/src/utils/modalStyle';
import ConfigModal from '../modals/ConfigModal';

const ConfigControl = observer(() => {
  const [title, icon] = ['Configuration', 'fas fa-key'];
  const [isOpen, setIsOpen] = useState(false);

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
        <ConfigModal closeModal={closeModal} />
      </Modal>
    </span>
  );
});

export default ConfigControl;
