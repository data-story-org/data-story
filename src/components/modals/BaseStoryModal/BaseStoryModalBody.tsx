import React, { FC } from 'react';
import {
  baseFieldStyle,
  baseFieldTitleStyle,
} from '../../../lib/styles';
import { SaveStoryI } from './SaveStoryI';

interface Props {
  story: SaveStoryI;
  handleChange: (
    field: string,
    tagKey?: number,
  ) => (e: any) => void;
  addTag: (e: any) => void;
}

const fieldStyle = `${baseFieldStyle} w-full`;
const tagFieldStyle = `${baseFieldStyle} w-1/5 rounded-full text-center`;

export const StoryWidgetBody: FC<Props> = ({
  story,
  handleChange,
  addTag,
}) => {
  return (
    <div>
      <div className="bg-gray-100 px-6 py-2">
        <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs">
          <span className={baseFieldTitleStyle}>Name</span>
          <input
            onChange={handleChange('name')}
            className={fieldStyle}
            placeholder="descriptive story name"
            value={story.name}
          />

          <span className={baseFieldTitleStyle}>
            Description
          </span>
          <input
            onChange={handleChange('description')}
            type="textarea"
            className={fieldStyle}
            placeholder="story description"
            value={story.description}
          />

          <span className={baseFieldTitleStyle}>Tags</span>
          <div>
            {Object.values(story.tags).map((tag, i) => {
              return (
                <input
                  key={i}
                  onChange={handleChange('tags', i)}
                  className={tagFieldStyle}
                  placeholder="story tag"
                  value={tag}
                />
              );
            })}
            <button onClick={addTag}>
              <span className="m-2 text-sm font-thin">
                +
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
