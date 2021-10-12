import React, { useState, ComponentType, FC } from 'react';
import { Button } from './Button';
import { FieldProps, RepeatableFieldProps } from './types';

export const withRepeatable =
  (Field: ComponentType<FieldProps>) =>
  ({
    options,
    handleRepeatableChange,
    handleRepeatableAdd,
    handleRepeatableRemove,
  }: RepeatableFieldProps) => {
    const repeatablesKeys = Object.keys(options.value);

    const [fieldsCount, setFieldsCount] = useState(
      repeatablesKeys.length,
    );

    const handleSimpleChange = (key) => (e) => {
      handleRepeatableChange(key)(e.target.value);
    };

    const handleChangeWrapper =
      options.fieldType === 'Row'
        ? handleRepeatableChange
        : handleSimpleChange;

    const handleAddButtonPress = (key: number) => (e) => {
      setFieldsCount(
        (prevFieldsCount) => prevFieldsCount + 1,
      );

      handleRepeatableAdd(key);
    };

    const handleRemoveButtonPress =
      (key: number) => (e) => {
        handleRepeatableRemove(key);
      };

    return (
      <div className="flex flex-col space-y-2">
        {[...Array(fieldsCount).keys()].map((i) => {
          if (repeatablesKeys.includes(`${i}`)) {
            const showAddButton =
              repeatablesKeys.at(-1) === `${i}`;

            const showRemoveButton =
              fieldsCount !== 0 &&
              repeatablesKeys.length > 1;

            return (
              <div
                key={`field-${i}`}
                className="flex flex-row rounded-lg bg-transparent space-x-1"
              >
                <Field
                  options={Object.assign({}, options, {
                    value: options.value[i],
                  })}
                  handleChange={handleChangeWrapper(i)}
                />

                <Button
                  symbol="-"
                  clickHandler={handleRemoveButtonPress(i)}
                  showPredicate={showRemoveButton}
                />

                <Button
                  symbol="+"
                  clickHandler={handleAddButtonPress(i)}
                  showPredicate={showAddButton}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };
