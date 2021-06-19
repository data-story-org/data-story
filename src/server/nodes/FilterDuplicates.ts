import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import Feature from "../../core/Feature";

export default class FilterDuplicates extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'FilterDuplicates',
			summary: 'Remove duplicates',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
		this.output(
			this.uniqueFeatures(this.input())
		);
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('attribute').withDescription("attribute to filter on, may use dot notation")
		]
	}

	uniqueFeatures(all) {
		const attribute = this.getParameterValue('attribute');
		var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
		var uniqueFeatures = []
	
		all.forEach(function(feature) {
			let comparable = attribute.split('.').reduce((traversed, part) => {
				return part ? traversed[part] : traversed
			}, feature.original)
			var type = typeof comparable;

			if((type in prims)) {
				if(!prims[type].hasOwnProperty(comparable)) {
					uniqueFeatures.push(feature)
					prims[type][comparable] = true
				}
			} else {
				// // Strict does not work
				// if(objs.indexOf(comparable) == -1) {
				// 	uniqueFeatures.push(feature)
				// 	objs.push(comparable);
				// }

				// Cheat by comparing JSON
				comparable = JSON.stringify(comparable)
				if(objs.indexOf(comparable) == -1) {
					uniqueFeatures.push(feature)
					objs.push(comparable);
				}
			}
		});

		return uniqueFeatures
	}	
}