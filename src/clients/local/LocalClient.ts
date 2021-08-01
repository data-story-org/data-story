import { LocalServer } from './LocalServer'
import DiagramModel from '../../diagram/models/DiagramModel';
import ClientInterface from '../ClientInterface';
import context from './localSampleContext'

const server = new LocalServer(context);

export default class LocalClient implements ClientInterface {
  boot(): Promise<any> {
    return server.boot();
  }

  run(model: DiagramModel): Promise<{}> {
    return server.run(model.serialize());
  }

  save(name: string, model: DiagramModel): Promise<{}> {
    return server.save(name, model);
  }
}
