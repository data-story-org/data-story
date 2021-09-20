import { BootPayload } from '@data-story-org/core/lib/src/types/BootPayload';
import axios from 'axios';
import { DiagramModel } from '../diagram/models';
import {
  ClientInterface,
  RunResult,
} from './ClientInterface';
import { parse } from 'flatted';
import { SerializedReactDiagram } from '../types';

export class APIClient implements ClientInterface {
  public root = 'http://localhost:3000'; // https://data-story-server.herokuapp.com

  constructor(root: string) {
    if (root) this.root = root;
  }

  async boot(options: object): Promise<BootPayload> {
    const response = await axios.post(
      this.root + '/boot',
      options,
    );

    return response.data;
  }

  async run(model: DiagramModel): Promise<RunResult> {
    const response = await axios.post(
      this.root + '/run',
      {
        model: model.serialize(),
      },
      {
        transformResponse: (res) => parse(res),
      },
    );

    return response.data as RunResult;
  }

  load(name: string): SerializedReactDiagram {
    throw 'Not implemented';
  }

  save(name, model) {
    return axios.post(this.root + '/save', {
      name,
      model: model.toJson(),
    });
  }
}
