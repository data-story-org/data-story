import React from 'react';

const NodeWidgetHeader = ({ node }) => {
  return (
    <div
      className={
        'flex justify-between items-center pr-2 py-1 border border-gray-900 font-bold rounded-lg bg-gray-700 ' +
        (node.isSelected() ? 'bg-malibu-900' : '')
      }
    >
      <span className="mx-4">{node.getDisplayName()}</span>
      <i className="fas fa-cog"></i>
    </div>
  );
};

export default NodeWidgetHeader;
