import { Server } from '@data-story-org/core';
import DiagramModel from '../DiagramModel';
import ClientInterface from './ClientInterface';

const context = {
  apis: [
    {
      name: 'todos',
      url: 'https://jsonplaceholder.cypress.io/todos',
    },
  ],
  models: {
    primes: [1, 3, 5, 7, 11, 13],
  },
};

const server = new Server(context);

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
