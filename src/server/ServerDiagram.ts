import { SerializedDiagramModel } from "../core/types/SerializedDiagramModel"

export default class ServerDiagram {
    links: any[] = []
    nodes: any[] = []
    cachedNodeDependencyMap: {[T:string]: string[];} = {
        // id1: [d1, d2, ...]
    }	
 
    static hydrate(data: SerializedDiagramModel, factory) {
        let instance = new this()
		
        for (const [key, value] of Object.entries(data)) {
            
            if(key === 'layers') {
				instance.links = Object.values(data.layers[0].models)

                instance.nodes = Object.values(data.layers[1].models).map(node => {
                    return factory.hydrate(node, instance)
                })				
                
                continue
            }
            
            instance[key] = value
        }

        return instance
    }

    async run() {
        for await (let node of this.executionOrder()) {
            await node.run()
        }
        
        return new Promise((callback) => {
            return callback({
                data: {
                    diagram: this
                } 
            })
        })
    }

    find(id: string) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links)

        return searchables.find(entity => entity.id == id)
    }

	findByName(name: string) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links)

        return searchables.find(entity => entity.name == name)		
	}

    addNode(node) {
        this.nodes.push(node)

        return this
    }

    executionOrder() {
        this.clearCachedNodeDependencies();

        let r = this.nodes.sort((n1, n2) => {

            if (this.dependsOn(n2, n1)) {
                return -1;
            }

            if (this.dependsOn(n1, n2)) {
              return 1;
            }

            return 0;
          });

		  return r
    }

    getCachedNodeDependencies(id) {
        return this.cachedNodeDependencyMap[id] ?? null
    }

    setCachedNodeDependencies(id, dependencies) {
        this.cachedNodeDependencyMap[id] = dependencies
    }

    clearCachedNodeDependencies() {
        this.cachedNodeDependencyMap = {}
    }

    dependencies(node) {
        let cached = this.getCachedNodeDependencies(node.id)
        if(cached !== null) {
            return cached;
        }

        let inPorts = Object.values(node.ports.filter(p => p.in == true))

        let linkLists = inPorts.map((port: any) => port.links)

        let links = linkLists.map(linkList => Object.values(linkList)).flat()
        let dependencies = links.map((link: any) => {
			let sourcePort = this.find(link).sourcePort
			let sourceNode = this.find(sourcePort).parentNode
			return this.find(sourceNode).id
		})

        let deepDependencies = dependencies.map(d => {
			return this.dependencies(
				this.find(d)
			)
		})

        let result = dependencies.concat(deepDependencies.flat())

        this.setCachedNodeDependencies(node.id, result)

        return result
    }

    dependsOn(n1, n2) {
        return this.dependencies(n1).map(d => {
			return d.id
		}).includes(n2.id)
    }	
}