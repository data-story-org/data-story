import React, { FC } from 'react';
import { observer } from 'mobx-react';

const Tokens: FC = () => {
  const defaultContent = () => {
    return JSON.stringify(
      {
        GITHUB_API_TOKEN: '123456789',
      },
      null,
      4,
    );
  };

  return (
    <div className="">
      <div className="px-4 py-12">
        <textarea
          className="w-full h-48 p-4 text-sm text-gray-800"
          value={defaultContent()}
          onChange={(v) => {}}
        ></textarea>
      </div>
    </div>
  );
}

export default observer(Tokens);
