import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Store } from '../../../store';
import { deleteStory } from '../../../utils';

interface Story {
  name: string;
}

interface Props {
  store: Store;
  story: Story;
}

export const DataStoryWidgetActions: FC<Props> = observer(
  ({ store, story }) => {
    return (
      <div className="absolute top-0 right-0 m-4">
        <div className="flex space-x-2">
          <span
            className=" text-gray-200 hover:text-malibu-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('editing story');
            }}
          >
            <i className="far fa-edit"></i>
          </span>

          <span
            className=" text-gray-200 hover:text-malibu-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              console.log('deleting story');
              deleteStory(store, story.name);
            }}
          >
            <i className="fas fa-minus"></i>
          </span>
        </div>
      </div>
    );
  },
);
