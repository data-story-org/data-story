import React, { FC } from 'react';

interface Props {
  handleChange: (event: any) => void;
}

const SaveModalBody: FC<Props> = ({ handleChange }) => {
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
          <span className="my-2">Name</span>
          <input
            onChange={handleChange}
            className="px-2 py-1 rounded"
            placeholder="descriptive-name.story"
          />
        </div>
      </div>
    </div>
  );
};

export default SaveModalBody;
