import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Comment extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Comment',
			summary: 'Add a comment',
			category: 'Workflow',
			defaultInPorts: [],
			defaultOutPorts: [],
			// Explicitly configured
			...options,
		})
	}  

    async run() {}
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('text').withValue('This is a comment'),
		]
	}
}