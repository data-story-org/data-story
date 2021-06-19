import CreateJSON from '../../../../src/server/nodes/CreateJSON'
import { when } from "../ServerNodeTester";

it('has a default key value pair', async () => {
    await when(CreateJSON).hasDefaultParameters()
		.assertOutput([{resource: 'todos'}])
		.finish()
});

it('accepts a json array of features', async () => {
    await when(CreateJSON).hasParameters({features: '[{"cool": "yes"}, {"cool": "sometimes"}]'})
		.assertOutput([{cool: 'yes'}, {cool: 'sometimes'}])
		.finish()
});