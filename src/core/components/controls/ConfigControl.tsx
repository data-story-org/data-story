import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import modalStyle from '@data-story-org/core/src/utils/modalStyle';
import ConfigModal from '../modals/ConfigModal';
import { Store } from '../../store/main';

interface Props {
  store: Store;
}

const ConfigControl: FC<Props> = observer(({store}) => {
  const [title, icon] = ['Configuration', 'fas fa-cog'];
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
          <ConfigModal store={store} closeModal={closeModal} />
      </Modal>
    </span>
  );
});

export default ConfigControl;
