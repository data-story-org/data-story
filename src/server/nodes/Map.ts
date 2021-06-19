import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Map extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Map',
			summary: 'Map into a property',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}    

    async run() {
        const property = this.getParameterValue('property');
        const paths = property.split('.')

        this.output(
            this.input().map(item => {
                let mapped = paths.reduce((carry, path) => {
                    return carry[path]
                }, item.original)

                return new Feature(mapped)
            })
        );
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('property').withValue('data'),            
		]
	}	
}