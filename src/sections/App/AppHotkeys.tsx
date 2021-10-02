import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';
import { NodeModel } from '../../lib/diagram';
import { Store } from '../../lib/store';

interface Props {
  store: Store;
}

export const AppHotkeys: FC<Props> = observer(
  ({ store }) => {
    useHotkeys('shift+d', () => {
      store.setPage('Workbench');
    });

    useHotkeys('shift+t', () => {
      store.setPage('Inspector');
    });

    useHotkeys('shift+j', () => {
      store.setPage('DiagramJson');
    });

    useHotkeys('shift+l', () => {
      store.setPage('Log');
    });

    useHotkeys(
      'enter',
      () => {
        const selection = store
          .getModel()
          .getSelectedEntities();

        // Must be an unambiguous selection of a single NodeModel entity
        if (
          selection.length === 1 &&
          selection[0] instanceof NodeModel
        ) {
          const node = selection[0];
          store.openNodeModal(node.id);
        }
      },
      {
        filter: () =>
          store.getModel().getOptions().locked === false,
      },
    );

    useHotkeys('left', () => {
      const direction = { x: -1, y: 0 };
      store.navigateDiagram(direction);
    });

    useHotkeys('right', () => {
      const direction = { x: 1, y: 0 };
      store.navigateDiagram(direction);
    });

    return null;
  },
);
