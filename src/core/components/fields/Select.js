import React from 'react';

export default class Select extends React.Component {
    render() {
        return (
            <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
                <span className="my-2">
					<div className="">
						<span>{this.props.options.name}</span>
						{this.props.options.description ? ' (' + this.props.options.description + ')' : ''}
					</div>					
				</span>
				<select
                    onChange={e => {this.props.handleChange(e, this.props.options)}}
                    className="px-2 py-1 rounded"
                    value={this.props.options.value}				
				>
					{this.props.options.options.map(o => {
						return (<option value={o} key={o}>{o}</option>)
					})}
				</select>
            </div>
        );
    }
}