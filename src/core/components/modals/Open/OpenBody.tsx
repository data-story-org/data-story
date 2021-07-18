import React, { FC } from 'react';
import { Store } from '../../../store';
import { observer } from 'mobx-react';

interface Props {
  store: Store;
  clickStory: (name: string) => void;
}

const OpenModalBody: FC<Props> = ({
  store,
  clickStory,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
          <ul>
            {store.metadata.stories.map((story) => {
              return (
                <li
                  className="my-1 hover:text-malibu-500 hover:underline cursor-pointer"
                  key={story}
                  onClick={() => {
                    clickStory(story);
                  }}
                >
                  {story}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default observer(OpenModalBody);
