import Flatten from '../../../../src/server/nodes/Flatten'
import { when } from "../ServerNodeTester";

it('does not break non flattable features', async () => {
    await when(Flatten).hasInput({name: 'ajthinking'})
		.assertOutput({name: 'ajthinking'})
		.finish()
});

it('can flatten arrays in arrays', async () => {
    await when(Flatten).hasInput([[1,1,1]])
		.assertOutputCount(3)
		.assertOutput([1,1,1])
		.finish()
});