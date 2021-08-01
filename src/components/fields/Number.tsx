import React from 'react';

const Number = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  return (
    <input
      key={`${options.name}`}
      onChange={handleChange}
      className="px-2 py-1 rounded"
      value={repeatableValue ?? options.value}
      type="number"
    />
  );
};

export default Number;
