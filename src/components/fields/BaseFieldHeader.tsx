import React, { FC } from 'react';

interface Props {
  name: string;
  description: string;
}

export const BaseFieldHeader: FC<Props> = ({
  name,
  description,
}) => {
  return (
    <span className="my-2 font-sans font-medium text-sm">
      <div className="">
        <span className="text-indigo-500">{name}</span>
        {description ? ` (${description})` : ''}
      </div>
    </span>
  );
};
