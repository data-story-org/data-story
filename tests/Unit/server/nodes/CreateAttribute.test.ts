import CreateAttribute from '../../../../src/server/nodes/CreateAttribute'
import { when } from "../ServerNodeTester";

it('can add a attribute value to an object feature', async () => {
    await when(CreateAttribute).hasInput([{}]).and().parameters({
		attribute: 'foo',
		value: 'bar'
	})
		.assertOutput([{foo: 'bar'}])
		.finish()
});

it('can add a attribute with object value to an object feature', async () => {
    await when(CreateAttribute).hasInput([{}]).and().parameters({
		attribute: 'foo',
		value: {}
	})
		.assertOutput([{foo: {}}])
		.finish()
});