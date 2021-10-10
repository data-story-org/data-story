import React, { useState, useEffect } from 'react';
import { FC } from 'react';

export const withRepeatable =
  (Field) =>
  ({
    options,
    handleRepeatableChange,
    handleRepeatableAdd,
    handleRepeatableRemove,
  }) => {
    const [fieldsCount, setFieldsCount] = useState(
      Object.keys(options.value).length,
    );

    const handleSimpleChange = (key) => (e) => {
      handleRepeatableChange(key)(e.target.value);
    };

    const handleChangeWrapper =
      options.fieldType === 'Row'
        ? handleRepeatableChange
        : handleSimpleChange;

    const handleAddButtonPress = (key: number) => (e) => {
      setFieldsCount(fieldsCount + 1);

      handleRepeatableAdd(key);
    };

    const handleRemoveButtonPress =
      (key: number) => (e) => {
        handleRepeatableRemove(key);
      };

    console.log('Repeatable_', options);

    return (
      <div className="flex flex-col space-y-2">
        {[...Array(fieldsCount).keys()].map((i) => {
          if (Object.keys(options.value).includes(`${i}`)) {
            return (
              <div
                key={`field-${i}`}
                className="flex flex-row rounded-lg bg-transparent space-x-1"
              >
                <Field
                  options={{
                    ...options,
                    value: options.value[i],
                  }}
                  handleChange={handleChangeWrapper(i)}
                />

                <Button
                  symbol="-"
                  clickHandler={handleRemoveButtonPress(i)}
                  showPredicate={i !== 0 || fieldsCount > 1}
                />

                <Button
                  symbol="+"
                  clickHandler={handleAddButtonPress(i)}
                  showPredicate={i === fieldsCount - 1}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

const buttonStyle =
  'bg-gray-100 text-gray-600 hover:text-malibu-700 w-8 rounded-r cursor-pointer';

interface ButtonProps {
  symbol: string;
  clickHandler: (evt: any) => void;
  showPredicate: boolean;
}

const Button: FC<ButtonProps> = ({
  symbol,
  clickHandler,
  showPredicate,
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
