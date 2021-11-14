import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Store } from '../../../lib/store';
import { loadDemo, loadStory } from '../../../lib/utils';
import {
  BaseVoidEventHandler,
  GenericStory,
} from '../../../lib/types';
import { DataStoryWidget } from '../../widgets';

interface Props {
  store: Store;
  stories: GenericStory[];
  isDemos?: boolean;
  visualSelectionStyles?: boolean;
  afterStoryClick?: BaseVoidEventHandler;
  currentSearchedStory?: RefObject<HTMLDivElement>;
}

const storyGridStyle =
  'px-10 py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5';

const selectedStoryStyle = 'saturate-100';
const unselectedStoryStyle =
  'opacity-50 shadow-inner hue-rotate-60';

export const StoryGrid: FC<Props> = observer(
  ({
    store,
    stories,
    isDemos = false,
    currentSearchedStory = null,
    visualSelectionStyles = false,
    afterStoryClick = () => {},
  }) => {
    const [cursor, setCursor] = useState(0);
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
          const selectedPredicate = i == cursor;

          const selected = visualSelectionStyles
            ? selectedPredicate
            : true;

          return (
            <div
              key={`${i}-${story.name}`}
              className={`self-start shadow-2xl hover:opacity-100 hover:shadow-2xl ${
                selected
                  ? selectedStoryStyle
                  : unselectedStoryStyle
              }
              `}
            >
              <DataStoryWidget
                store={store}
                story={story}
                storyLoadHandler={onClick}
                isStoryDemo={isDemos}
                ref={selected ? currentSearchedStory : null}
              />
            </div>
          );
        })}
      </div>
    );
  },
);
