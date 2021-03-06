import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BaseControl } from './BaseControl';
import Modal from 'react-modal';
import { modalStyle } from '../../lib/utils';
import { ConfigModal } from '../modals/Config';
import { Store } from '../../lib/store';

interface Props {
  store: Store;
}

export const ConfigControl: FC<Props> = observer(
  ({ store }) => {
    const [title, icon] = ['Configuration', 'fas fa-cog'];
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
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
          <ConfigModal
            store={store}
            closeModal={closeModal}
          />
        </Modal>
      </span>
    );
  },
);
