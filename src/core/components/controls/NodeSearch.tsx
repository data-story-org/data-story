import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
var Mousetrap = require('mousetrap');
import _ from 'lodash';
import { useStore } from '../../store/StoreProvider';

interface Props {
  onFinish: () => void;
}

const NodeSearch = observer(({ onFinish }) => {
  const store = useStore();
  const [search, setSearch] = useState('');
  const nameInput = useRef();

  useEffect(() => {
    nameInput.current.focus();

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

  const renderNode = (node) => {
    const elementDataProperties = {
      id: node.name,
      'data-node-model-variation-name': node.name,
    };

    // HOW TO ONLY ALLOW CLICK E FROM PARENT?
    // REPEAT THE EDATA FOR ALL CHILDREN FOR NOW
    return (
      <li
        key={node.category + node.name}
        onDoubleClick={handleSelect}
        {...elementDataProperties}
        className="py-3 flex"
        tabIndex={2}
      >
        <div className="ml-3">
          <div
            className="flex text-sm mb-2 font-medium text-gray-900 text-bold"
            {...elementDataProperties}
          >
            <div
              {...elementDataProperties}
              className="text-indigo-500"
            >
              {node.category}
            </div>
            <div {...elementDataProperties} className="">
              ::{node.name}
            </div>
          </div>
          <div
            className="text-xs text-gray-500"
            {...elementDataProperties}
          >
            <span
              className="ml-2"
              {...elementDataProperties}
            >
              {node.summary}
            </span>
          </div>
        </div>
      </li>
    );
  };

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
          return renderNode(node);
        })}
      </ul>
    </div>
  );
});

export default NodeSearch;
