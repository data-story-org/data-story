import React, { FC } from 'react';
import { Store } from '../../../store';
import { observer } from 'mobx-react-lite';
import { DataStoryWidget } from '../../widgets/DataStory';

interface Props {
  store: Store;
  clickStory: (name: string) => void;
}

export const OpenModalBody: FC<Props> = observer(
  ({ store, clickStory }) => {
    return (
      <div>
        <div className="w-full bg-gray-100 px-6 py-2">
          <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs">
            <span className="my-2 font-sans font-medium text-sm text-indigo-500">
              Your Diagrams
            </span>
            <div className="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {store.metadata.stories.map((story, i) => {
                return (
                  <div key={`${i}-${story.name}`}>
                    <DataStoryWidget
                      store={store}
                      story={story}
                      storyLoadHandler={clickStory}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
