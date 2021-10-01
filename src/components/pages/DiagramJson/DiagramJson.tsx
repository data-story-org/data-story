import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../../store';
import { CodeHighlighter } from '../../../utils/CodeHighlighter';

interface Props {
  store: Store;
}

export const DiagramJson: FC<Props> = observer(
  ({ store }) => {
    return (
      <div className="p-4 w-full h-full ">
        <CodeHighlighter
          code={store.getModel().toPrettyJson()}
        />
      </div>
    );
  },
);
