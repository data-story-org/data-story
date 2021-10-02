import React, { FC } from 'react';
import { GenericStory } from '../../../lib/types';
import { StorySearch } from '../../searches';

interface Props {
  stories: GenericStory[];
  setSearchResult: (result: GenericStory[]) => void;
}

export const SplashStorySearch: FC<Props> = ({
  stories,
  setSearchResult,
}) => {
  return (
    <div className="sticky top-5 z-50 flex items-center justify-center">
      <div className="max-w-md flex-auto">
        <StorySearch
          stories={stories}
          setSearchResult={setSearchResult}
        />
      </div>
    </div>
  );
};
