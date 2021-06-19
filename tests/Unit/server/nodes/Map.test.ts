import Map from '../../../../src/server/nodes/Map'
import { when } from "../ServerNodeTester";

it('can map into properties', async () => {
    await when(Map).hasInput({name: 'ajthinking'})
		.and().parameters({property: 'name'})
		.assertOutput('ajthinking')
		.finish()
});

it('can map into nested properties', async () => {
    await when(Map).hasInput({a: {b: 'c'}})
		.and().parameters({property: 'a.b'})
		.assertOutput('c')
		.finish()
});