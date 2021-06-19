import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Sample extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Sample',
			summary: 'Sample first N features',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        
        this.output(
            this.input().slice(
				0,
				this.getParameterValue('first_n_features')
			)
        )
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('first_n_features').withValue(100),
		]
	}     
}