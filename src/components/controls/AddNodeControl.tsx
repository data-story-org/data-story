import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BaseControl } from './BaseControl';
import ReactModal from 'react-modal';
import { NodeSearch } from '../searches';
import { Store } from '../../lib/store/';
import { useHotkeys } from 'react-hotkeys-hook';

const customStyles = {
  content: {
    maxWidth: '450px',
    top: '110px',
    left: '120px',
    padding: '0.25rem',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
};

interface Props {
  store: Store;
}

export const AddNodeControl: FC<Props> = observer(
  ({ store }) => {
    const [id, title, icon] = [
      'add-node',
      'Add Node',
      'fas fa-plus',
    ];

    const [isOpen, setIsOpen] = useState(false);

    // shift+plus
    useHotkeys('*', (e) => {
      if (e.key === '+') {
        e.preventDefault();
        onClick();
      }
    });

    // shift+plus on swedish keyboard layout
    useHotkeys('*', (e) => {
      if (e.key === '?') {
        e.preventDefault();
        onClick();
      }
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
          id={id}
          title={title}
          icon={icon}
          onClick={onClick}
        />
        <ReactModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <NodeSearch store={store} onFinish={closeModal} />
        </ReactModal>
      </span>
    );
  },
);
