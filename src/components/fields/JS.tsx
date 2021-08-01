import React, { FC } from 'react';
import { NodeModelOptions } from '../../diagram/models/NodeModel';

// TODO Make JS field definitely typed
/* interface Props {
 *   options: NodeModelOptions;
 *   handleChange: (e: any, o: NodeModelOptions) => void;
 * } */

const JS = ({ options, handleChange, repeatableValue }) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        key={`${options.name}`}
        onChange={handleChange}
        className="px-2 py-1 rounded h-64"
        value={repeatableValue ?? options.value}
      />
    </>
  );
};

export default JS;
