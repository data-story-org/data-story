import React, { useState, useReducer, FC } from 'react';
import Modal from 'react-modal';
import { modalStyle } from '../../../lib/utils';
import {
  Store,
  withStore,
  withStoreProps,
} from '../../../lib/store';

import { NodeWidgetHeader } from './NodeHeader';
import { NodeWidgetInPorts } from './NodeInPorts';
import { NodeWidgetOutPorts } from './NodeOutPorts';
import { NodeWidgetModal } from '../../modals/NodeWidget';
import { NodeOpenModalRequest } from './NodeOpenModalRequest';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { NodeModel } from '../../../lib/diagram';

/**
 * Using a observer on this component will break things... :/
 * Instead put store dependent functionality in child components
 */

interface Props {
  engine: DiagramEngine;
  node: NodeModel;
}

export const NodeWidget: FC<Props> = withStore(
  ({ engine, node, store }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
      store.setDiagramLocked(true);
      setIsOpen(true);
    };

    const closeModal = () => {
      store.setDiagramLocked(false);
      setIsOpen(false);
    };

    const handleOpenModalRequest = (store) => {
      store.setDiagramLocked(true);
      setIsOpen(true);
      store.resetOpenNodeModalRequest();
    };

    return (
      <div
        className={'flex text-xxs text-gray-200'}
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

        <NodeOpenModalRequest
          node={node}
          handleOpenModalRequest={handleOpenModalRequest}
        />
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={modalStyle}
        >
          <NodeWidgetModal
            node={node}
            closeModal={closeModal}
            store={store}
          />
        </Modal>
      </div>
    );
  },
);
