import CreateGrid from '../../../../src/server/nodes/CreateGrid'
import { when } from "../ServerNodeTester";

it('creates a 10 x 10 grid with default parameters', async () => {
    await when(CreateGrid).hasDefaultParameters()
		.assertCanRun()
		.assertOutputCount(100)
		.finish()
});

it('can set a explicit grid size if max x/y is empty', async () => {
    await when(CreateGrid).hasParameters({
		'grid_max_x': '',
		'grid_max_y': '',
		'grid_size_x': 2,
		'grid_size_y': 2,
	})
		.assertOutputCount(4)
		.finish()
});