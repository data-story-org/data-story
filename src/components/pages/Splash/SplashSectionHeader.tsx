import React, { FC } from 'react';

interface Props {
  text: string;
}

const splashHeaderStyle =
  'pt-5 bg-gray-600 text-gray-300 items-center text-lg font-black flex justify-around';

export const SplashSectionHeader: FC<Props> = ({
  text,
}) => {
  return <div className={splashHeaderStyle}>{text}</div>;
};
