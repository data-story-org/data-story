import React from 'react';

const Textarea = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  return (
    <textarea
      key={`${options.name}`}
      onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      onChange={handleChange}
      className="px-2 py-1 rounded h-64"
      value={repeatableValue ?? options.value}
    />
  );
};

export default Textarea;
