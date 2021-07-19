import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react';
var Mousetrap = require('mousetrap');
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
  const [filteredNodes, setFilteredNodes] = useState(
    store.diagram.availableNodes,
  );

  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();
    // Not Implemented
    /* Mousetrap.bind('enter', handleSelect()) */

    // Mousetrap.bind(Array.from('abcdefghijklmnopqrstuvwxyz'),
    //     (key) => {
    // 		console.log(key)
    // 		// this.setState({
    // 		// 	search: e.target.value
    // 		// })

    // 	}
    // );
    //
    return () => {
      Mousetrap.unbind('enter');
    };
  }, []);

  // Fuzzy-search
  const fuse = new Fuse(store.diagram.availableNodes, {
    keys: ['category.name.summary'],
    findAllMatches: true,
    ignoreLocation: true,
    useExtendedSearch: true,
    threshold: 0.8,
  });

  const searchChange = (e) => {
    setSearch(e.target.value);

    const searchPattern = search.replace(/\s/g, '');
    setFilteredNodes(
      fuse.search(
        `${searchPattern} | '${searchPattern} | ^${searchPattern}' | .${searchPattern}`,
      ),
    );
  };

  const handleSelect = (e) => {
    e.preventDefault();

    const name = e.target.getAttribute(
      'data-node-model-variation-name',
    );
    const nodeData = store.diagram.availableNodes.find(
      (node) => node.name == name,
    );
    store.addNode(
      // Ensure the parameters will not be shared between two nodes of same type
      cloneDeep(nodeData),
    );

    onFinish();
  };

  return (
    <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
      <input
        id="node-search"
        value={search}
        onChange={searchChange}
        ref={nameInput}
        className="w-full p-4 rounded mb-4"
        placeholder="model | method | reader | writer ..."
        tabIndex={1}
      />
      <ul className="divide-y divide-gray-300">
        {filteredNodes.map((node) => {
          return (
            <NodeListItem
              node={node}
              handleSelect={handleSelect}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default observer(NodeSearch);
