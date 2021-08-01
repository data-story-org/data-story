import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import { modalStyle } from '@data-story-org/core';
import OpenModal from '../modals/Open';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const OpenControl: FC<Props> = ({ store }) => {
  const [title, icon] = ['Open story', 'fas fa-folder'];
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
        <OpenModal store={store} closeModal={closeModal} />
      </Modal>
    </span>
  );
};

export default observer(OpenControl);
