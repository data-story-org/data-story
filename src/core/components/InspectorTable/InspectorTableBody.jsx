import React from 'react';

const InspectorHeading = ({ primitiveFeatures, rows }) => {
  const primitiveTable = (row, rowIndex) => {
    return (
      <td
        key={rowIndex}
        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
      >
        {row}
      </td>
    );
  };

  const table = (row) => {
    return (
      <>
        {row.map((column, columnIndex) => {
          return (
            <td
              key={columnIndex}
              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
            >
              {column}
            </td>
          );
        })}
      </>
    );
  };

  return (
    <tbody>
      {getRows().map((row, rowIndex) => {
        return (
          <tr key={rowIndex} className="bg-white">
            {primitiveFeatures &&
              primitiveTable(row, rowIndex)}
            {primitiveFeatures || table(row)}
          </tr>
        );
      })}
    </tbody>
  );
};

export default InspectorHeading;
