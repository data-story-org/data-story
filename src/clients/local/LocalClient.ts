import { LocalServer } from './LocalServer'
import DiagramModel from '../../diagram/models/DiagramModel';
import ClientInterface from '../ClientInterface';
import context from './localSampleContext'
import { BootPayload } from '../../../../core/lib/src/types/BootPayload';

const server = new LocalServer(context);

export default class LocalClient implements ClientInterface {
  boot(): Promise<BootPayload> {
    return server.boot();
  }

  run(model: DiagramModel): Promise<{}> {
    return server.run(model.serialize());
  }

  save(name: string, model: DiagramModel): Promise<{}> {
    return server.save(name, model);
  }
}
