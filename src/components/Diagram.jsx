import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from 'mobx-react-lite';

const style = 'fullsize bg-gray-600';

const Diagram = ({ store }) => {
  const diagramRef = useRef();

  return (
    <div id="app-diagram">
      <CanvasWidget
        ref={diagramRef}
        engine={store.diagram.engine}
        refresh={store.diagram.refresh}
        allowLooseLinks={false}
        className={style}
      />
    </div>
  );
};

export default observer(Diagram);
