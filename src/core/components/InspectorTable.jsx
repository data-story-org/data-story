import React, { useState, FC } from 'react';
// import Feature from '../Feature';

// TODO Make InspectorTable definetly-typed
/* interface Props {
 *   features: Feature[];
 * } */

const InspectorTable = ({ features }) => {
  const [truncateAt, setTruncateAt] = useState(100);

  const renderTableHead = () => {
    if (hasPrimitiveFeatures()) {
      return (
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              value
            </th>
          </tr>
        </thead>
      );
    }

    return (
      <thead>
        <tr>
          {getHeaders().map((heading) => {
            return (
              <th
                key={heading}
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {heading}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const hasPrimitiveFeatures = () => {
    return (
      features
        .map((f) => f.unbox())
        .filter((content) => {
          return typeof content != 'object';
        }).length != 0
    );
  };

  const renderTableBody = () => {
    if (hasPrimitiveFeatures()) {
      return renderPrimitiveTableBody();
    }

    return (
      <tbody>
        {getRows().map((row, rowIndex) => {
          return (
            <tr key={rowIndex} className="bg-white">
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
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderPrimitiveTableBody = () => {
    return (
      <tbody>
        {getRows().map((row, rowIndex) => {
          return (
            <tr key={rowIndex} className="bg-white">
              <td
                key={rowIndex}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
              >
                {row}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const getHeaders = () => {
    let keys = features
      .map((i) => {
        return typeof i.unbox() === 'object' &&
          i.unbox() != null
          ? Object.keys(i.unbox())
          : '__default';
      })
      .flat();

    return [...new Set(keys)];
  };

  const getRows = () => {
    return features.slice(0, truncateAt).map((feature) => {
      let content = feature.unbox();

      if (typeof content != 'object') return content;

      return getHeaders().map((header) => {
        if (
          content == null ||
          !content.hasOwnProperty(header)
        )
          return 'N/A';

        if (typeof content[header] === 'object')
          return 'OBJECT';

        if (typeof content[header] === 'array')
          return 'ARRAY';

        return content[header];
      });
    });
  };

  const getRowCount = () => {
    return features.length;
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {renderTableHead()}
              {renderTableBody()}
            </table>
            {getRowCount() == 0 && (
              <div className="flex w-full justify-center p-24 text-gray-300 font-mono text-xl">
                No data to show here 😐
              </div>
            )}
            {getRowCount() > truncateAt && (
              <div
                className="flex cursor-pointer justify-center my-12 px-8 py-2 border text-gray-300 font-mono text-xl"
                onClick={() => {
                  setTruncateAt(Number.POSITIVE_INFINITY);
                }}
              >
                Load all {getRowCount()} rows
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorTable;
