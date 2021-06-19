import Sample from '../../../../src/server/nodes/Sample'
import { when } from "../ServerNodeTester";

it('can sample first N features', async () => {
    await when(Sample).hasInput([1,2,3])
		.and().parameters({
			first_n_features: 2
		})
		.assertOutput([1,2])
		.finish()
});