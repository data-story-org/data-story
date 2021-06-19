import DiagramModel from "./DiagramModel"
import NodeModel from "./NodeModel"

export class DiagramModelBuilder {
	currentNode?: NodeModel
	diagram?: DiagramModel

	static begin() {
		return new this
	}

	add(nodeClass, parameterKeyValues = {}, config = {}) {
		let diagram = this.getDiagram()

		let node = new NodeModel(
			{
				...(new nodeClass).serialize(),
				...config
			}
		)

		diagram.addNode(node)

		this.diagram = diagram

		this.currentNode = node

		return this.withParameters(parameterKeyValues)
	}

	withParameters(parameters: object) {
		for (const [name, value] of Object.entries(parameters)) {
			let parameter = this.currentNode.parameters.find(p => p.name == name)
			parameter.value = value
		}

		return this
	}

	finish() {
		return this.getDiagram()
	}

	protected getDiagram() {
		return this.diagram ?? new DiagramModel()
	}
}