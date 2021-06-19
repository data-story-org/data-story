import ThrowError from '../../../../src/server/nodes/ThrowError'
import { when } from "../ServerNodeTester";

it.skip('will throw an error', async () => {
    await when(ThrowError).hasInput(['a feature'])
		.assertCantRun()
		.finish()
});