import { NodeParameter } from '@data-story-org/core';

interface BaseFieldProps {
  options: NodeParameter;
}

export interface FieldProps extends BaseFieldProps {
  handleChange: (e) => void;
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
