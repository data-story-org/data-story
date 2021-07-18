import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react';
var Mousetrap = require('mousetrap');
import _ from 'lodash';
import { Store } from '../../../store/';
import NodeListItem from './NodeListItem';

interface Props {
  store: Store;
  onFinish: () => void;
}

const NodeSearch: FC<Props> = ({ store, onFinish }) => {
  const [search, setSearch] = useState('');
  const nameInput = useRef();

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

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredNodes = () => {
    return store.diagram.availableNodes.filter((node) => {
      let content =
        node.category + node.name + node.summary;

      return content
        .toLowerCase()
        .includes(search.toLowerCase());
    });
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
      _.cloneDeep(nodeData),
    );

    onFinish();
  };

  return (
    <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
      <input
        autoComplete="off"
        id="node-search"
        value={search}
        onChange={searchChange}
        ref={nameInput}
        className="w-full p-4 rounded mb-4"
        placeholder="model | method | reader | writer ..."
        tabIndex={1}
      />
      <ul className="divide-y divide-gray-300">
        {filteredNodes().map((node) => {
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
