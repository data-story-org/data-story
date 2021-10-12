import React, { FC } from 'react';
import { Field } from '../../fields/Field';
import { NodeParameter } from '@data-story-org/core';
import {
  RepeatableAddHandler,
  RepeatableChangeHandler,
  RepeatableRemoveHandler,
} from './types';
import { BaseEventHandler } from '../../../lib/types';

interface Props {
  parameters: NodeParameter[];
  handleChange: (param: NodeParameter) => BaseEventHandler;
  handleRepeatableChange: RepeatableChangeHandler;
  handleRepeatableAdd: RepeatableAddHandler;
  handleRepeatableRemove: RepeatableRemoveHandler;
}

export const NodeWidgetModalBody: FC<Props> = ({
  parameters,
  handleChange,
  handleRepeatableChange,
  handleRepeatableAdd,
  handleRepeatableRemove,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 px-6 py-2">
        {Object.values(parameters).map((parameter, i) => {
          return (
            <Field
              key={`field-${parameter.name}-{i}`}
              handleChange={handleChange(parameter)}
              handleRepeatableChange={handleRepeatableChange(
                parameter,
              )}
              handleRepeatableAdd={handleRepeatableAdd(
                parameter,
              )}
              handleRepeatableRemove={handleRepeatableRemove(
                parameter,
              )}
              options={parameter}
            />
          );
        })}
      </div>
    </div>
  );
};
