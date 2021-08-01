import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Store } from '../../store';
import { nonCircularJsonStringify } from '@data-story-org/core';
import { CodeHighlighter } from '../../utils/CodeHighlighter';

interface Props {
  store: Store;
}

const DiagramJson: FC<Props> = ({ store }) => {
  return (
    <div className="h-85vh">
      <div className="p-4 w-full h-full ">
        <CodeHighlighter
          code={store.diagram.engine.model.toPrettyJson()}
        />
      </div>
    </div>
  );
};

export default observer(DiagramJson);