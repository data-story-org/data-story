import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import {
  RunControl,
  SaveControl,
  OpenControl,
  AddNodeControl,
  ConfigControl,
  DiagramJsonControl,
  WorkbenchControl,
  LogControl,
  TokensControl,
} from '../../components/controls';
import { withLoadingProps } from '../../lib/utils/';
import { Store } from '../../lib/store';

import { ToolbarInspectables } from './ToolbarInspectables';

interface Props extends withLoadingProps {
  store: Store;
}

export const Toolbar: FC<Props> = observer(
  ({ store, setLoading }) => {
    // this.state = {
    //   progressTick: 0,
    // }

    // It seems like progress doesn't implemented now
    /* const [progressTick, setProgressTick] = useState(0); */

    const onClickInspectable = (node) => {
      if (
        store.metadata.page == 'Inspector' &&
        store.metadata.activeInspector.nodeId ==
          node.options.id
      ) {
        return store.setPage('Workbench');
      }

      store.setPage('Inspector');
      store.setActiveInspector(node.options.id);
    };

    const inspectableLinkStyle = (node = null) => {
      const style =
        'mr-8 text-gray-200 hover:text-malibu-500 text-sm cursor-pointer font-semibold';

      return node &&
        store.metadata.page == 'Inspector' &&
        store.metadata.activeInspector.nodeId ==
          node.options.id
        ? style + ' text-malibu-500'
        : style + ' font-semibold';
    };

    return (
      <div className="flex w-full bg-gray-600 border-t-2 border-gray-500 shadow shadow-xl">
        <div className="flex no-wrap items-center flex-1 w-full px-2 py-2">
          <WorkbenchControl store={store} />
          <DiagramJsonControl store={store} />
          <ConfigControl store={store} />
          <OpenControl store={store} />
          <SaveControl store={store} />
          <RunControl
            store={store}
            setLoading={setLoading}
          />
          {/* <TokensControl  />
                    <LogControl  /> */}
          <AddNodeControl store={store} />

          <ToolbarInspectables
            store={store}
            onClickInspectable={onClickInspectable}
            inspectableLinkStyle={inspectableLinkStyle}
          />
        </div>
      </div>
    );
  },
);
