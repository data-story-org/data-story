import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Store } from '../../../lib/store';
import { BaseVoidEventHandler } from '../../../lib/types';
import { deleteStory } from '../../../lib/utils';

interface Story {
  name: string;
}

interface Props {
  store: Store;
  story: Story;
  onEdit: BaseVoidEventHandler;
}

export const DataStoryWidgetActions: FC<Props> = observer(
  ({ store, story, onEdit }) => {
    return (
      <div className="absolute top-0 right-0 m-4">
        <div className="flex space-x-2">
          <span
            className=" text-gray-200 hover:text-malibu-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onEdit();
            }}
          >
            <i className="fa fa-pencil-square"></i>
          </span>

          <span
            className=" text-gray-200 hover:text-malibu-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

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
