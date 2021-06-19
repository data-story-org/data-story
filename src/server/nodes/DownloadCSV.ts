import ServerNode from "../ServerNode";
import {saveAs} from 'file-saver';
import NodeParameter from "../../core/NodeParameter";

export default class DownloadCSV extends ServerNode {
	save = saveAs

	constructor(options = {}) {
		super({
			// Defaults
			name: 'DownloadCSV',
			summary: 'Download features as CSV',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        const filename = this.getParameterValue('filename')
        const separator = '	'
		const headers = Object.keys(this.input().find(first => true).original).join(separator)
		const rows = this.input().map(feature => {
			return Object.values(feature.original).join(separator)
		})
        const csv = [
			headers,
			...rows
		].join('\n')
        // @ts-ignore: By adding 'dom' to tsconfig lib Blob IS accessible here
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        this.save(blob, filename);
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('filename').withValue('data.csv'),
		]
	}      
}