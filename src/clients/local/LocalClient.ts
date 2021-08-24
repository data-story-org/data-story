import { LocalServer } from './LocalServer';
import { DiagramModel } from '../../diagram/models';
import ClientInterface from '../ClientInterface';
import context from './localSampleContext';

const server = new LocalServer(context);

export default class LocalClient
  implements ClientInterface
{
  boot(): Promise<any> {
    return server.boot();
  }

  run(model: DiagramModel): Promise<{}> {
    return server.run(model.serialize());
  }

  load(name: string): string {
    return server.load(name);
  }

  save(name: string, model: DiagramModel): Promise<{}> {
    return server.save(name, model);
  }
}
