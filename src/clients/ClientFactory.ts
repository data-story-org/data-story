import { APIClient } from './APIClient';
import { LocalClient } from './local/LocalClient';

export type Client = APIClient | LocalClient;

export const ClientFactory = (config: {
  client: string;
  server: string;
}): APIClient | LocalClient => {
  if (config && config.client == 'APIClient')
    return new APIClient(config.server);

  return new LocalClient();
};
