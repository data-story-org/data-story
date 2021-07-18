import React from 'react';

// Unused ??
const NodeWidgetInspectIcon = ({ node, store }) => {
  return (
    node.isInspectable() && (
      <div
        onClick={(e) => {
          store.goToInspector(node.options.id);
        }}
      >
        <i className="mr-2 text-malibu-600 fas fa-search hover:cursor"></i>
      </div>
    )
  );
};

export default NodeWidgetInspectIcon;
