import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../store';
import { DiagramModel } from '../../diagram/models';
import { DataStoryWidget } from '../widgets/DataStory';

interface Props {
  store: Store;
}

const Splash: FC<Props> = ({ store }) => {
  const onClick = (name: string) => {
    try {
      const engine = store.diagram.engine;
      const model = new DiagramModel();

      engine.setModel(model);
      store.importDemo(name);
      store.setPage('Workbench');
    } catch (e) {
      alert(
        `Could not create engine for demo ${name}. See console for details.`,
      );
      console.error(e);
    }
  };

  return (
    <div className="h-screen">
      <div className="pt-5 bg-gray-600 text-gray-300 items-center text-lg font-black flex justify-around">
        Quick start:
      </div>
      <div className="px-10 py-5 bg-gray-600  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {store.metadata.demos.map((demo, i) => {
          return (
            <div key={`i-${demo.name}`}>
              <DataStoryWidget
                story={demo}
                storyLoadHandler={onClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Splash);
