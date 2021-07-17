import React, { FC } from 'react';
import { observer } from 'mobx-react';
import InspectorTable from '../InspectorTable';
import { useStore } from '../../store/StoreProvider';

const Inspector: FC = () => {
  const store = useStore();

  const id = store.metadata.activeInspector;
  const features = id
    ? store.diagram.engine.model.getNode(id).features
    : [];

  return (
    <div className="p-4">
      <InspectorTable features={features} />
    </div>
  );
}

export default observer(Inspector);

/*

# Possible new approach
* Make a mockup to see if it is layoutable in a beautiful way
* Make a window section for results
* Allow the user to select a renderer
* Make an interface RendererInterface
* Adapt InspectorTable to make it conform to interface
* Make a CanvasRenderer
* Make a MapRenderer
* Consider having it placed to the right of the diagram
* When running the workspace it should animate
* Implement pagination for +100 features
* Make the components into TS
* Unit test the components
* Consider an intermediate layer between the feature collection and the react renderer. This would make it easy to use TS and also to test it

 ┌──────────────────────────────────────────────────────────────────┐
 │    DIAGRAM                                                       │
 │                                                                  │
 │   ┌────┐                ┌───────┐                                │
 │   └────┘                │       │                                │
 │            ┌──────┐     │       │                                │
 │            └──────┘     │       │                                │
 │                         │       │                                │
 │                         └───────┘                                │
 │                                                                  │
 ├─────────────┬─────────────┬───────────────────────────┬──────────┤
 │ Inspector 1 │ Inspector 2 │                           │ Renderer │
 ├─────────────┴─────────────┴───────────────────────────┴──────────┤
 │                                                                  │
 │    TABLE | CANVAS | MAP ...                                      │
 │                                                                  │
 │                                                                  │
 │                                                                  │
 │                                                                  │
 │                                                                  │  
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘

*/
