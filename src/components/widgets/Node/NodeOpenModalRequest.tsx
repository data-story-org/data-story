import React, { FC } from 'react';
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
  // Hotkeys can trigger a selected nodeWidget to open its modal
  const hasOpenModalRequest =
    node.id == store.metadata.requestOpenNodeModal;

  return (
    <>
      {hasOpenModalRequest
        ? handleOpenModalRequest()
        : null}
    </>
  );
};

export default observer(NodeOpenModalRequest);
