import axios from 'axios';
import {nonCircularJsonStringify} from '../utils/nonCircularJsonStringify'
import ClientInterface from './ClientInterface'

export default class APIClient implements ClientInterface {
    constructor(
        public root: string = 'http://localhost:3000' // https://data-story-server.herokuapp.com
    ) {}

    boot(options: object) : Promise<any>{
        return axios.post(this.root + '/boot', options)
    }

    run(model): Promise<any> {
        return axios.post(this.root + '/run', {
            model: nonCircularJsonStringify(
                model.serialize() 
            )
        })        
    }

    save(name, model) {
        return new Promise(() => {})
    }
}