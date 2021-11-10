import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { InspectorTable } from './InspectorTable';
import { InspectorJSON } from './InspectorJSON';
import { InspectorCanvas } from './InspectorCanvas';
import { Store } from '../../../lib/store';
import {
  InspectorMode,
  INSPECTOR_MODES,
} from '../../../lib/types';
import { NodeModel } from '../../../lib/diagram';

interface Props {
  store: Store;
}

type InspectorModeComponent =
  | typeof InspectorTable
  | typeof InspectorJSON
	| typeof InspectorCanvas;

const inspectorComponentsMap = new Map<
  InspectorMode,
  InspectorModeComponent
>([
  ['Table', InspectorTable],
  ['JSON', InspectorJSON],
	['Canvas', InspectorCanvas],
]);

export const Inspector: FC<Props> = observer(
  ({ store }) => {
    const id = store.metadata.activeInspector.nodeId;
    const mode = store.metadata.activeInspector.mode;
    const features = id
      ? (
          store.diagram.engine
            .getModel()
            .getNode(`${id}`) as NodeModel
        ).features
      : [];

    const InspectorComponent = useCallback(
      inspectorComponentsMap.get(mode),
      [mode],
    );

    const handleModeSelect =
      (mode: InspectorMode) => (_e) => {
        store.setActiveInspectorMode(mode);
      };

    const modeStyle = (mode: InspectorMode) => {
      const style =
        'mr-8 text-gray-200 hover:text-malibu-500 text-lg cursor-pointer';

      const activeMode =
        store.metadata.activeInspector.mode;

      return activeMode && activeMode == mode
        ? style + ' text-malibu-500'
        : style + ' font-semibold';
    };

    return (
      <>
        <div className="flex justify-center ml-auto shadow shadow-xl p-4">
          {INSPECTOR_MODES.map((mode) => {
            return (
              <span
                key={mode}
                onClick={handleModeSelect(mode)}
                className={modeStyle(mode)}
              >
                {mode}
              </span>
            );
          })}
        </div>
        <div className="p-4">
          <InspectorComponent
            features={features}
            handleModeSelect={handleModeSelect}
          />
        </div>
      </>
    );
  },
);

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
