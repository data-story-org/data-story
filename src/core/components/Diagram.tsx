import React, { FC, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from 'mobx-react';
import { useStore } from '../store/StoreProvider';

const style = 'fullsize bg-gray-600';

const Diagram: FC = observer(() => {
  // this.diagramRef = React.createRef();
  const diagramRef = useRef(null);
  const store = useStore();

  const timer = setTimeout(() => {
    ReactDOM.findDOMNode(diagramRef.current).focus();
  }, 500);
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
      ReactDOM.findDOMNode(diagramRef.current).focus();
    }, 500);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <CanvasWidget
        ref={diagramRef}
        engine={store.diagram.engine}
        refresh={store.diagram.refresh}
        allowLooseLinks={false}
        className={style}
      />
    </div>
  );
});

export default Diagram;
