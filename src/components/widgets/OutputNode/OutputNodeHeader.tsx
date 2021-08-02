import React from 'react';

const NodeWidgetHeader = ({ node }) => {
  return (
		<div className="flex">
			<div
				className={
					'flex justify-between items-center py-4 px-4 border border-gray-900 font-extrabold rounded-full bg-gray-700 ' +
					(node.isSelected() ? 'bg-malibu-900' : '')
				}
			/>
			<div className="flex items-center">
				<span className="-ml-4 pl-6 pr-2 py-2 font-black text-sm">DummyPortName</span>
			</div>
		</div>

  );
};

export default NodeWidgetHeader;
