import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import { modalStyle } from '../../utils/modalStyle'
import HelpModal from '../modals/Help';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const HelpControl: FC<Props> = ({ store }) => {
  const [title, icon] = ['Help', 'fas fa-question'];
  const [isOpen, setIsOpen] = useState(false);

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
        <HelpModal store={store} closeModal={closeModal} />
      </Modal>
    </span>
  );
};

export default observer(HelpControl);
