import APIClient from './APIClient';
import LocalClient from './LocalClient';

export default (config) => {
	if(config.client == 'APIClient') return new APIClient(config.server)

	return new LocalClient
}