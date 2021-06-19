import ServerNode from "../ServerNode";
import {saveAs} from 'file-saver';
import NodeParameter from "../../core/NodeParameter";

export default class DownloadGeoJSON extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'DownloadGeoJSON',
			summary: 'Download features as GeoJSON',
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
		const content = JSON.stringify({
			type: "FeatureCollection",
			features: this.input().map(f => f.original)
		  }, null, indentation)

        // @ts-ignore: By adding 'dom' to tsconfig lib Blob IS accessible here
        var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('filename').withValue('features.geojson'),
		]
	}		
}