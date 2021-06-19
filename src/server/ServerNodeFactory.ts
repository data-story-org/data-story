import Aggregate from './nodes/Aggregate'
import Clone_ from './nodes/Clone_'
import Comment from './nodes/Comment'
import Create from './nodes/Create'
import CreateGrid from './nodes/CreateGrid'
import CreateAttribute from './nodes/CreateAttribute'
import CreateCSV from './nodes/CreateCSV'
import CreateJSON from './nodes/CreateJSON'
import CreateSequence from './nodes/CreateSequence'
import DownloadCSV from './nodes/DownloadCSV'
import DownloadJSON from './nodes/DownloadJSON'
import DownloadGeoJSON from './nodes/DownloadGeoJSON'
import Evaluate from './nodes/Evaluate'
import FilterDuplicates from './nodes/FilterDuplicates'
import Flatten from './nodes/Flatten'
import Group from './nodes/Group'
import HTTPRequest from './nodes/HTTPRequest'
import Inspect from './nodes/Inspect'
import Log from './nodes/Log'
import Map from './nodes/Map'
import OutputProvider from './nodes/OutputProvider'
import RegExpFilter from './nodes/RegExpFilter'
import DeleteRepositories from './nodes/github/DeleteRepositories'
import Repositories from './nodes/github/Repositories'
import Sample from './nodes/Sample'
import Sort from './nodes/Sort'
import Sleep from './nodes/Sleep'
import ThrowError from './nodes/ThrowError'

import { SerializedNodeModel } from '../core/types/SerializedNodeModel'

export default class ServerNodeFactory {
    protected static nodes = {
		Aggregate,
		Clone_,
        Comment,
        Create,
        CreateAttribute,
		CreateCSV,
        CreateGrid,
		CreateJSON,
        CreateSequence,
        DeleteRepositories,
		DownloadCSV,
        DownloadJSON,
		DownloadGeoJSON,
        Evaluate,
		FilterDuplicates,
        Flatten,
		Group,
        HTTPRequest,
        Inspect,
        Log,
        Map,
		OutputProvider,
        RegExpFilter,
        Repositories,
		Sample,
        Sleep,
		Sort,
		ThrowError,
    }

    static find(type: string) {
        return this.nodes[type]
    }

    static all() {
        return Object.values(this.nodes)
    }

    static make(type: string) {
        return new (this.find(type))
    }

    static hydrate(node: SerializedNodeModel, diagram = null) {
		const type = this.find(node.serverNodeType)

        return new type({
			...node,
			diagram
		})
    }
}