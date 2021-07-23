import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
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

  // Fuzzy-search
  const nodes = store.diagram.availableNodes;
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const fuse = new Fuse(nodes, {
    keys: ['name', 'category', 'summary'],
    threshold: 0.3,
  });
  const nameInput = useRef(null);

  const goDown = () => {
    cursor < filteredNodes.length
      ? setCursor(cursor + 1)
      : setCursor(0);
  };

  const goUp = () => {
    cursor > 0 ? setCursor(cursor - 1) : setCursor(0);
  };

  useHotkeys(
    'tab',
    () => {
      goDown();
    },
    { enableOnTags: ['INPUT'] },
    [cursor],
  );

  useHotkeys(
    'shift+tab',
    () => {
      goUp();
    },
    { enableOnTags: ['INPUT'] },
    [cursor],
  );

  const downHandler = ({ key }) => {
    if (key === 'ArrowDown') {
      goDown();
    }
  };

  const upHandler = ({ key }) => {
    if (key === 'ArrowUp') {
      goUp();
    }
  };

  const searchSubmitHandler = ({ key }) => {
    if (key === 'Enter') {
      const nodeName = filteredNodes[cursor].name;
      handleSelect(nodeName);
    }
  };

  useEffect(() => {
    nameInput.current.focus();

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    window.addEventListener('keyup', searchSubmitHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener(
        'keyup',
        searchSubmitHandler,
      );
    };
  });

  const searchChange = (e) => {
    setSearch(e.target.value);
    setCursor(0);

    const searchResults = fuse
      .search(search)
      .map((result) => {
        return result.item;
      });
    setFilteredNodes(searchResults);
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
    <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
      <div className="bg-white shadow p-4">
        <input
          autoComplete="off"
          id="node-search"
          value={search}
          onChange={searchChange}
          type="text"
          ref={nameInput}
          className="w-full p-2 rounded appearance-none focus:outline-none focus:bg-white"
          placeholder="model | method | reader | writer ..."
          tabIndex={1}
        />
      </div>
      <ul className="divide-y divide-gray-300">
        {filteredNodes.map((node, i) => {
          return (
            <NodeListItem
              node={node}
              key={node.category + node.name + node.summary}
              handleSelect={handleSelect}
              selected={i === cursor ? true : false}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default observer(NodeSearch);
