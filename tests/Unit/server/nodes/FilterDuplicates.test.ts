import FilterDuplicates from '../../../../src/server/nodes/FilterDuplicates'
import { when } from "../ServerNodeTester";

it('can filter out primitive duplicates', async () => {
    await when(FilterDuplicates).hasInput([7,7,7]).and().parameters({
		attribute: 'nbr'
	})
		.assertOutput([7])
		.finish()
});

it('can filter on shallow object properties', async () => {
    await when(FilterDuplicates).hasInput([{nbr: 3}, {nbr: 3}]).and().parameters({
		attribute: 'nbr'
	})
		.assertOutput([{nbr: 3}])
		.finish()
});

it('can filter on nested object properties using dot notation', async () => {
    await when(FilterDuplicates).hasInput([
		{a: {b: {c: 5}}},
		{a: {b: {c: 5}}}]
	).and().parameters({
		attribute: 'a.b.c'
	}).assertOutput([
		{a: {b: {c: 5}}}
	]).finish()
});

