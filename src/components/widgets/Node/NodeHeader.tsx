import React from 'react';

export const NodeWidgetHeader = ({ node }) => {
  return (
    <div
      className={
        'flex justify-between items-center pr-2 py-1 border border-gray-900 font-extrabold rounded-lg bg-gray-700 ' +
        (node.options.selected ? 'bg-malibu-900' : '')
      }
    >
      <span className="mx-4 subpixel-antialiased">
        {node.getDisplayName()}
      </span>
      <i className="fas fa-cog"></i>
    </div>
  );
};
