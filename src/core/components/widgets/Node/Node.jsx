import React, { useState } from 'react';
import Modal from 'react-modal';
import { modalStyle } from '@data-story-org/core';
import { withStore } from '../../../store';

import NodeWidgetHeader from './NodeHeader';
import NodeWidgetInPorts from './NodeInPorts';
import NodeWidgetOutPorts from './NodeOutPorts';
import NodeWidgetModal from '../../modals/NodeWidget';
// import NodeModel from '../NodeModel';

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

  return (
    <div
      className={'flex font-mono text-xxs text-gray-200'}
      onDoubleClick={open}
    >
      <div className="flex-grow-0 max-w-md">
        <NodeWidgetHeader node={node} />
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

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <NodeWidgetModal
          node={node}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default withStore(NodeWidget);
