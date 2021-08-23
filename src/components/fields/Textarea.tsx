import React from 'react';

const Textarea = ({ options, handleChange }) => {
  return (
    <input
      type="textarea"
      key={`${options.name}`}
      onChange={handleChange}
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none h-64"
      value={options.value}
    />
  );
};

export default Textarea;
