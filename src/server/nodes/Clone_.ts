import NodeParameter from "../../core/NodeParameter";
import ServerNode from "../ServerNode";

export default class Clone_ extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Clone_',
			summary: 'Make a set of clones',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
        this.output(
            [
				this.input(),
				...Array(
					parseInt(this.getParameterValue('number_of_clones'))
				).fill(this.input())
			].flat()
        )
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('number_of_clones').withValue(10),
		]
	}	
}