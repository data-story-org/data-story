import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';

import WorkbenchControl from './controls/WorkbenchControl';
import OpenControl from './controls/OpenControl';
import SaveControl from './controls/SaveControl';
import RunControl from './controls/RunControl';
import LogControl from './controls/LogControl';
import ConfigControl from './controls/ConfigControl';
import AddNodeControl from './controls/AddNodeControl';
import TokensControl from './controls/TokensControl';
import { Store } from '../store';

interface Props {
  store: Store;
}

const Toolbar: FC<Props> = ({ store }) => {
  // this.state = {
  //   progressTick: 0,
  // }

  // It seems like progress doesn't implemented now
  /* const [progressTick, setProgressTick] = useState(0); */

  const renderInspectables = () => {
    return (
      store.diagram.engine && (
        <span className="border-l ml-8 pl-8">
          {store.nodesWithInspectables().map((node) => {
            return (
              <span
                dusk="inspect"
                key={
                  node.getDisplayName() + node.options.id
                }
                onClick={
                  (e) => onClickInspectable(node)
                  /* .bind(node) */
                }
                className={inspectableLinkStyle(node)}
              >
                {node.getDisplayName()}
              </span>
            );
          })}
        </span>
      )
    );
  };

  const onClickInspectable = (node) => {
    if (
      store.metadata.page == 'Inspector' &&
      store.metadata.activeInspector == node.options.id
    ) {
      return store.setPage('Workbench');
    }

    store.setPage('Inspector');
    store.setActiveInspector(node.options.id);
  };

  const inspectableLinkStyle = (node = null) => {
    let style =
      'mr-8 text-gray-200 hover:text-malibu-500 font-mono text-xs cursor-pointer ';

    if (
      node &&
      store.metadata.page == 'Inspector' &&
      store.metadata.activeInspector == node.options.id
    ) {
      style += 'text-malibu-500';
    }

    return style;
  };

  return (
    <div className="flex w-full bg-gray-600 border-t-2 border-gray-500 shadow shadow-xl">
      <div className="flex no-wrap items-center flex-1 w-full px-2 py-2">
        <WorkbenchControl store={store} />
        <ConfigControl store={store} />
        <OpenControl store={store} />
        <SaveControl store={store} />
        <RunControl store={store} />
        {/* <TokensControl  />
                    <LogControl  /> */}
        <AddNodeControl store={store} />
        {renderInspectables()}
      </div>
    </div>
  );
};

export default observer(Toolbar);
