import Sort from '../../../../src/server/nodes/Sort'
import { when } from "../ServerNodeTester";

it('can sort shallow objects', async () => {
    await when(Sort).hasInput([
		{code: 1},
		{code: 3},
		{code: 2},
	]).and().parameters({sort_attribute: 'code'})
	.assertOutput([
		{code: 1},
		{code: 2},
		{code: 3},			
	])
	.finish()
});

it('can sort primitives', async () => {
    await when(Sort).hasInput([1,3,2])
		.assertOutput([1,2,3])
		.finish()

	await when(Sort).hasInput(['a','x','b'])
		.assertOutput(['a', 'b', 'x'])
		.finish()		
});