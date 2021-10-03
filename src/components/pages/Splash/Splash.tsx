import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Store } from '../../../lib/store';
import { SplashSectionHeader } from './SplashSectionHeader';
import { GenericStory } from '../../../lib/types';
import { SplashStorySearch } from './SplashStorySearch';
import { StoryGrid } from '../../widgets';

interface Props {
  store: Store;
}

export const Splash: FC<Props> = observer(({ store }) => {
  const demos = store.metadata.demos;
  const userStories = store.metadata.stories;
  const stories = [...demos, ...userStories];

  const [userSearchedStories, setUserSearchedStories] =
    useState(stories);

  const isStorySearched = (story: GenericStory) => {
    return userSearchedStories.includes(story);
  };

  const userHaveStories =
    store.metadata.stories.length !== 0 &&
    userStories.some(isStorySearched);

  const userHaveDemos =
    store.metadata.stories.length !== 0 &&
    demos.some(isStorySearched);

  return (
    <div className="h-screen bg-gray-600 ">
      <SplashStorySearch
        stories={stories}
        setSearchResult={setUserSearchedStories}
      />

      {userHaveDemos && (
        <>
          <SplashSectionHeader text={'Quick start:'} />
          <StoryGrid
            stories={demos.filter(isStorySearched)}
            store={store}
          />
        </>
      )}

      {userHaveStories && (
        <>
          <SplashSectionHeader text={'Your stories:'} />
          <StoryGrid
            stories={userStories.filter(isStorySearched)}
            store={store}
          />
        </>
      )}
    </div>
  );
});
