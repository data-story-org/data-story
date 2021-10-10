import React from 'react';
import { baseFieldStyle } from '../../lib/styles';

// TODO Make JS field definitely typed
/* interface Props {
 *   options: NodeModelOptions;
 *   handleChange: (e: any, o: NodeModelOptions) => void;
 * } */

export const JS = ({ options, handleChange }) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        key={`${options.name}`}
        onChange={handleChange}
        className={`${baseFieldStyle} h-64`}
        value={options.value}
      />
    </>
  );
};
