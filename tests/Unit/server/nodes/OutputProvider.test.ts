import OutputProvider from '../../../../src/server/nodes/OutputProvider'
import { when } from "../ServerNodeTester";

it.skip('can provide outputs', async () => {
    await when(OutputProvider).hasParameters({
		ok: [1],
		rejected: [2,3]
	})
		.assertOutputs({
			ok: [1],
			rejected: [2,3]
		})
		.finish()
});