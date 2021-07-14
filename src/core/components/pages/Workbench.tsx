import React, {FC} from 'react';
import Diagram from '../Diagram';
import { useStore } from '../../store/StoreProvider';

const Workbench: FC = () => {
    const store = useStore();
    return (
      <div>
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
}

export default Workbench;
