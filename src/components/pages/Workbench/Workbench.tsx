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
        {/* <div className="flex justify-between">
				<div className="flex">
					<div className="mx-4 my-2">One</div>
					<div className="mx-4 my-2">Two</div>					
				</div>
				<div className="mx-4 my-2">Table</div>
			</div> */}
      </div>
    );
  },
);
