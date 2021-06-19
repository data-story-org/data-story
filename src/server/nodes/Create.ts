import ServerNode from "../ServerNode";
import Feature from "../../core/Feature";
import NodeParameter from "../../core/NodeParameter";

export default class Create extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Create',
			summary: 'Create a null feature',
			category: 'Workflow',
			defaultInPorts: [],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
		const featurType = this.getParameterValue('feature_type')
		const contents = this.getParameterValue('contents')

		if(featurType == 'null') {
			this.output([new Feature()])
		}

		if(featurType == 'object') {
			this.output([new Feature(JSON.parse(contents))])
		}		

		if(featurType == 'float') {
			this.output([new Feature(parseFloat(contents))])
		}

		if(featurType == 'integer') {
			this.output([new Feature(parseInt(contents))])
		}	
		
		if(featurType == 'string') {
			this.output([new Feature(contents)])
		}			
    }

	getParameters() {
		return [
			...super.getParameters(),
			NodeParameter.select('feature_type').withOptions(['null', 'object', 'float', 'integer', 'string']).withValue('object'),
			NodeParameter.json('contents').withValue('{}'),
		]
	}	
}