import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Store } from '../../store';
import { nonCircularJsonStringify } from '@data-story-org/core';

interface Props {
  store: Store;
}

const DiagramJson: FC<Props> = ({store}) => {
  return (
    <div className="h-85vh">
      <div className="p-4 h-full">
				<textarea
					className="p-8 w-full h-full font-mono bg-gray-300 text-xs"
					defaultValue={nonCircularJsonStringify(store.diagram.engine.model.serialize(), null, 4)}
					disabled
				/>
			</div>
    </div>
  );
}

export default observer(DiagramJson);