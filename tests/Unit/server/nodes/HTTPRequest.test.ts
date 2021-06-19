import axios from 'axios';
import HTTPRequest from '../../../../src/server/nodes/HTTPRequest'
import { when } from "../ServerNodeTester";

it.skip('can make requests', async () => {
    await when(HTTPRequest).hasInput('a feature')
		.and().parameters({url: 'https://jsonplaceholder.cypress.io/todos'})
		.and().configuration({ client: 123})
		.assertCanRun()
		.finish()
});