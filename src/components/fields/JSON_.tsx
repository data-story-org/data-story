import React from 'react';

export const JSON_ = ({ options, handleChange }) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        key={`${options.name}`}
        onChange={handleChange}
        className="px-2 py-1 rounded h-64"
        value={options.value}
      />
    </>
  );
};

