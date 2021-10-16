import { ComponentType } from 'react';
import { NodeParameter } from '@data-story-org/core';
import { BaseEventHandler } from '../../../lib/types';
import { FieldProps } from '../types';

export type ButtonShowPredicate = (
  index: number,
) => boolean;

export type RepeatableRendererHandlerWrapper = (
  repeatableIndex: number,
) => BaseEventHandler;

export interface RepeatableRendererProps {
  Field: ComponentType<FieldProps>;
  options: NodeParameter;
  showAddButton: ButtonShowPredicate;
  showRemoveButton: ButtonShowPredicate;
  repeatablesKeys: string[];
  repeatablesIndexes: number[];
  handleChangeWrapper: RepeatableRendererHandlerWrapper;
  handleRemoveButtonPress: RepeatableRendererHandlerWrapper;
  handleAddButtonPress: RepeatableRendererHandlerWrapper;
}
