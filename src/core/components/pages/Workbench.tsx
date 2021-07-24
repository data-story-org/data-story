import React, { FC } from 'react';
import Diagram from '../Diagram';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const Workbench: FC = ({ store }) => {
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
};

export default Workbench;
