import React, { FC } from 'react';
import { SaveStoryI } from './SaveStoryI';

interface Props {
  story: SaveStoryI;
  handleChange: (
    field: string,
    tagKey?: number,
  ) => (event: any) => void;
  addTag: (e) => void;
}

const SaveModalBody: FC<Props> = ({
  story,
  handleChange,
  addTag,
}) => {
  return (
    <div>
      <div className="bg-gray-100 px-6 py-2">
        <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs">
          <span className="my-2 font-sans font-medium text-sm text-indigo-500">
            Name
          </span>
          <input
            onChange={handleChange('name')}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg appearance-none focus:outline-none"
            placeholder="descriptive story name"
            value={story.name}
          />

          <span className="my-2 font-sans font-medium text-sm text-indigo-500">
            Description
          </span>
          <input
            onChange={handleChange('desc')}
            type="textarea"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg appearance-none focus:outline-none"
            placeholder="story description"
            value={story.desc}
          />

          <span className="my-2 font-sans font-medium text-sm text-indigo-500">
            Tags
          </span>
          <div className="grid-cols-3">
            {Object.values(story.tags).map((tag, i) => {
              return (
                <input
                  key={i}
                  onChange={handleChange('tags', i)}
                  className="rounded-full px-3 py-2 w-1/5 text-gray-700 text-center border appearance-none focus:outline-none"
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

export default SaveModalBody;
