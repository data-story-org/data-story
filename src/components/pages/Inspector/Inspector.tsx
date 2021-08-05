import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import InspectorTable from './InspectorTable';
import { Store } from '../../../store';
import {
  InspectorMode,
  INSPECTOR_MODES,
} from '../../../types';

interface Props {
  store: Store;
}

const inspectorComponentsMap = new Map<
  InspectorMode,
  typeof InspectorTable
>([
  ['Table', InspectorTable],
  ['JSON', InspectorTable],
]);

const Inspector: FC<Props> = ({ store }) => {
  const id = store.metadata.activeInspector.nodeId;
  const mode = store.metadata.activeInspector.mode;
  const features = id
    ? store.diagram.engine.model.getNode(id).features
    : [];

  const InspectorComponent =
    inspectorComponentsMap.get(mode);

  const handleModeSelect =
    (mode: InspectorMode) => (_e) => {
      store.setActiveInspectorMode(mode);
    };

  const selectedModeStyle = (currMode: InspectorMode) => {
    const style =
      'mr-8 text-gray-200 hover:text-malibu-500 text-sm cursor-pointer font-semibold';

    return currMode &&
      store.metadata.activeInspector.mode === currMode
      ? style + 'text-malibu-500'
      : style;
  };

  return (
    <>
      <div className="flex w-full bg-gray-600 border-t-2 border-b-2 border-gray-500 shadow shadow-xl">
        {INSPECTOR_MODES.map((mode) => {
          return (
            <span
              onClick={handleModeSelect(mode)}
              className={selectedModeStyle(mode)}
            >
              {mode}
            </span>
          );
        })}
      </div>
      <div className="p-4">
        <InspectorComponent features={features} />
      </div>
    </>
  );
};

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
