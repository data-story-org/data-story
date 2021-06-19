import Feature from '../../../../src/core/Feature';
import Aggregate from '../../../../src/server/nodes/Aggregate'
import { when } from "../ServerNodeTester";

const dates = [
	{date: '2021-05-27', id: 1},
	{date: '2021-05-27', id: 2},
	{date: '2021-05-28', id: 3},
	{date: '2021-05-28', id: 4},
]

it('can aggregate features', async () => {	
    await when(Aggregate).hasInput(dates)
		.and().parameters({'group_by': 'date'})
		.assertOutputCount(2)
		.finish()
});

it('will keep the grouping key and appended the aggregated features in a features property', async () => {	
    await when(Aggregate).hasInput(dates)
		.and().parameters({'group_by': 'date'})
		.assertOutput([
			{
				date: '2021-05-27',
				features: [
					{date: '2021-05-27', id: 1},
					{date: '2021-05-27', id: 2},
				]
			},
			{
				date: '2021-05-28',
				features: [
					{date: '2021-05-28', id: 3},
					{date: '2021-05-28', id: 4},
				]
			}
		])		
		.finish()
});