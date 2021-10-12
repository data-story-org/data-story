import React, { FC } from 'react';
import { Diagram } from './Diagram';
import { Store } from '../../../lib/store';
import { observer } from 'mobx-react-lite';

interface Props {
  store: Store;
}

export const Workbench: FC<Props> = observer(
  ({ store }) => {
    return (
      <div id="app-workbench">
        <Diagram store={store} />
      </div>
    );
  },
);
