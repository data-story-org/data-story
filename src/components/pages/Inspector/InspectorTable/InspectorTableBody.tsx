import React, { FC } from 'react';

interface Props {
  primitiveFeatures: boolean;
  rows: any[];
  isComplexObject: boolean;
  handleSelectJsonMode: (e: any) => void;
}

const linkStyle = 'hover:underline cursor-pointer';

export const InspectorTableBody: FC<Props> = ({
  primitiveFeatures,
  rows,
  isComplexObject,
  handleSelectJsonMode,
}) => {
  const primitiveTable = (row, rowIndex) => {
    return (
      <td
        key={rowIndex}
        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
      >
        {isComplexObject ? (
          <span
            className={linkStyle}
            onClick={handleSelectJsonMode}
          >
            {row}
          </span>
        ) : (
          <>{row}</>
        )}
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
              {isComplexObject ? (
                <span
                  className={linkStyle}
                  onClick={handleSelectJsonMode}
                >
                  {column}
                </span>
              ) : (
                <>{column}</>
              )}
            </td>
          );
        })}
      </>
    );
  };

  return (
    <>
      <tbody>
        {rows &&
          rows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className="bg-white">
                {primitiveFeatures
                  ? primitiveTable(row, rowIndex)
                  : table(row)}
              </tr>
            );
          })}
      </tbody>
    </>
  );
};
