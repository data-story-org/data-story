import ServerNodeInterface from "../../ServerNodeInterface";
import HTTPRequest from "../HTTPRequest";

export default class DeleteRepositories extends HTTPRequest implements ServerNodeInterface {
	constructor(options = {}) {
		super({
			// Defaults
			name: 'DeleteRepositories',
			summary: 'Delete github repositores',
			category: 'Github',
			defaultInPorts: ['Input'],
			defaultOutPorts: ['Output'],			
			// Explicitly configured
			...options,
		})
	}

    serialize() {
        let description = super.serialize()

        let verbParam = description.parameters.find(p => p.name == 'verb')
        verbParam.value = 'DELETE'
        let urlParam = description.parameters.find(p => p.name == 'url')
        urlParam.value = 'https://api.github.com/repos/ajthinking/draft-401'
        let configParam = description.parameters.find(p => p.name == 'config')
        configParam.value = '{"headers": {"Authorization": "token TOKEN_GOES_HERE"}}' // thx toshibi!   

        return description
    }    
}