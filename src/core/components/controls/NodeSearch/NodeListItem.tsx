import React, { FC, MutableRefObject } from 'react';
import NodeModel from '../../../NodeModel';

interface Props {
  node: NodeModel;
  handleSelect: (nodeName: string) => void;
}

export const NodeListItem: FC<Props> = ({
  node,
  handleSelect,
  
}) => {
  const elementDataProperties = {
    id: node.name,
    'data-node-model-variation-name': node.name,
  };

  // HOW TO ONLY ALLOW CLICK E FROM PARENT?
  // REPEAT THE EDATA FOR ALL CHILDREN FOR NOW
  return (
    <li
      key={node.category + node.name + node.summary}
      onClick={(_) => {
        handleSelect(node.name);
      }}
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
          <div {...elementDataProperties} id="node-name" className="">
            ::{node.name}
          </div>
        </div>
        <div
          className="text-xs text-gray-500"
          {...elementDataProperties}
        >
          <span className="ml-2" {...elementDataProperties}>
            {node.summary}
          </span>
        </div>
      </div>
    </li>
  );
};

export default NodeListItem;
