import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Store } from '../../../lib/store';
import { SplashSectionHeader } from './SplashSectionHeader';
import { SplashStoryGrid } from './SplashStoryGrid';

interface Props {
  store: Store;
}

export const Splash: FC<Props> = observer(({ store }) => {
  const userHaveStories =
    store.metadata.stories.length !== 0;

  return (
    <div className="h-screen">
      <SplashSectionHeader text={'Quick start:'} />
      <SplashStoryGrid
        stories={store.metadata.demos}
        store={store}
      />

      {userHaveStories && (
        <>
          <SplashSectionHeader text={'Your stories:'} />
          <SplashStoryGrid
            stories={store.metadata.stories}
            store={store}
          />
        </>
      )}
    </div>
  );
});
