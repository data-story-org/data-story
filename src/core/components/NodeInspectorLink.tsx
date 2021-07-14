import React, { FC } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '../store/StoreProvider';

interface Props {
  nodeId: number;
}

const NodeInspectorLink: FC<Props> = observer(
  ({ nodeId }: Props) => {
    const store = useStore();
    // Listen to a property to force refresh
    store.diagram.refresh;

    let node = store.diagram.engine.model.getNode(nodeId);

    return (
      node.isInspectable() && (
        <div
          onClick={(e) => {
            store.goToInspector(nodeId);
          }}
        >
          <i className="mr-2 text-malibu-600 fas fa-search hover:cursor"></i>
        </div>
      )
    );
  },
);

export default NodeInspectorLink;
