import DownloadCSV from '../../../../src/server/nodes/DownloadCSV'
import { when } from "../ServerNodeTester";

it.skip('DESCRIPTION', async () => {
    await when(DownloadCSV).hasDefaultParameters()
		.assertCanRun()
		.finish()
	
	throw 'Please finish tests for node DownloadCSV'
});