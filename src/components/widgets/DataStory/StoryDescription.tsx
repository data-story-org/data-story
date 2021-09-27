import React, { FC } from 'react';

interface Props {
  storyDesc: string;
}

const descriptionStyle = 'text-gray-700 text-base';

export const DataStoryWidgetDescription: FC<Props> = ({
  storyDesc,
}) => {
  return <p className={descriptionStyle}>{storyDesc}</p>;
};
