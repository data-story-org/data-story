import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import { groupBy } from '../../core/utils/Arr'
import Feature from "../../core/Feature";

export default class Aggregate extends ServerNode {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Aggregate',
			summary: 'Group features by attribute',
			category: 'Workflow',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    async run() {
		const groupKey = this.getParameterValue('group_by')

        const key = [
			'original',
			...(groupKey ? [groupKey] : [])
		].join('.')
        
		const groups = groupBy(this.input(), key)
		const features = [];

		for (const value in groups) {
			features.push(
				new Feature({
					[groupKey]: value,
					features: groups[value].map(feature => feature.original)
				})
			)
		}

        this.output(
            features
        )
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('group_by'),
		]
	}     
}