import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import NodeModel from '../../diagram/models/NodeModel';

interface Props {
  node: NodeModel;
}

const CommentNodeWidget: FC<Props> = ({ node }: Props) => {
  const [comment, setComment] = useState(
    node.parameters.find((p) => p.name == 'text'),
  );
  const [rows, setRows] = useState(2);
  const [minRows, _setMinRows] = useState(2);
  const [maxRows, _setMaxRows] = useState(24);

  const updateComment = (e) => {
    e.persist();

    const textareaLineHeight = 12;

    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(
      e.target.scrollHeight / textareaLineHeight
    );

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setComment(e.target.value);
    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return (
    <div
      className={
        'flex text-xxs text-gray-200 p-2 border border-gray-500 overflow-auto'
      }
    >
      <textarea
        onFocus={() => node.setLocked(true)}
        onBlur={() => node.setLocked(false)}
        rows={rows}
        className={
          'w-full bg-transparent focus:outline-none resize-x overflow-auto'
        }
        value={comment.value}
        onChange={updateComment}
      />
    </div>
  );
};

export default observer(CommentNodeWidget);
