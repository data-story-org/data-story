import React, { FC } from 'react';
import {
  baseFieldStyle,
  baseFieldTitleStyle,
} from '../../lib/styles';

interface Props {
  name: string;
  description: string;
}

export const BaseFieldHeader: FC<Props> = ({
  name,
  description,
}) => {
  return (
    <span className={baseFieldTitleStyle}>
      <div className="">
        <span className="text-indigo-500">{name}</span>
        <span className="italic font-semibold text-gray-900">
          {description ? ` (${description})` : ''}
        </span>
      </div>
    </span>
  );
};
