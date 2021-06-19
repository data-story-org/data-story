import CreateCSV from '../../../../src/server/nodes/CreateCSV'
import { when } from "../ServerNodeTester";

let content =
`date	user	score
2021-05-26	0	0.09223255129
2021-05-27	1	0.9819036611
2021-05-28	2	0.2148094642`

it('can load csv content', async () => {
    await when(CreateCSV).hasParameters({content})
		.assertOutputCount(3)
		.finish()
});

content =
`date,user,score
2021-05-26,0,0.09223255129
2021-05-27,1,0.9819036611
2021-05-28,2,0.2148094642`

it('can load csv content with custom delimiter', async () => {
    await when(CreateCSV).hasParameters({
		content,
		delimiter: ','
	})
		.assertOutputCount(3)
		.finish()
});

content =
`nbr
zero
1
2.0`

it('will convert to int or float when possible', async () => {
    await when(CreateCSV).hasParameters({content})
		.assertOutput([
			{nbr: 'zero'},
			{nbr: 1},
			{nbr: 2.0 }
		]).finish()
});