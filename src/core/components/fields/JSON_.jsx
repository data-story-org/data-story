import React from 'react';

const JSON_ = ({ options, handleChange }) => {
  return (
    <>
      {/* REPLACE WITH SOME EDITOR! */}
      <textarea
        onChange={(e) => {
          handleChange(e, options);
        }}
        className="px-2 py-1 rounded h-64"
        value={options.value}
      />
    </>
  );
};

export default JSON_;
