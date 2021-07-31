import React from 'react';

const JSON_ = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        key={`${options.name}`}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        onChange={handleChange}
        className="px-2 py-1 rounded h-64"
        value={repeatableValue ?? options.value}
      />
    </>
  );
};

export default JSON_;
