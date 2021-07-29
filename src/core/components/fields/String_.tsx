import React, { useState } from 'react';

const String_ = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  return (
    <input
      onChange={(e) => {
        handleChange(e.target.value, options);
      }}
      className="p-2 rounded"
      value={repeatableValue ?? options.value}
    />
  );
};

export default String_;
