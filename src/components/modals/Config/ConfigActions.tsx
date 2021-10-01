import React, { FC } from 'react';

interface Props {
  handleCancel: (event: any) => void;
}

export const ConfigModalActions: FC<Props> = ({
  handleCancel,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 mt-6 px-6 py-2 border-t border-gray-300">
        <div className="flex justify-end my-4 justify-end align-bottom text-gray-500 text-xs">
          <div className="flex">
            <button
              onClick={handleCancel}
              className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
