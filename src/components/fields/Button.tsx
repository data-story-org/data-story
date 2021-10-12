import React, { FC } from 'react';
import { BaseEventHandler } from '../../lib/types';

const buttonStyle =
  'bg-gray-100 text-gray-600 hover:text-malibu-700 w-8 rounded-r cursor-pointer';

interface ButtonProps {
  symbol: string;
  clickHandler: BaseEventHandler;
  showPredicate?: boolean;
}

export const Button: FC<ButtonProps> = ({
  symbol,
  clickHandler,
  showPredicate = true,
}) => {
  return (
    <>
      {showPredicate && (
        <button
          className={buttonStyle}
          onClick={clickHandler}
        >
          <span className="m-auto text-sm font-thin">
            {symbol}
          </span>
        </button>
      )}
    </>
  );
};
