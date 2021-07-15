import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import NodeModel from '../NodeModel';

interface Props {
  node: NodeModel;
}

const CommentNodeWidget: FC<Props> = observer(
  ({ node }: Props) => {
    const [comment, setComment] = useState(
      node.parameters.find((p) => p.name == 'text'),
    );
    const [rows, setRows] = useState(2);
    const [minRows, _setMinRows] = useState(2);
    const [maxRows, _setMaxRows] = useState(24);

    const updateComment = (event) => {
      const updatedComment = comment;
      updatedComment.value = event.target.value;

      const textareaLineHeight = 12;

      const previousRows = event.target.rows;
      event.target.rows = minRows; // reset number of rows in textarea

      const currentRows = ~~(
        event.target.scrollHeight / textareaLineHeight
      );

      if (currentRows === previousRows) {
        event.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        event.target.rows = maxRows;
        event.target.scrollTop = event.target.scrollHeight;
      }

      setComment(updatedComment);
      setRows(
        currentRows < maxRows ? currentRows : maxRows,
      );
    };

    return (
      <div
        className={
          'flex font-mono text-xxs text-gray-200 p-2 border border-gray-500 overflow-auto'
        }
      >
        <textarea
          onFocus={() => node.setLocked(true)}
          onBlur={() => node.setLocked(false)}
          rows={rows}
          className={
            'w-full bg-transparent resize-x overflow-auto'
          }
          value={comment.value}
          onChange={updateComment}
        />
      </div>
    );
  },
);

export default CommentNodeWidget;
