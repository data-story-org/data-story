import React, { FC } from 'react';

interface Props {
  primitiveFeatures: boolean;
  headers: any[];
}

const InspectorTableHeading: FC<Props> = ({
  primitiveFeatures,
  headers,
}) => {
  if (primitiveFeatures) {
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
        {headers.map((heading) => {
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

export default InspectorTableHeading;
