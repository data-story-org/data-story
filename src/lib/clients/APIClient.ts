import { BootPayload } from '@data-story-org/core/lib/src/types/BootPayload';
import axios from 'axios';
import { DiagramModel } from '../diagram/models';
import { ClientInterface } from './ClientInterface';
import { parse } from 'flatted';
import { SerializedReactDiagram, Story } from '../types';
import {
  DiagramRunResult,
  RunResult,
} from '@data-story-org/core';

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

  async run(model: DiagramModel): RunResult {
    const response = await axios.post(
      this.root + '/run',
      {
        model: model.serialize(),
      },
      {
        transformResponse: (res) => parse(res),
      },
    );

    return response.data as DiagramRunResult;
  }

  load(name: string): SerializedReactDiagram {
    throw 'Not implemented';
  }

  save(story: Story) {
    return axios.post(this.root + '/save', {
      story,
    });
  }

  async delete(storyName: string) {
    throw 'not implemented';
  }
}
