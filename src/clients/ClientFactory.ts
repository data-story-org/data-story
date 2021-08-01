import APIClient from './APIClient';
import LocalClient from './local/LocalClient';

export default (config: {
  client: string;
  server: string;
}): APIClient | LocalClient => {
  if (config && config.client == 'APIClient')
    return new APIClient(config.server);

  return new LocalClient();
};
