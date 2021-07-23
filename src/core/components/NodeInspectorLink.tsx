import React, { FC } from 'react';

import { observer } from 'mobx-react';
import { Store } from '../store';

interface Props {
  store: Store;
  nodeId: number;
}

const NodeInspectorLink: FC<Props> = ({
  store,
  nodeId,
}) => {
  // Listen to a property to force refresh
  store.diagram.refresh;

  const node = store.diagram.engine.model.getNode(nodeId);

  return (
    node.isInspectable() && (
      <div
        id="inspector-icon"
        onClick={(_) => {
          store.goToInspector(nodeId);
        }}
      >
        <i className="mr-2 text-malibu-600 fas fa-search hover:cursor"></i>
      </div>
    )
  );
};

export default observer(NodeInspectorLink);
