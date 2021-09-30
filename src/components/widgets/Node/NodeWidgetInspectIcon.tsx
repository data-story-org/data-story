import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Store } from '../../../store';
import { NodeModel } from '../../../diagram/models';

interface Props {
  store: Store;
  node: NodeModel;
}

export const NodeWidgetInspectIcon: FC<Props> = observer(
  ({ store, node }) => {
    // Listen to a property to force refresh
    store.diagram.refresh;

    return (
      <>
        {node.isInspectable() ? (
          <div
            id="inspector-icon"
            onClick={(e) => {
              store.goToInspector(node.options.id);
            }}
          >
            <i className="mr-2 text-malibu-600 fas fa-search hover:cursor"></i>
          </div>
        ) : null}
      </>
    );
  },
);
