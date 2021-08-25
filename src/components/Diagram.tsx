import React, { FC, useRef } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from 'mobx-react-lite';
import { Store } from '../store';
const style = 'fullsize bg-gray-600';

interface Props {
  store: Store;
}

const Diagram: FC<Props> = ({ store }) => {
  const diagramRef = useRef();
  store.diagram.refresh;

  return (
    <div id="app-diagram">
      <CanvasWidget
        ref={diagramRef}
        engine={store.diagram.engine}
        className={style}
      />
    </div>
  );
};

export default observer(Diagram);