import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import NodeModel from '../../../diagram/models/NodeModel';
import { Store } from '../../../store';

interface Props {
  store: Store;
  node: NodeModel;
  handleOpenModalRequest: () => void;
}

const NodeOpenModalRequest: FC<Props> = ({
  store,
  node,
  handleOpenModalRequest,
}) => {
  useEffect(() => {
    // Hotkeys can trigger a selected nodeWidget to open its modal
    const hasOpenModalRequest =
      node.id == store.metadata.requestOpenNodeModal;

    if (hasOpenModalRequest) {
      handleOpenModalRequest();
    }
  }, [store, node]);

  return null;
};

export default observer(NodeOpenModalRequest);
