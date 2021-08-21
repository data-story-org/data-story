import React from 'react';

const Textarea = ({options, handleChange}) => {
  return (
    <textarea
      key={`${options.name}`}
      onChange={handleChange}
      className="px-2 py-1 rounded h-64"
      value={options.value}
    />
  );
};

export default Textarea;
