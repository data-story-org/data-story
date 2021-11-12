import { DiagramModel } from '../diagram/models';
import {
  BootPayload,
  SerializedReactDiagram,
  Story,
} from '../types';
import { RunResult } from '@data-story-org/core';

export interface ClientInterface {
  boot(options: object): Promise<BootPayload>;
  run(model: DiagramModel): RunResult;
  save(story: Story): Promise<any>;
  delete(storyName: string): Promise<void>;
  load(name: string): SerializedReactDiagram;
}
