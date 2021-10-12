import React, { FC, useState } from 'react';
import { Feature } from '@data-story-org/core';
import { InspectorTableBody } from './InspectorTableBody';
import { InspectorTableHeading } from './InspectorTableHeading';
import {
  BaseEventHandler,
  InspectorMode,
} from '../../../../lib/types';

interface Props {
  features: Feature[];
  handleModeSelect: (
    mode: InspectorMode,
  ) => BaseEventHandler;
}

export const InspectorTable: FC<Props> = ({
  features,
  handleModeSelect,
}) => {
  const [truncateAt, setTruncateAt] = useState(100);
  useState(false);

  const hasPrimitiveFeatures = () => {
    return (
      features
        .map((f) => f.original)
        .filter((content) => {
          return typeof content != 'object';
        }).length != 0
    );
  };

  let isComplexObject: boolean;

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
        ) {
          isComplexObject = true;
          return 'N/A';
        }

        if (typeof content[header] === 'object') {
          isComplexObject = true;
          return 'OBJECT';
        }

        if (Array.isArray(content[header])) {
          isComplexObject = true;
          return 'ARRAY';
        }

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
                isComplexObject={isComplexObject}
                handleSelectJsonMode={handleModeSelect(
                  'JSON',
                )}
              />
            </table>
            {getRowCount() === 0 && (
              <div className="flex w-full justify-center p-24 text-gray-300 text-xl">
                No data to show here 😐
              </div>
            )}
            {getRowCount() > truncateAt && (
              <div
                className="flex cursor-pointer justify-center my-12 px-8 py-2 border text-gray-300 text-xl"
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
