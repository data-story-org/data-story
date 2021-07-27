import React from 'react';

const Select = ({ options, handleChange }) => {
  return (
    <select
      onChange={(e) => {
        handleChange(e, options);
      }}
      className="px-2 py-1 rounded"
      value={options.value}
    >
      {options.options.map((o) => {
        return (
          <option value={o} key={o}>
            {o}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
