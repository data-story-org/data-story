import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';

import BaseControl from './BaseControl';
import { withLoadingProps } from '../../utils/isLoadingHOC';
import { Store } from '../../store';

interface Props extends withLoadingProps {
  store: Store;
}

const RunControl: FC<Props> = ({ store, setLoading }) => {
  useHotkeys('shift+r', () => {
    onClick();
  });

  const [id, title, icon] = [
    'run',
    'Run story',
    'fas fa-play',
  ];

  const onClick = () => {
    setLoading(true);
    store.clearResults();
    store.setRunning();

    store.metadata.client
      .run(store.diagram.engine.model)
      .then((result) => {
        const diagram = store.diagram.engine.model;
        const serverDiagram = result.data.diagram;
        diagram.syncFeatures(serverDiagram);
        store.setNotRunning();
        setLoading(false);
        store.showRunSuccessful();
        store.refreshDiagram();
      })
      .catch((error) => {
        store.setNotRunning();
        store.showRunFail(error);
        setLoading(false);
        throw error;
      });
  };

  return (
    <BaseControl
      id={id}
      title={title}
      icon={icon}
      onClick={onClick}
    />
  );
};

export default observer(RunControl);
