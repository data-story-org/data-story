import React, { FC } from 'react';
import { Button } from '../Button';
import { RepeatableRendererProps } from './types';

export const TableRepeatables: FC<RepeatableRendererProps> =
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
      <>
        {repeatablesIndexes.map((i) => {
          if (repeatablesKeys.includes(`${i}`)) {
            const paramValue = options.value[i];

            return (
              <tr key={`field-${i}`}>
                <Field
                  options={Object.assign({}, options, {
                    value: paramValue,
                  })}
                  handleChange={handleChangeWrapper(i)}
                />

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    symbol="-"
                    clickHandler={handleRemoveButtonPress(
                      i,
                    )}
                    showPredicate={showRemoveButton(i)}
                  />

                  <Button
                    symbol="+"
                    clickHandler={handleAddButtonPress(i)}
                    showPredicate={showAddButton(i)}
                  />
                </td>
              </tr>
            );
          }
        })}
      </>
    );
  };
