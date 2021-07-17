import React from 'react';

const Select = ({ options, handleChange }) => {
  return (
    <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
      <span className="my-2">
        <div className="">
          <span>{options.name}</span>
          {options.description
            ? ' (' + options.description + ')'
            : ''}
        </div>
      </span>
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
    </div>
  );
};

export default Select;
