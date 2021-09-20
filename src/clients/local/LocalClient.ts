import { LocalServer } from './LocalServer';
import { DiagramModel } from '../../diagram/models';
import {
  ClientInterface,
  RunResult,
} from '../ClientInterface';
import context from './localSampleContext';
import { BootPayload } from '@data-story-org/core';
import { SerializedReactDiagram } from '../../types';

const server = new LocalServer(context);

export class LocalClient implements ClientInterface {
  async boot(): Promise<BootPayload> {
    return server.boot();
  }

  async run(model: DiagramModel): Promise<RunResult> {
    return (await server.run(
      model.serialize(),
    )) as RunResult;
  }

  load(name: string): SerializedReactDiagram {
    return server.load(name);
  }

  save(name: string, model: DiagramModel): Promise<{}> {
    return server.save(name, model);
  }
}
