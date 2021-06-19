import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateSequence extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'CreateSequence',
			summary: 'Create a sequence of objects',
			category: 'Reader',
			defaultInPorts: [],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        let count = parseInt(this.getParameterValue('number_of_features_to_create'))

        this.output(
            Array.from(Array(count).keys()).map(i => {
                return new Feature({ creation_id: i})
            })
        );       
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('number_of_features_to_create').withValue(10),
		]
	}	
}