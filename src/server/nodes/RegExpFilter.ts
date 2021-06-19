import ServerNode from "../ServerNode";
// @ts-ignore
import { trim } from "../../core/utils/Str"
import NodeParameter from "../../core/NodeParameter";

export default class RegExpFilter extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'RegExpFilter',
			summary: 'Filter features matching an attribute regular expression',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Passed', 'Failed'],
			// Explicitly configured
			...options,
		})
	}

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('attribute').withValue(''),
            NodeParameter.string('expression').withValue('/test|draft|dummy/'),            
		]
	}	

    async run() {
        this.output(this.matching(), 'Passed');
        this.output(this.notMatching(), 'Failed');
    }

    protected matching() {
        return this.filterByRegExp(this.input())
    }

    protected notMatching() {
        return this.filterByRegExp(this.input(), true)
    }    
    
    protected filterByRegExp(features, returnFailed = false) {
        return features.filter(feature => {
            let expression = this.getExpression()
            let attribute = this.getParameterValue('attribute')
			let comparable = attribute.split('.').reduce((traversed, part) => {
				return part ? traversed[part] : traversed
			}, feature.original)

            return returnFailed
                ? !expression.test(comparable)
                : expression.test(comparable)
        })
    }

    protected getExpression() {
        let cleaned = trim(this.getParameterValue('expression'), '/')
        return RegExp(cleaned)
    }
}