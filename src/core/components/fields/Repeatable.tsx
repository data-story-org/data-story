import React, { useState, useEffect } from 'react';
import { FC } from 'react';

const withRepeatable =
  (Field) =>
  ({ options, handleChange }) => {
    const [fieldsCount, setFieldsCount] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState({
      0: '',
    });

    useEffect(() => {
      if (Array.isArray(options.value)) {
        const state = Object.assign({}, options.value);
        setValues(state);
        setFieldsCount(options.value.length);
        setIsSubmitted(true);
      }
    }, [options]);

    const handleRepeatableChange =
      (key: number) => (value, parameter) => {
        const newValues = {
          ...values,
          [key]: value,
        };

        setValues(newValues);
        setIsSubmitted(false);
      };

    const handleAddButtonPress = (key: number) => (_e) => {
      setFieldsCount(fieldsCount + 1);

      setValues({
        ...values,
        [key + 1]: '',
      });

      setIsSubmitted(false);
    };

    const handleRemoveButtonPress =
      (key: number) => (_e) => {
        setFieldsCount(fieldsCount - 1);

        // Fix deleting 0 key
        const newValues = { ...values };
        delete newValues[key];
        setValues(newValues);

        setIsSubmitted(false);
      };

    const handleSubmit = (parameter) => (_e) => {
      handleChange(Object.values(values), parameter);
      setIsSubmitted(true);
    };

    return (
      <div className="flex flex-col space-y-2">
        {[...Array(fieldsCount).keys()].map((i) => {
          return (
            <div
              className="flex flex-row rounded-lg bg-transparent space-x-1"
              key={`field-${i}`}
            >
              <Field
                options={options}
                handleChange={handleRepeatableChange(i)}
                repeatableValue={values[i]}
              />

              <Button
                symbol="-"
                clickHandler={handleRemoveButtonPress(i)}
                showPredicate={i !== 0}
              />

              <Button
                symbol="+"
                clickHandler={handleAddButtonPress(i)}
                showPredicate={i === fieldsCount - 1}
              />

              <Button
                symbol="✅"
                clickHandler={handleSubmit(options)}
                showPredicate={
                  i === fieldsCount - 1 &&
                  isSubmitted !== true
                }
              />
            </div>
          );
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

export default withRepeatable;
