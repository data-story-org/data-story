import NodeParameter from "../../core/NodeParameter";
import ServerNode from "../ServerNode";

export default class ThrowError extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'ThrowError',
			summary: 'Throws an error',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: [],
			// Explicitly configured
			...options,
		})
	}

    async run() {
        if(this.input().length) throw Error(
			this.getParameterValue('error_message')
		)
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('error_message').withValue('Something went wrong!'),
		]
	}	
}