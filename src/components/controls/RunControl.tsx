import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';

import { BaseControl } from './BaseControl';
import { withLoadingProps } from '../../lib/utils';
import { Store } from '../../store';
import { RunResult } from '../../clients/ClientInterface';

interface Props extends withLoadingProps {
  store: Store;
}

export const RunControl: FC<Props> = observer(
  ({ store, setLoading }) => {
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
        .run(store.getModel())
        .then((result: RunResult) => {
          const diagram = store.getModel();
          const serverDiagram = result.diagram;
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
  },
);
