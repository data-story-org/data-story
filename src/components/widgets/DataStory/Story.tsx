import React, { FC } from 'react';
import { Story as DefaultStory } from '@data-story-org/core';
import { SerializedReactDiagram } from '../../../types';
import { DataStoryWidgetActions } from './StoryActions';
import { DataStoryWidgetName } from './StoryName';
import { DataStoryWidgetDescription } from './StoryDescription';
import { DataStoryWidgetTags } from './StoryTags';
import { Store } from '../../../store';
import { observer } from 'mobx-react-lite';

type Story =
  | DefaultStory<SerializedReactDiagram>
  | DefaultStory;

interface Props {
  store: Store;
  story: Story;
  storyLoadHandler: (storyName: string) => void;
  isStoryDemo?: boolean;
}

const storyWidgetStyle =
  'cursor-pointer rounded bg-gray-400 hover:shadow-xl overflow-hidden shadow-lg';

export const DataStoryWidget: FC<Props> = observer(
  ({
    store,
    story,
    storyLoadHandler,
    isStoryDemo = false,
  }) => {
    return (
      <div
        key={story.name}
        id="data-story"
        className={storyWidgetStyle}
        onClick={() => storyLoadHandler(story.name)}
      >
        <div className="px-6 py-4 relative">
          {!isStoryDemo && (
            <DataStoryWidgetActions
              store={store}
              story={story}
            />
          )}

          <DataStoryWidgetName storyName={story.name} />
          <DataStoryWidgetDescription
            storyDesc={story.description}
          />
        </div>

        <div className="px-6 pt-4 pb-2">
          <DataStoryWidgetTags storyTags={story.tags} />
        </div>
      </div>
    );
  },
);
