import { NodeParameter } from '@data-story-org/core';
import { BaseEventHandler } from '../../lib/types';

interface BaseFieldProps {
  options: NodeParameter;
}

export interface FieldProps extends BaseFieldProps {
  handleChange: BaseEventHandler;
}

export type RepeatableFieldChange = (
  key: number,
) => (value: any) => void;

export type RepeatableFieldInteraction = (
  key: number,
) => void;

export interface RepeatableFieldProps
  extends BaseFieldProps {
  handleRepeatableChange?: RepeatableFieldChange;
  handleRepeatableAdd?: RepeatableFieldInteraction;
  handleRepeatableRemove?: RepeatableFieldInteraction;
}
