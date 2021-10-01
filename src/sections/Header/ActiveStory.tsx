import React, { FC } from 'react';
import { Store } from '../../lib/store';

interface Props {
  store: Store;
}

export const ActiveStory: FC<Props> = ({ store }) => {
  return (
    <span className="ml-2 text-sm text-gray-400 font-normal subpixel-antialiased">
      {store.metadata.activeStory
        ? store.metadata.activeStory
        : 'untitled'}
    </span>
  );
};
