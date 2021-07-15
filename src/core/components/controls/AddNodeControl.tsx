import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import NodeSearch from './NodeSearch';
import { useStore } from '../../store/StoreProvider';

import Mousetrap from 'mousetrap';

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
Modal.setAppElement('#app');

const AddNodeControl = observer(() => {
  useEffect(() => {
    Mousetrap.bind(
      '?', // shift+plus
      (e) => {
        e.preventDefault();
        onClick();
      },
    );
  }, []);

  const store = useStore();
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
      <BaseControl id={id} icon={icon} onClick={onClick} />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <NodeSearch onFinish={closeModal} />
      </Modal>
    </span>
  );
});

export default AddNodeControl;
