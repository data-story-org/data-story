import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import Feature from "../../core/Feature";

const placeholder =
`// PER FEATURE mode gives you access to variables: previous, current and next, ie
// previous.get('some_property')
// current.set('some_property', 123)

// GLOBAL mode gives full control
// use this.input() and this.output()
`

export default class Evaluate extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Evaluate',
			summary: 'Evaluate javascript',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
		return this.getParameterValue('evaluation_context') == 'per_feature'
			? this.runPerFeature()
			: this.runGlobal()
    }

	runPerFeature() {
		let inputs = this.input(); // maintain state - no additional feature clones

        this.output(
            inputs.map((current, index) => {
				// previous and next have 'null' features as fallback
				const previous = inputs[index-1] ?? new Feature()
				const next = inputs[index+1] ?? new Feature()

                eval(this.getExpression())
                return current
            })
        );
	}

	runGlobal() {
		eval(this.getExpression())
	}

	getExpression() {
		return this.getParameterValue('expression')
	}
	
	getParameters() {
		return [
			...super.getParameters(),
			NodeParameter.select('evaluation_context')
				.withOptions(['per_feature', 'global'])
				.withValue('per_feature'),
            NodeParameter.js('expression')
				.withDescription("javascript code to execute")
				.withValue(placeholder)
		]
	}		
}