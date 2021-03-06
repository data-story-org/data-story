import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BaseControl } from './BaseControl';
import Modal from 'react-modal';
import { modalStyle } from '../../lib/utils';
import { OpenModal } from '../modals/Open';
import { Store } from '../../lib/store';
import { useHotkeys } from 'react-hotkeys-hook';

interface Props {
  store: Store;
}

export const OpenControl: FC<Props> = observer(
  ({ store }) => {
    const [title, icon] = ['Open story', 'fas fa-folder'];
    const [isOpen, setIsOpen] = useState(false);

    useHotkeys('shift+o', (e) => {
      e.preventDefault();
      e.stopPropagation();
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
          closeTimeoutMS={250}
        >
          <OpenModal
            store={store}
            closeModal={closeModal}
          />
        </Modal>
      </span>
    );
  },
);
