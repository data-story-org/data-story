import { DiagramModel } from '../lib/diagram/models';
import {
  BootPayload,
  SerializedReactDiagram,
  Story,
} from '../lib/types';

export interface RunResult {
  diagram: DiagramModel;
}

export interface ClientInterface {
  boot(options: object): Promise<BootPayload>;
  run(model: DiagramModel): Promise<RunResult>;
  save(story: Story): Promise<any>;
  delete(storyName: string): Promise<void>;
  load(name: string): SerializedReactDiagram;
}
