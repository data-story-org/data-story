import React, { FC } from 'react';

export interface RowHeaderProps {
  columnNames: string[];
}

const tableHeadStyle = 'bg-gray-50';

const headerStyle =
  'sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hover:normal-case tracking-wider';

export const RowHeader: FC<RowHeaderProps> = ({
  columnNames,
}) => {
  return (
    <thead className={tableHeadStyle}>
      <tr>
        {columnNames.map((name, i) => {
          return (
            <th
              key={`header-${name}-${i}`}
              className={headerStyle}
            >
              {name}
            </th>
          );
        })}
        <th className="relative px-6 py-3">
          <span className="sr-only">
            Interaction buttons
          </span>
        </th>
      </tr>
    </thead>
  );
};
