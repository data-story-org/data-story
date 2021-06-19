import CreateSequence from '../../../../src/server/nodes/CreateSequence'
import { when } from "../ServerNodeTester";

it('creates 10 objects by default', async () => {
    await when(CreateSequence).hasDefaultParameters()
		.assertCanRun()
		.assertOutputCount(10)
		.finish()
});

it('can output any sequence length and it attaches a creation id attribute', async () => {
    await when(CreateSequence).hasParameters({number_of_features_to_create: 3})
		.assertOutput([{creation_id: 0}, {creation_id: 1}, {creation_id: 2}])
		.finish()
});