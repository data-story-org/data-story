import React, { useState, ComponentType, FC } from 'react';
import { FieldProps, RepeatableFieldProps } from '../types';
import { PrimitiveRepeatables } from './PrimitiveRepeatables';
import { TableRepeatables } from './TableRepeatables';
import { ButtonShowPredicate } from './types';

interface Props extends RepeatableFieldProps {
  isRow?: boolean;
}

export const withRepeatable =
  (Field: ComponentType<FieldProps>) =>
  ({
    options,
    handleRepeatableChange,
    handleRepeatableAdd,
    handleRepeatableRemove,
    isRow = false,
  }: Props) => {
    const repeatablesKeys = Object.keys(options.value);
    const [fieldsCount, setFieldsCount] = useState(
      repeatablesKeys.length,
    );

    const repeatablesIndexes = [
      ...Array(fieldsCount).keys(),
    ];

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

    const showAddButton: ButtonShowPredicate = (i) => {
      return repeatablesKeys.at(-1) === `${i}`;
    };

    const showRemoveButton: ButtonShowPredicate = (i) => {
      return (
        fieldsCount !== 0 && repeatablesKeys.length > 1
      );
    };

    if (isRow) {
      return (
        <TableRepeatables
          Field={Field}
          options={options}
          showRemoveButton={showRemoveButton}
          showAddButton={showAddButton}
          repeatablesIndexes={repeatablesIndexes}
          repeatablesKeys={repeatablesKeys}
          handleChangeWrapper={handleChangeWrapper}
          handleRemoveButtonPress={handleRemoveButtonPress}
          handleAddButtonPress={handleAddButtonPress}
        />
      );
    }

    return (
      <PrimitiveRepeatables
        Field={Field}
        options={options}
        showRemoveButton={showRemoveButton}
        showAddButton={showAddButton}
        repeatablesIndexes={repeatablesIndexes}
        repeatablesKeys={repeatablesKeys}
        handleChangeWrapper={handleChangeWrapper}
        handleRemoveButtonPress={handleRemoveButtonPress}
        handleAddButtonPress={handleAddButtonPress}
      />
    );
  };
