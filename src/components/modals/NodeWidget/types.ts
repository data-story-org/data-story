import { NodeParameter } from '@data-story-org/core';
import { BaseEventHandler } from '../../../lib/types';
import {
  RepeatableFieldChange,
  RepeatableFieldInteraction,
} from '../../fields/types';

export type FieldChangeHandler = (
  param: NodeParameter,
) => BaseEventHandler;

export type RepeatableChangeHandler = (
  param: NodeParameter,
) => RepeatableFieldChange;

export type RepeatableAddHandler = (
  param: NodeParameter,
) => RepeatableFieldInteraction;

export type RepeatableRemoveHandler = (
  param: NodeParameter,
) => RepeatableFieldInteraction;
