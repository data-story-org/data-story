import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import { modalStyle } from '../../../utils/modalStyle';
import { Store, withStore } from '../../../store';

import OutputNodeWidgetHeader from './OutputNodeHeader';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { NodeModel } from '../../../diagram/models';

interface Props {
  engine: DiagramEngine;
  node: NodeModel;
  store: Store;
}

const OutputNodeWidget: FC<Props> = ({
  engine,
  node,
  store,
}) => {
  return (
    <div className="flex text-xxs text-gray-200">
      <div className="flex-grow-0 max-w-md rounded-full">
        <div className="rounded-full">
          <OutputNodeWidgetHeader node={node} />
        </div>
      </div>
    </div>
  );
};

export default withStore(OutputNodeWidget);
