import * as React from 'react';
import { observer } from "mobx-react"

export default observer(class CommentNodeWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.node.parameters.find(p => p.name == 'text'),
			rows: 2,
			minRows: 2,
			maxRows: 24,			
        }
    }

	render() {
		return (
            <div className={"flex font-mono text-xxs text-gray-200 p-2 border border-gray-500 overflow-auto"}>
                <textarea
					onFocus={() => this.props.node.setLocked(true)}
					onBlur={() => this.props.node.setLocked(false)}				
					rows={this.state.rows}
					className={"w-full bg-transparent resize-x overflow-auto"}
					value={this.state.comment.value}
					onChange={this.updateComment.bind(this)}
				/>
            </div>
		);
    }

	updateComment(event) {

		let comment = this.state.comment
		comment.value = event.target.value

		const textareaLineHeight = 12;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
			event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
		
		if (currentRows === previousRows) {
			event.target.rows = currentRows;
		}
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
		
		this.setState({
			comment,
			rows: currentRows < maxRows ? currentRows : maxRows,
		});
	}
})

