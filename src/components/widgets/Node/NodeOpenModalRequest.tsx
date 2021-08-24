import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeModel } from '../../../diagram/models';
import { Store, withStore } from '../../../store';

interface Props {
  store: Store;
  node: NodeModel;
  handleOpenModalRequest: (store: Store) => void;
}

const NodeOpenModalRequest: FC<Props> = ({
  store,
  node,
  handleOpenModalRequest,
}) => {
  useEffect(() => {
    if (node.id === store.metadata.requestOpenNodeModal) {
      handleOpenModalRequest(store);
    }
  }, [node.id, store.metadata.requestOpenNodeModal]);

  return null;
};

export default withStore(observer(NodeOpenModalRequest));
