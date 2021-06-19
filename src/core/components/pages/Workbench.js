import React from 'react';
import Diagram from '../Diagram';
import store from '../../store/main'

export default class Workbench extends React.Component {
    render() {
        return (<div>
            <Diagram store={store}/>
			{/* <div className="flex justify-between">
				<div className="flex">
					<div className="mx-4 my-2">One</div>
					<div className="mx-4 my-2">Two</div>					
				</div>
				<div className="mx-4 my-2">Table</div>
			</div> */}
		</div>);
    }
}

