import React, { FC } from 'react';
import {
  StorySearch,
  StorySearchProps,
} from '../../searches';

export const SplashStorySearch: FC<StorySearchProps> = ({
  stories,
  setSearchResult,
}) => {
  return (
    <div className="sticky top-5 z-30 flex items-center justify-center">
      <div className="max-w-md flex-auto">
        <div className="text-sm m-10">
          <StorySearch
            stories={stories}
            setSearchResult={setSearchResult}
          />
        </div>
      </div>
    </div>
  );
};
