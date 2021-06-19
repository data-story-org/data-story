import DiagramModel from "../../../src/core/DiagramModel"
import { DiagramModelBuilder } from "../../../src/core/DiagramModelBuilder"
import Feature from "../../../src/core/Feature"
import OutputProvider from "../../../src/server/nodes/OutputProvider"
import Server from "../../../src/server/Server"
import ServerDiagram from "../../../src/server/ServerDiagram"
import ServerNode from "../../../src/server/ServerNode"
import ServerNodeFactory from '../../../src/server/ServerNodeFactory'

export class ServerNodeTester {
	diagram: DiagramModel
	runResult: ServerDiagram
	nodeClass
	parameterKeyValues: {}
	configurations = {}
	shouldDoAssertCanRun = false
	shouldDoAssertCantRun = false
	shouldDoAssertOutputs = false
	shouldDoAssertOutputCounts = false
	outputMap = {}
	outputCountMap = {}
	inputMap = {}
	hasRun = false
	ranSuccessfully: boolean

	constructor(nodeClass) {
		this.nodeClass = nodeClass
	}

	begin() {
		return this
	}

	configuration(configurations) {
		this.configurations = configurations
		return this
	}

	parameters(parameterKeyValues) {
		this.parameterKeyValues = parameterKeyValues
		return this
	}

	hasParameters(parameterKeyValues) {
		return this.parameters(parameterKeyValues)
	}

	and() {
		return this
	}

	has() {
		return this
	}

	hasInputs(inputMap) {
		this.inputMap = inputMap
		return this
	}

	hasInput(features) {
		return this.hasInputs({
			Input: [features].flat()
		})
	}

	hasDefaultParameters() {
		return this
	}

	assertCanRun() {
		this.shouldDoAssertCanRun = true
		return this
	}

	assertCantRun() {
		this.shouldDoAssertCantRun = true
		return this
	}	

	assertOutput(features: any) {
		return this.assertOutputs({
			Output: [features].flat()
		})
	}

	assertOutputs(outputMap: {}) {
		this.shouldDoAssertOutputs = true
		this.outputMap = outputMap
		return this
	}

	assertOutputCount(count: number) {
		return this.assertOutputCounts({
			Output: count
		})
	}

	assertOutputCounts(outputCountMap: {}) {
		this.shouldDoAssertOutputCounts = true
		this.outputCountMap = outputCountMap
		return this		
	}

	async finish() {
		this.setupDiagram()
		if(this.shouldDoAssertCanRun) await this.doAssertCanRun();
		if(this.shouldDoAssertCantRun) await this.doAssertCantRun();
		if(this.shouldDoAssertOutputs) await this.doAssertOutputs()
		if(this.shouldDoAssertOutputCounts) await this.doAssertOutputCounts()
	}

	protected setupDiagram() {

		this.diagram = DiagramModelBuilder.begin()

			.add(OutputProvider, {
				// Used by the ServerNode run method to fan out data
				outputs: this.inputMap
			}, {
				// used by the ServerNode constructor to override default input/outputs
				ports: Object.keys(this.inputMap).map(p => {
					return {
						name: p,
						in: false,
					}
				})
			})
			.add(this.nodeClass, this.parameterKeyValues, this.configurations)
			.finish()
	}

	protected async doAssertCanRun() {
		await this.runOnce()

		expect(this.ranSuccessfully).toBe(true)
	}

	protected async doAssertCantRun() {
		await this.runOnce()

		expect(this.ranSuccessfully).toBe(false)
	}	

	protected async doAssertOutputs() {
		await this.runOnce()

		let serverDiagram = this.runResult

		// Check explicitly provided port outputs
		for(const [portName, expected] of Object.entries(this.outputMap)) {
			let port = serverDiagram.findByName(portName)
			let expectedFeatures = (expected as any).map(f => new Feature(f))
			expect(port.features).toStrictEqual(expectedFeatures)
		}

		// Check that no other ports emits feautures
		let ports = serverDiagram.findByName(this.nodeClass.name).ports
		let outputingPorts = ports.filter(p => p.features && p.features.length).map(p => p.name)
		const msg = 'There was a port outputting features that was not listed!'
		expect({msg, keys: Object.keys(this.outputMap)}).toEqual({msg, keys: outputingPorts})
	}

	protected async doAssertOutputCounts() {
		await this.runOnce()

		let serverDiagram = this.runResult

		// Check explicitly provided port outputs
		for(const [portName, expectedCount] of Object.entries(this.outputCountMap)) {
			let port = serverDiagram.findByName(portName)
			expect(port.features.length).toStrictEqual(expectedCount)
		}

		// Check that no other ports emits feautures
		let ports = serverDiagram.findByName(this.nodeClass.name).ports
		let outputingPorts = ports.filter(p => p.features && p.features.length).map(p => p.name)
		const msg = 'There was a port outputting features that was not listed!'
		
		expect({msg, keys: Object.keys(this.outputCountMap)}).toEqual({msg, keys: outputingPorts})
	}

	protected async runOnce() {
        if(this.hasRun) return

		let server = new Server

		await server.run(this.diagram).then((result: any) => {
			this.runResult = result.data.diagram
			this.ranSuccessfully = true
		}).catch(f => {
			console.warn(f)
			this.ranSuccessfully = false
		})

		this.hasRun = true
	}
}

export function when(nodeClass) {
	return new ServerNodeTester(nodeClass)
}