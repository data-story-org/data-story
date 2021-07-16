import React, { FC, useState } from 'react';
import {
  DiagramEngine,
  PortWidget,
} from '@projectstorm/react-diagrams';
import { CanvasEngine } from '@projectstorm/react-canvas-core';
import Modal from 'react-modal';

import NodeWidgetModal from './modals/NodeWidgetModal';
import NodeInspectorLink from './NodeInspectorLink';
import modalStyle from '@data-story-org/core/src/utils/modalStyle';
import NodeModel from '../NodeModel';
import { observer } from 'mobx-react';
import { withStore } from '../store';

/**
 * Using a observer on this component will break things... :/
 * Instead put store dependent functionality in child components
 */

// TODO Fix type definitions for NodeWidget component
/* interface Props {
 *   engine: DiagramEngine;
 *   node: NodeModel;
 * } */

const NodeWidget = ({ engine, node }) => {
  const store = useStore()
  const [isOpen, setIsOpen] = useState(false);

  const renderHeading = () => {
    return (
      <div
        className={
          'flex justify-between items-center pr-2 py-1 border border-gray-900 font-bold rounded-lg bg-gray-700 ' +
          (node.isSelected() ? 'bg-malibu-900' : '')
        }
      >
        <span className="mx-4">
          {node.getDisplayName()}
        </span>
        <i className="fas fa-cog"></i>
      </div>
    );
  };

  const renderInPorts = () => {
    return Object.values(node.getInPorts()).map((port) => {
      return (
        <div
          className="flex w-full"
          key={port.options.name}
        >
          <PortWidget
            className="-mr-1 z-10 flex items-center text-lg justify-center fill-current text-malibu-700 hover:text-malibu-500"
            engine={engine}
            port={port}
          >
            <svg
              width="12px"
              height="12px"
              fill=""
              className="m-auto"
            >
              <polygon points="0,0 12,6 0,12" />
            </svg>
          </PortWidget>
          <div className="flex w-full items-center text-gray-200 py-1 border border-gray-900 rounded-lg bg-gray-500">
            <div className="flex items-center justify-between w-full">
              <span className="flex px-4 flex-1">
                {port.options.label}
              </span>
              <NodeInspectorLink
                store={store} nodeId={node.options.id}
              />
            </div>
          </div>
          <div className="ml-2">{/* Counterweight */}</div>
        </div>
      );
    });
  };

  const renderInspectIcon = () => {
    return (
      node.isInspectable() && (
        <div
          onClick={(e) => {
            store.goToInspector(node.options.id);
          }}
        >
          <i className="mr-2 text-malibu-600 fas fa-search hover:cursor"></i>
        </div>
      )
    );
  };

  const renderOutPorts = () => {
    return Object.values(node.getOutPorts()).map((port) => {
      return (
        <div
          className="flex w-full"
          key={port.options.name}
        >
          <div className="mr-2">{/* Counterweight */}</div>
          <div className="flex w-full items-center text-gray-200 py-1 border border-gray-900 rounded-lg bg-gray-500">
            <div className="flex items-center justify-between w-full">
              <span className="flex px-4 flex-1">
                {port.options.label}
              </span>
            </div>
          </div>
          <PortWidget
            className="-ml-1 z-10 flex items-center text-lg justify-center fill-current text-malibu-700 hover:text-malibu-500"
            engine={engine}
            port={port}
          >
            <svg
              width="12px"
              height="12px"
              fill=""
              className="m-auto"
            >
              <polygon points="0,0 12,6 0,12" />
            </svg>
          </PortWidget>
        </div>
      );
    });
  };

  const renderModal = () => {
    return (
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
    );
  };

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
        {renderHeading()}
        {renderInPorts()}
        {renderOutPorts()}
        <div className="w-32">
          {/* Enforce min width with this div*/}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default NodeWidget;
