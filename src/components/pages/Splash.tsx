import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../store';
import { DiagramModel } from '../../diagram/models';

interface Props {
  store: Store;
}

const Splash: FC<Props> = ({ store }) => {
	const onClick = (name: string) => {
    try {
      const engine = store.diagram.engine;
      const model = new DiagramModel();
			engine.setModel(model);
			store.importDemo(name)
      store.setPage('Workbench')
    } catch (e) {
      alert(
        `Could not create engine for demo ${name}. See console for details.`,
      );
      console.error(e);
    }
	}

  return (
<div className="h-screen">
<div className="pt-5 bg-gray-600 text-gray-300 items-center text-lg font-black flex justify-around">Quick start:</div>
	<div className="px-10 py-5 bg-gray-600  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">	
		{store.metadata.demos.map(demo => {
			return (
				<div 
					key={demo.name}
					className="cursor-pointer rounded bg-gray-400 hover:shadow-xl overflow-hidden shadow-lg"
					onClick={() => onClick(demo.name)}
				>
					<div className="px-6 py-4">
						<div className="font-bold text-xl mb-2">{demo.name}</div>
						<p className="text-gray-700 text-base">
							{(demo as any).description}
						</p>
					</div>
					<div className="px-6 pt-4 pb-2">
						{demo.tags.map((tag: string) => {
							return (
								<span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
							)
						})}
					</div>
    		</div>
			)})
		}			
  </div>
</div>
  );
}

export default observer(Splash);
