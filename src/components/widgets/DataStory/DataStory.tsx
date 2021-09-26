import React, { FC } from 'react';
import { Story as DefaultStory } from '@data-story-org/core';
import { SerializedReactDiagram } from '../../../types';

type Story =
  | DefaultStory<SerializedReactDiagram>
  | DefaultStory;

interface Props {
  story: Story;
  storyLoadHandler: (storyName: string) => void;
}

export const DataStoryWidget: FC<Props> = ({
  story,
  storyLoadHandler,
}) => {
  return (
    <div
      key={story.name}
      id="data-story"
      className="cursor-pointer rounded bg-gray-400 hover:shadow-xl overflow-hidden shadow-lg"
      onClick={() => storyLoadHandler(story.name)}
    >
      <div className="px-6 py-4">
        <div className="text-black font-bold text-xl mb-2">
          {story.name}
        </div>
        <p className="text-gray-700 text-base">
          {story.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {story.tags.map((tag: string) => {
          return tag ? (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ) : null;
        })}
      </div>
    </div>
  );
};
