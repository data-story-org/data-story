import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import cloneDeep from 'lodash/cloneDeep';
import { Store } from '../../../store/';
import NodeListItem from './NodeListItem';
import { useHotkeys } from 'react-hotkeys-hook';
import Fuse from 'fuse.js';

interface Props {
  store: Store;
  onFinish: () => void;
}

const NodeSearch: FC<Props> = ({ store, onFinish }) => {
  const [search, setSearch] = useState('');
  const [cursor, setCursor] = useState(0);
  const nameInput = useRef(null);
  const currentSearch = useRef(null);

  // Fuzzy-search
  const nodes = store.diagram.availableNodes;
  const [filteredNodes, setFilteredNodes] = useState(
    cloneDeep(nodes),
  );
  const fuse = new Fuse(nodes, {
    keys: ['name', 'category', 'summary'],
    threshold: 0.3,
  });

  const goDown = () => {
    cursor < filteredNodes.length - 1
      ? setCursor(cursor + 1)
      : setCursor(0);

    currentSearch.current.scrollIntoView(false, {
      block: 'center',
      inline: 'center',
    });

    nameInput.current.focus();
  };

  const goUp = () => {
    cursor > 0
      ? setCursor(cursor - 1)
      : setCursor(filteredNodes.length - 1);

    currentSearch.current.scrollIntoView(false, {
      block: 'center',
      inline: 'center',
    });

    nameInput.current.focus();
  };

  useHotkeys(
    'tab, down',
    (e) => {
      e.preventDefault();
      goDown();
    },
    { enableOnTags: ['INPUT'] },
    [cursor],
  );

  useHotkeys(
    'shift+tab, up',
    (e) => {
      e.preventDefault();
      goUp();
    },
    { enableOnTags: ['INPUT'] },
    [cursor],
  );

  useHotkeys(
    'enter',
    (e) => {
      e.stopPropagation();
      if (filteredNodes[cursor] !== undefined) {
        const nodeName = filteredNodes[cursor].name;
        handleSelect(nodeName);
      }
    },
    { enableOnTags: ['INPUT'] },
  );

  // Focus search input
  useEffect(() => {
    nameInput.current.focus();
  }, []);

  // Handle search changes
  useEffect(() => {
    search.length > 0
      ? setFilteredNodes(
          fuse.search(search).map((result) => {
            return result.item;
          }),
        )
      : setFilteredNodes(nodes);
  }, [search]);

  const searchChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCursor(0);
    setSearch(e.target.value);
  };

  const handleSelect = (nodeName: string) => {
    const nodeData = store.diagram.availableNodes.find(
      (node) => node.name === nodeName,
    );
    store.addNode(
      // Ensure the parameters will not be shared between two nodes of same type
      cloneDeep(nodeData),
    );

    onFinish();
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded shadow max-w-full text-sm">
      <div className="sticky top-0 z-50 bg-white shadow p-4 m-1">
        <input
          autoComplete="off"
          id="node-search"
          value={search}
          onChange={searchChange}
          type="text"
          ref={nameInput}
          className="w-full p-2 rounded appearance-none focus:outline-none focus:bg-white font-medium tracking-tighter antialiased"
          placeholder="model | method | reader | writer ..."
          tabIndex={1}
        />
      </div>
      <ul className="divide-y divide-gray-300">
        {filteredNodes.map((node, i) => {
          return (
            <div
              key={node.category + node.name + node.summary}
              ref={i === cursor ? currentSearch : null}
            >
              <NodeListItem
                node={node}
                handleSelect={handleSelect}
                selected={i === cursor ? true : false}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default observer(NodeSearch);
