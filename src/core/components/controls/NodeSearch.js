import React from 'react';
import { observer } from "mobx-react"
var Mousetrap = require('mousetrap');
import _ from 'lodash';

export default observer(class NodeSearch extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    render() {
        return (
        <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
            <input
                autoComplete="off"
                id="node-search"
                value={this.state.search}
                onChange={this.searchChange.bind(this)}
                ref={(input) => { this.nameInput = input; }}
                className="w-full p-4 rounded mb-4"
                placeholder="model | method | reader | writer ..."
                tabIndex={1}
            />
            <ul className="divide-y divide-gray-300">
                {this.filteredNodes().map(node => {
                    return this.renderNode(node)
                })}
            </ul>
      </div>
      )
    }

    renderNode(node) {
        const elementDataProperties = {
            'id': node.name,
            'data-node-model-variation-name': node.name,
        }

        // HOW TO ONLY ALLOW CLICK EVENT FROM PARENT?
        // REPEAT THE EVENTDATA FOR ALL CHILDREN FOR NOW
        return (
            <li 
                key={node.category + node.name}
                onDoubleClick={this.handleSelect.bind(this)}

                {...elementDataProperties}

                className="py-3 flex"
                tabIndex={2}
            >
                <div className="ml-3"> 
                    <div 
                        className="flex text-sm mb-2 font-medium text-gray-900 text-bold"
                        {...elementDataProperties}
                    >
                        <div {...elementDataProperties} className="text-indigo-500">{node.category}</div>
                        <div {...elementDataProperties} className="">::{node.name}</div>
                        
                    </div>
                    <div  
                        className="text-xs text-gray-500"
                        {...elementDataProperties}
                    >
                        <span 
                            className="ml-2"
                            {...elementDataProperties}
                        >{node.summary}</span>
                    </div>
                </div>
            </li>             
        )
    }

    searchChange(event) {
        this.setState({
            search: event.target.value
        })       
    }

    filteredNodes() {
        return this.props.store.diagram.availableNodes.filter((node) => {
            let content = node.category + node.name + node.summary

            return content.toLowerCase().includes(
                this.state.search.toLowerCase()
            )
        })
    }

    componentDidMount(){
        this.nameInput.focus();

        Mousetrap.bind(
            'enter',
            this.handleSelect.bind(this)
        );

        // Mousetrap.bind(Array.from('abcdefghijklmnopqrstuvwxyz'),
        //     (key) => {
		// 		console.log(key)
		// 		// this.setState({
		// 		// 	search: event.target.value
		// 		// })   

		// 	}
        // ); 		
    }

    componentWillUnmount(){
        Mousetrap.unbind('enter')
    }

    
    handleSelect(event) {
        event.preventDefault()

        let name = event.target.getAttribute('data-node-model-variation-name')
        let nodeData = this.props.store.diagram.availableNodes.find(node => node.name == name)
        this.props.store.addNode(
            // Ensure the parameters will not be shared between two nodes of same type
            _.cloneDeep(nodeData)
        )

        this.props.onFinish()
    }
})