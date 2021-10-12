import React, { FC } from 'react';
import { BaseEventHandler } from '../../../lib/types';
import { SaveStoryI } from './SaveStoryI';

interface Props {
  story: SaveStoryI;
  handleCancel: BaseEventHandler;
}

export const StoryWidgetModalHeader: FC<Props> = ({
  story,
  handleCancel,
}) => {
  return (
    <div className="w-full bg-gray-100 p-6 font-bold border-b border-gray-300">
      <div className="flex justify-between">
        <p className="text-lg font-medium text-gray-900 text-bold">
          <span className="text-indigo-500">
            {story.name || 'Story Name'}
          </span>
        </p>
        <p
          className="text-sm font-medium text-bold text-gray-400 hover:text-gray-500"
          onClick={handleCancel}
        >
          <i className="fa fa-close"></i>
        </p>
      </div>
    </div>
  );
};
