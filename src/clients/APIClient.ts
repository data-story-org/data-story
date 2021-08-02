import axios from 'axios';
import ClientInterface from './ClientInterface';

export default class APIClient implements ClientInterface {
  public root = 'http://localhost:3000'; // https://data-story-server.herokuapp.com

  constructor(root: string) {
    if (root) this.root = root;
  }

  boot(options: object): Promise<any> {
    return axios.post(this.root + '/boot', options);
  }

  run(model): Promise<any> {
    return axios.post(this.root + '/run', {
      model: model.toJson(),
    });
  }

  save(name, model) {
    return axios.post(this.root + '/save', {
      name,
      model: model.toJson(),
    });
  }
}
