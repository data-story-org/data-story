import React, { FC } from 'react';
import { Store } from '../../../store';
import { observer } from 'mobx-react-lite';

interface Props {
  store: Store;
  clickDemo: (name: string) => void;
}

const HelpModalBody: FC<Props> = ({
  store,
  clickDemo,
}) => {
	
	let demos = []
	console.log(1, store.metadata.demos)
	for(const [name, diagram] of Object.entries(store.metadata.demos) as any) {
		demos.push({
			name,
			...diagram
		})
	}

	console.log(2, demos)
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs">
					<span className="my-2 font-sans font-medium text-sm text-indigo-500">
						Demos
					</span>
          <ul>
            {Object.values(demos).map(demo => {
							console.log(demo.name)
              return (
                <li
                  className="my-1 hover:text-malibu-500 hover:underline cursor-pointer font-mono"
                  key={demo.name}
                  onClick={() => {
                    clickDemo(demo.name as any);
                  }}
                >
                  {demo.name}
                </li>
              );
            })}
          </ul>					
        </div>
      </div>
    </div>
  );
};

export default observer(HelpModalBody);
