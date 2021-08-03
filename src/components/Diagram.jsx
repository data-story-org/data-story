import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from 'mobx-react-lite';

const style = 'fullsize bg-gray-600';

const Diagram = ({ store }) => {
  // this.diagramRef = React.createRef();
  const diagramRef = useRef();
  const diagramaFocus = useCallback(() =>{
    ReactDOM.findDOMNode(diagramRef.current).focus();
  })

  /* componentDidMount() {
     *   // FOCUS THE WORKBENCH!!! HOW?

     *   window.focus();

     *   //window.onfocus = function() { blurred && (location.reload()); };

     *   setTimeout(() => {
     *     ReactDOM.findDOMNode(
     *       this.diagramRef.current,
     *     ).focus();
     *   }, 500);
     * } */
  useEffect(() => {
    window.focus();
    const timer = setTimeout(() => {
      diagramaFocus()
    }, 500);
    return () => clearTimeout(timer);
  }, [diagramaFocus]);

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
