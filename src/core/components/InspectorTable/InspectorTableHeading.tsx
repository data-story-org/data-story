import React, { FC } from 'react';

interface Props {
  primitiveFeatures: boolean;
  headers: any[];
}

const style =
  'px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-malibu-700 uppercase hover:normal-case tracking-wider';

const InspectorTableHeading: FC<Props> = ({
  primitiveFeatures,
  headers,
}) => {
  if (primitiveFeatures) {
    return (
      <thead>
        <tr>
          <th scope="col" className={style}>
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
            <th key={heading} scope="col" className={style}>
              {heading}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default InspectorTableHeading;
