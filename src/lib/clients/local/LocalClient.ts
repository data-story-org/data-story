import { LocalServer } from './LocalServer';
import { DiagramModel } from '../../diagram/models';
import { ClientInterface } from '../ClientInterface';
import context from './localSampleContext';
import { BootPayload } from '@data-story-org/core';
import { SerializedReactDiagram, Story } from '../../types';
import {
  DiagramRunResult,
  RunResult,
} from '@data-story-org/core';

const server = new LocalServer(context);

export class LocalClient implements ClientInterface {
  async boot(): Promise<BootPayload> {
    return server.boot();
  }

  async run(model: DiagramModel): RunResult {
    return (await server.run(
      model.serialize(),
    )) as DiagramRunResult;
  }

  load(name: string): SerializedReactDiagram {
    return server.load(name);
  }

  async save(story: Story): Promise<{}> {
    return server.save(story);
  }

  async delete(storyName: string): Promise<void> {
    server.delete(storyName);
  }
}
