import React, { FC } from 'react';
import { NodeModelOptions } from '../../NodeModel';

// TODO Make JS field definitely typed
/* interface Props {
 *   options: NodeModelOptions;
 *   handleChange: (e: any, o: NodeModelOptions) => void;
 * } */

const JS = ({ options, handleChange }) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        onChange={(e) => {
          handleChange(e.target.value, options);
        }}
        className="px-2 py-1 rounded h-64"
        value={options.value}
      />
    </>
  );
};

export default JS;
