import React, { FC } from 'react';
import { RowHeader, RowHeaderProps } from './RowHeader';

interface Props extends RowHeaderProps {}

export const RowTable: FC<Props> = ({
  columnNames,
  children,
}) => {
  return (
    <div className="flex flex-col m-2">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <RowHeader columnNames={columnNames} />
              <tbody className="bg-white divide-y divide-gray-200">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
