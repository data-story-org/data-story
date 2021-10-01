import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import { modalStyle } from '../../../lib/utils';
import { Store, withStore } from '../../../lib/store';

import { OutputNodeWidgetHeader } from './OutputNodeHeader';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { NodeModel } from '../../../lib/diagram';

interface Props {
  engine: DiagramEngine;
  node: NodeModel;
}

export const OutputNodeWidget: FC<Props> = withStore(
  ({ engine, node, store }) => {
    return (
      <div className="flex text-xxs text-gray-200">
        <div className="flex-grow-0 max-w-md rounded-full">
          <div className="rounded-full">
            <OutputNodeWidgetHeader node={node} />
          </div>
        </div>
      </div>
    );
  },
);
