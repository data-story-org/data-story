import RegExpFilter from '../../../../src/server/nodes/RegExpFilter'
import { when } from "../ServerNodeTester";

it('can filter features based on property regex match', async () => {
    await when(RegExpFilter).hasInput(['imac', 'iphone', 'samsung'])
		.and().parameters({expression: '/^i.*/'})
		.assertOutputs({
			Passed: ['imac', 'iphone'],
			Failed: ['samsung']
		})
		.finish()
});