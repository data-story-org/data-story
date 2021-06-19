import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateJSON extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'CreateJSON',
			summary: 'Create features from JSON',
			category: 'Reader',
			defaultInPorts: [],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        this.output(
            JSON.parse(this.getParameterValue('features'))
                .map(item => new Feature(item))
        );
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.json('features').withValue('[{ "resource": "todos"}]'),            
		]
	}	
}