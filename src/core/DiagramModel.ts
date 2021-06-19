import { DefaultLinkModel, DiagramModel as DefaultDiagramModel, DiagramModelGenerics, NodeModelGenerics } from '@projectstorm/react-diagrams'
import NodeModel, { NodeModelOptions } from './NodeModel'
import { SerializedDiagramModel } from './types/SerializedDiagramModel'
import VERSION from './utils/version'

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export default class DiagramModel extends DefaultDiagramModel {
	latestNodes: NodeModel[] = []

	addNode(node) {
		this.attemptLinkToLatest(node)
		this.smartInspectorNames(node)		 
		this.latestNodes.unshift(node);
		return super.addNode(node)
	}

    serialize() : SerializedDiagramModel {
		return {
			...super.serialize(),
			version: VERSION
		}
    }

    hasNode(node) {
        return Boolean(node.id && this.getNode(node.id))        
    }

    attemptLinkToLatest(node)
    {
        
        let linked = false;
        
        // Try to link to latest nodes
        this.latestNodes.find(latest => {
            if(this.hasNode(latest)) {
                if(this.canLink(latest, node)) {
                    // Spread the nodes nicely
                    this.setLinkedNodePosition(latest, node)
                    // Link to latest node
                    this.addAll(
                        this.getAutomatedLink(latest, node)
                    );
                    // Dont continue traversing latestNodes array
                    return linked = true;
                }

            }
        })
        

        if(linked) return;

        // Fallback 1: place below latest node
        // Fallback 2: place at 100, 100
        let latest: any = [...this.latestNodes][0] ?? null;
        
        node.setPosition(
            latest?.position?.x ? latest.position.x : 100,
            latest?.position?.y ? latest.position.y + 75 : 100            
        );
    }

	setLocked(locked: boolean = true) {
		super.setLocked(locked)

		if(locked) {
			//console.log(this.listeners)
			// this.deregisterListener(DiagramListener)
			//this.deregisterListener('zoom')
		} else {
			//this.registerListener(DiagramListener)
			//this.registerListener('zoom')			
		}
	}

    smartInspectorNames(node)
    {
        if(node.options.name != 'Inspect') return;

        let nameParam = node.options.parameters.find(n => n.name == 'node_name')

        let sourceLink: any = Object.values(node.ports?.Input?.links)[0] ?? null
        if(!sourceLink) return;
        let sourcePortName = sourceLink.sourcePort.options.name ?? false
        
        // It must be a specific name to make sense
        if(!sourcePortName || sourcePortName == 'Output') return;

        nameParam.value = sourcePortName
        
    }

    getAutomatedLink(from, to) {
        if(!this.canLink(from, to)) return;

        // fromPort: prefer first unused outPort. Otherwise defaults to first
        let fromPort: any = this.getAutomatedFromPort(from)

        // toPort: the first inPort
        let toPort: any = Object.values(to.getInPorts())[0];
        
        // Links
        let link = new DefaultLinkModel()
        link.setSourcePort(fromPort);
        link.setTargetPort(toPort);            
        
        // track: https://github.com/projectstorm/react-diagrams/issues/617
        //link.addLabel(Math.floor(Math.random()*1000));

        // Report
        fromPort.reportPosition()
        toPort.reportPosition()

        return link
    }

	getAutomatedFromPort(fromNode) {
        // fromPort: prefer first unused outPort. Otherwise defaults to first
        return Object.values(fromNode.getOutPorts()).find((candidate: any) => {
            return Object.values(candidate.links).length === 0
        }) ?? Object.values(fromNode.getOutPorts())[0]
	}

    canLink(from, to)
    {
        // Has from node?
        if(!from) return
        
        // Resolve ports
        let fromPort = Object.values(from.getOutPorts())[0] ?? false;
        let toPort = Object.values(to.getInPorts())[0] ?? false;

        // Ensure there are ports to connect to
        return fromPort && toPort
    }
	
    setLinkedNodePosition(latest, node)
    {
		let fromPort = this.getAutomatedFromPort(latest)
		let position = Object.values(latest.getOutPorts()).indexOf(fromPort)

        node.setPosition(
            latest.position.x + 200,
            latest.position.y + position * 75
        );
    }  	
}