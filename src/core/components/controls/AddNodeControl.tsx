import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import NodeSearch from './NodeSearch';
import Mousetrap from 'mousetrap';
import { Store } from '../../store/';

const customStyles = {
  content: {
    maxWidth: '450px',
    top: '110px',
    left: '120px',
    //top                   : '25%',
    //left                  : '25%',
    //right                 : 'auto',
    //bottom                : 'auto',
    //marginRight           : '-50%',
    //transform             : 'translate(-50%, -50%)'
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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
if (process.env.NODE_ENV !== 'test')
  Modal.setAppElement('#app');

interface Props {
  store: Store;
}

const AddNodeControl: FC<Props> = ({ store }) => {
  useEffect(() => {
    Mousetrap.bind(
      '?', // shift+plus
      (e) => {
        e.preventDefault();
        onClick();
      },
    );
  }, []);

  const [id, title, icon] = [
    'add-node',
    'Add Node',
    'fas fa-plus',
  ];

  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  // Unneeded?
  // const renderIcon = () => {
  //   return (
  //     <span
  //       title={this.title}
  //       className={this.style()}
  //       onClick={this.onClick.bind(this)}
  //     >
  //       <i className={this.icon}></i>
  //     </span>
  //   );
  // }

  const closeModal = () => {
    //this.props.store.diagram.engine.model.setLocked(false);
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
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <NodeSearch store={store} onFinish={closeModal} />
      </Modal>
    </span>
  );
};

export default observer(AddNodeControl);
