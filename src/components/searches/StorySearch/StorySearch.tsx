import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { GenericStory } from '../../../lib/types';
import Fuse from 'fuse.js';

export type StorySearchResultSetter = Dispatch<
  SetStateAction<GenericStory[]>
>;

export interface StorySearchProps {
  stories: GenericStory[];
  setSearchResult: StorySearchResultSetter;
}

const searchStyle =
  'w-full p-6 m-1 rounded appearance-none focus:outline-none focus:bg-white shadow-lg font-medium tracking-tighter antialiased';

export const StorySearch: FC<StorySearchProps> = ({
  stories,
  setSearchResult,
}) => {
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const fuse = new Fuse(stories, {
    keys: ['name', 'description', 'tags'],
    threshold: 0.3,
  });

  // Focus search input
  useEffect(() => {
    searchInput.current.focus();
  }, []);

  // Handle search changes
  useEffect(() => {
    search.length > 0
      ? setSearchResult(
          fuse.search(search).map((result) => {
            return result.item;
          }),
        )
      : setSearchResult(stories);
  }, [search]);

  const searchChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearch(e.target.value);
  };

  return (
    <input
      autoComplete="off"
      id="node-search"
      value={search}
      onChange={searchChange}
      type="text"
      ref={searchInput}
      className={searchStyle}
      placeholder="name | description | tags ..."
      tabIndex={1}
    />
  );
};
