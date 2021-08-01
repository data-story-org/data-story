import { LocalServer } from './LocalServer'
import DiagramModel from '../../diagram/models/DiagramModel';
import ClientInterface from '../ClientInterface';
import context from './localSampleContext'

const server = new LocalServer(context);

export default class LocalClient
  implements ClientInterface
{
  boot() {
    return server.boot();
  }

  run(model: DiagramModel) {
    return server.run(model.serialize());
  }

  save(name: string, model: DiagramModel) {
    return server.save(name, model);
  }
}
