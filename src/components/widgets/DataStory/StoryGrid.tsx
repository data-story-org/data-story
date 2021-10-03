import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Store } from '../../../lib/store';
import { loadDemo, loadStory } from '../../../lib/utils';
import { GenericStory } from '../../../lib/types';
import { DataStoryWidget } from '../../widgets';

interface Props {
  store: Store;
  stories: GenericStory[];
  isDemos?: boolean;
  afterStoryClick?: () => void;
}

const storyGridStyle =
  'px-10 py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5';

export const StoryGrid: FC<Props> = observer(
  ({
    store,
    stories,
    isDemos = false,
    afterStoryClick = () => {},
  }) => {
    const onClick = (name: string) => {
      isDemos
        ? loadDemo(store, name)
        : loadStory(store, name);

      afterStoryClick();
      store.setPage('Workbench');
    };

    return (
      <div className={storyGridStyle}>
        {stories.map((story, i) => {
          return (
            <div key={`${i}-${story.name}`}>
              <DataStoryWidget
                store={store}
                story={story}
                storyLoadHandler={onClick}
                isStoryDemo={isDemos}
              />
            </div>
          );
        })}
      </div>
    );
  },
);
