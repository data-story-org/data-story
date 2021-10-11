import { NodeParameter } from '../../../../core/lib/src';

interface BaseFieldProps {
  options: NodeParameter;
}

export interface FieldProps extends BaseFieldProps {
  handleChange: (e) => void;
}

export interface RepeatableFieldProps
  extends BaseFieldProps {
  handleRepeatableChange?;
  handleRepeatableAdd?;
  handleRepeatableRemove?;
}
