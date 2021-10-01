import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../../lib/store';
import { CodeHighlighter } from '../../../lib/utils';

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
