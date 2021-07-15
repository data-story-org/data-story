import React, { FC } from 'react';
import { NodeModelOptions } from '../../NodeModel';

// TODO Make JS field definitely typed
/* interface Props {
 *   options: NodeModelOptions;
 *   handleChange: (e: any, o: NodeModelOptions) => void;
 * } */

const JS = ({
  options,
  handleChange,
} ) => {
  return (
    <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
      <div className="my-2">
        <div className="">
          {options.name}
          {options.description
            ? ' (' + options.description + ')'
            : ''}
        </div>
      </div>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        onChange={(e) => {
          handleChange(e, options);
        }}
        className="px-2 py-1 rounded h-64"
        value={options.value}
      />
    </div>
  );
};

export default JS;
