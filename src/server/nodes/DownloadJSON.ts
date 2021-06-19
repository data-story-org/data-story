import ServerNode from "../ServerNode";
import {saveAs} from 'file-saver';
import NodeParameter from "../../core/NodeParameter";

export default class DownloadJSON extends ServerNode {
	save = saveAs

	constructor(options = {}) {
		super({
			// Defaults
			name: 'DownloadJSON',
			summary: 'Download features as JSON',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: [],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        const filename = this.getParameterValue('filename')
        const indentation = 4 //this.getParameterValue('pretty') ? 4 : 0;
        const json = JSON.stringify(this.input().map(f => f.original), null, indentation)
        // @ts-ignore: By adding 'dom' to tsconfig lib Blob IS accessible here
        var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
        this.save(blob, filename);
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('filename').withValue('data.json'),
		]
	}		
}