import React, { useState } from 'react';
import Modal from 'react-modal';
import { modalStyle } from '@data-story-org/core';
import { withStore } from '../../../store';

import NodeWidgetHeader from './NodeHeader';
import NodeWidgetInPorts from './NodeInPorts';
import NodeWidgetOutPorts from './NodeOutPorts';
import NodeOpenModalRequest from './NodeOpenModalRequest';
import NodeWidgetModal from '../../modals/NodeWidget';

/**
 * Using a observer on this component will break things... :/
 * Instead put store dependent functionality in child components
 */

// TODO Fix type definitions for NodeWidget component
/* interface Props {
 *   engine: DiagramEngine;
 *   node: NodeModel;
 * } */

const NodeWidget = ({ engine, node, store }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    store.diagram.engine.model.setLocked(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    store.diagram.engine.model.setLocked(false);
    setIsOpen(false);
  };

  const handleOpenModalRequest = () => {
    store.resetOpenNodeModalRequest();
    setIsOpen(true);
  };

  return (
    <div
      className={'flex text-xxs text-gray-200'}
      onDoubleClick={open}
    >
      <div className="flex-grow-0 max-w-md">
        <NodeWidgetHeader node={node} store={store} />
        <NodeWidgetInPorts
          node={node}
          engine={engine}
          store={store}
        />
        <NodeWidgetOutPorts node={node} engine={engine} />
        <div className="w-32">
          {/* Enforce min width with this div*/}
        </div>
      </div>

      <NodeOpenModalRequest
        store={store}
        node={node}
        handleOpenModalRequest={handleOpenModalRequest}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <NodeWidgetModal
          store={store}
          node={node}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default withStore(NodeWidget);
