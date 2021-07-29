import React from 'react';

const Where = ({ options, handleChange }) => {
  return (
    <div className="flex space-x-2">
      <input
        name="attribute"
        onChange={(e) => {
          handleChange(e.target.value, options);
        }}
        className="flex-1 px-2 py-1 rounded"
        placeholder="attribute"
        value={options.attribute}
      />
      <select
        className="flex-1 px-2 py-1"
        name="operator"
        onChange={(e) => {
          handleChange(e.target.value, options);
        }}
        value={options.operator}
      >
        {/* <option value="Contains">
                            CONTAINS
                        </option> */}
        <option value="=">EQUALS</option>
        <option value=">">GREATER THAN</option>

        {/* <option value="==="> TODO DOES NOT WORK OPERATORS ARE IN CONTEXT OF DB
                            EQUALS STRICT
                        </option> */}
        <option value="<">LESS THAN</option>
        <option value="like">LIKE</option>
      </select>
      <input
        onChange={(e) => {
          handleChange(e.target.value, options);
        }}
        className="flex-1 px-2 py-1 rounded"
        placeholder="value"
        name="value"
        value={options.value}
      />
    </div>
  );
};

export default Where;
