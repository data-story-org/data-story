import React, { useState, FC } from 'react';
import InspectorTableHeading from './InspectorTableHeading';
import InspectorTableBody from './InspectorTableBody';
// import Feature from '../Feature';

// TODO Make InspectorTable definitely-typed
/* interface Props {
 *   features: Feature[];
 * } */

const InspectorTable = ({ features }) => {
  const [truncateAt, setTruncateAt] = useState(100);

  const hasPrimitiveFeatures = () => {
    return (
      features
        .map((f) => f.original)
        .filter((content) => {
          return typeof content != 'object';
        }).length != 0
    );
  };

  const getHeaders = () => {
    let keys = features
      .map((i) => {
        return typeof i.original === 'object' &&
          i.original != null
          ? Object.keys(i.original)
          : '__default';
      })
      .flat();

    return [...new Set(keys)];
  };

  const getRows = () => {
    return features.slice(0, truncateAt).map((feature) => {
      let content = feature.original;

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
              <InspectorTableHeading
                primitiveFeatures={hasPrimitiveFeatures()}
                headers={getHeaders()}
              />
              <InspectorTableBody
                primitiveFeatures={hasPrimitiveFeatures()}
                rows={getRows()}
              />
            </table>
            {getRowCount() === 0 && (
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
