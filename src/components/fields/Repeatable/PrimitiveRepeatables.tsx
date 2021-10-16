import React, { FC } from 'react';
import { Button } from '../Button';
import { RepeatableRendererProps } from './types';

export const PrimitiveRepeatables: FC<RepeatableRendererProps> =
  ({
    options,
    Field,
    showAddButton,
    showRemoveButton,
    repeatablesIndexes,
    repeatablesKeys,
    handleChangeWrapper,
    handleRemoveButtonPress,
    handleAddButtonPress,
  }) => {
    return (
      <div className="flex flex-col space-y-2">
        {repeatablesIndexes.map((i) => {
          if (repeatablesKeys.includes(`${i}`)) {
            const paramValue = options.value[i];

            return (
              <div
                key={`field-${i}`}
                className="flex flex-row rounded-lg bg-transparent space-x-1"
              >
                <Field
                  options={Object.assign({}, options, {
                    value: paramValue,
                  })}
                  handleChange={handleChangeWrapper(i)}
                />

                <Button
                  symbol="-"
                  clickHandler={handleRemoveButtonPress(i)}
                  showPredicate={showRemoveButton(i)}
                />

                <Button
                  symbol="+"
                  clickHandler={handleAddButtonPress(i)}
                  showPredicate={showAddButton(i)}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };
