import React, { FC } from 'react';
import NodeModel from '../../../NodeModel';

interface Props {
  node: NodeModel;
  handleCancel: (event: any) => void;
}

const NodeWidgetModalHeader: FC<Props> = ({
  node,
  handleCancel,
}) => {
  return (
    <div className="w-full bg-gray-100 p-6 font-bold border-b border-gray-300">
      <div className="flex justify-between">
        <p className="text-lg font-medium text-gray-900 text-bold">
          <span className="text-indigo-500">
            {node.options.category}
          </span>
          <span className="">
            {' '}
            / {node.getDisplayName()}
          </span>
        </p>
        <p
          className="text-sm font-medium text-bold text-gray-400 hover:text-gray-500"
          onClick={handleCancel}
        >
          <i className="fa fa-close"></i>
        </p>
      </div>
    </div>
  );
};

export default NodeWidgetModalHeader;
