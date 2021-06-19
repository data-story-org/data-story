import { get } from './utils/Obj'

export default class Feature {
	constructor(public original: any = null) {}

    public get(property: string) {
        return get(this.original,property)
    }

    public set(...args) {
		if(args.length === 2) {
			this.original[args[0]] = args[1]
		}

		if(args.length === 1) {
			this.original = args[0]
		}

        return this
    }	

    public type() {
        return typeof this.original
    }

    public unbox() {
        if(this.type() == 'object') {
            return this.original
        }

        return this.original
    }    
}