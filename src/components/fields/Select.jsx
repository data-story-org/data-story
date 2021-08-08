import React from 'react';

const Select = ({
  options,
  handleChange,
  repeatableValue,
}) => {
  return (
    <select
      key={`${options.name}`}
      onChange={handleChange}
      className="px-2 py-1 rounded"
      value={repeatableValue ?? options.value}
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
