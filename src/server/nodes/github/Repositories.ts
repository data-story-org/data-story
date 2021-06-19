import ServerNodeInterface from "../../ServerNodeInterface";
import HTTPRequest from "../HTTPRequest";

export default class Repositories extends HTTPRequest implements ServerNodeInterface {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'Repositories',
			summary: 'Fetch github repositores',
			category: 'Github',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    serialize() {
        let description = super.serialize()

        let urlParam = description.parameters.find(p => p.name == 'url')
        urlParam.value = 'https://api.github.com/users/ajthinking/repos'

        return description
    }    
}