import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

const NodeWidgetOutPorts = ({ node, engine }) => {
  return Object.values(node.getOutPorts()).map((port) => {
    return (
      <div className="flex w-full" key={port.options.name}>
        <div className="mr-2">{/* Counterweight */}</div>
        <div className="flex w-full items-center text-gray-200 py-1 border border-gray-900 rounded-lg bg-gray-500">
          <div className="flex items-center justify-between w-full">
            <span className="flex px-4 flex-1 font-medium subpixel-antialiased">
              {port.options.label}
            </span>
          </div>
        </div>
        <PortWidget
          className="-ml-1 z-10 flex items-center text-lg justify-center fill-current text-malibu-700 hover:text-malibu-500"
          engine={engine}
          port={port}
        >
          <svg
            width="12px"
            height="12px"
            fill=""
            className="m-auto"
          >
            <polygon points="0,0 12,6 0,12" />
          </svg>
        </PortWidget>
      </div>
    );
  });
};

export default NodeWidgetOutPorts;
