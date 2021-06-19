import Evaluate from '../../../../src/server/nodes/Evaluate'
import { when } from "../ServerNodeTester";

it('can execute javascript per feature', async () => {
    await when(Evaluate).hasInput([{nbr: 3}]).and().parameters({
		expression: `
			let newValue = current.get('nbr') * 3
			current.set('nbr', newValue)
		`
	})
		.assertOutput([{nbr: 9}])
		.finish()
});

it('can execute javascript globally', async () => {
    await when(Evaluate).hasInput([1,2,3]).and().parameters({
		evaluation_context: 'global',
		expression: `
			this.output(
				this.input().reverse()
			)
		`
	})
		.assertOutput([3,2,1])
		.finish()
});

it('can access previous and next when computing', async () => {
    await when(Evaluate).hasInput([
		{nbr: 1},
		{nbr: 2},
		{nbr: 3},
	]).and().parameters({
		expression: `
			current.set(
				'sum',
				current.get('nbr') + previous.get('sum')
			)
		`
	})
	.assertOutput([
		{nbr: 1, sum: 1},
		{nbr: 2, sum: 3},
		{nbr: 3, sum: 6},				
	])
	.finish()
});

it('can access previous and next when computing with primitives', async () => {
    await when(Evaluate).hasInput([1,1,1,1,1]).and().parameters({
		expression: `
			current.set(
				current.get() + previous.get()
			)
		`
	})
	.assertOutput([1,2,3,4,5])
	.finish()
});
