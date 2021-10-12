import React, { FC, useEffect, useState } from 'react';
import { SaveStoryI } from './SaveStoryI';
import { StoryWidgetBody } from './BaseStoryModalBody';
import { StoryWidgetActions } from './BaseStoryModalActions';
import { StoryWidgetModalHeader } from './BaseStoryModalHeader';
import { useHotkeys } from 'react-hotkeys-hook';
import { BaseEventHandler } from '../../../lib/types';

export type StoryWidgetSaver = (story: SaveStoryI) => void;

interface Props {
  defaultStory?: SaveStoryI;
  storySaver: StoryWidgetSaver;
  handleCancel: BaseEventHandler;
  withHeader?: boolean;
}

export const BaseStoryWidgetModal: FC<Props> = ({
  defaultStory,
  storySaver,
  handleCancel,
  withHeader = true,
}) => {
  useHotkeys(
    'enter',
    (e) => {
      e.stopPropagation();
      storySaver(story);
    },
    {
      enableOnTags: ['INPUT'],
    },
  );

  const [story, setStory] = useState<SaveStoryI>({
    name: '',
    description: '',
    tags: {},
  });

  useEffect(() => {
    if (defaultStory) {
      setStory({
        name: defaultStory.name,
        description: defaultStory.description,
        tags: Object.assign({}, defaultStory.tags),
      });
    }
  }, [defaultStory]);

  const handleChange =
    (field: string, tagKey: number = 0) =>
    (e) => {
      field === 'tags'
        ? setStory({
            ...story,
            [field]: {
              ...story.tags,
              [tagKey]: e.target.value,
            },
          })
        : setStory({
            ...story,
            [field]: e.target.value,
          });
    };

  const addTag = (e) => {
    setStory({
      ...story,
      tags: {
        ...story.tags,
        [Object.keys(story.tags).length]: '',
      },
    });
  };

  return (
    <div id="story-modal">
      {withHeader && (
        <StoryWidgetModalHeader
          story={story}
          handleCancel={handleCancel}
        />
      )}
      <StoryWidgetBody
        story={story}
        handleChange={handleChange}
        addTag={addTag}
      />
      <StoryWidgetActions
        handleSave={(e) => {
          storySaver(story);
        }}
        handleCancel={handleCancel}
      />
    </div>
  );
};
