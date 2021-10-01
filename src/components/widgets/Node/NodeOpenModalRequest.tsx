import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeModel } from '../../../diagram/models';
import { Store, withStore } from '../../../store';

interface Props {
  node: NodeModel;
  handleOpenModalRequest: (store: Store) => void;
}

export const NodeOpenModalRequest: FC<Props> = withStore(
  observer(({ store, node, handleOpenModalRequest }) => {
    useEffect(() => {
      if (node.id === store.metadata.requestOpenNodeModal) {
        handleOpenModalRequest(store);
      }
    }, [node.id, store.metadata.requestOpenNodeModal]);

    return null;
  }),
);
