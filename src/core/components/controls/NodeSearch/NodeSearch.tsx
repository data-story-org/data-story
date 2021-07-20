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
import Fuse from 'fuse.js';

interface Props {
  store: Store;
  onFinish: () => void;
}

const NodeSearch: FC<Props> = ({ store, onFinish }) => {
  const [search, setSearch] = useState('');

  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();
  });

  // Fuzzy-search
  const nodes = store.diagram.availableNodes;
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const fuse = new Fuse(nodes, {
    keys: ['name', 'category', 'summary'],
    threshold: 0.3,
  });

  const searchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

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

  const handleInputSubmit = (e) => {
    const nodeName = filteredNodes[0].name;
    handleSelect(nodeName);
  };

  return (
    <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
      <form onSubmit={handleInputSubmit}>
        <input
          autoComplete="off"
          id="node-search"
          value={search}
          onChange={searchChange}
          type="text"
          ref={nameInput}
          className="w-full p-4 rounded mb-4 mousetrap"
          placeholder="model | method | reader | writer ..."
          tabIndex={1}
        />
      </form>
      <ul className="divide-y divide-gray-300">
        {filteredNodes.map((node) => {
          return (
            <NodeListItem
              node={node}
              key={node.category + node.name + node.summary}
              handleSelect={handleSelect}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default observer(NodeSearch);
