import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BaseControl from './BaseControl';
import { useHotkeys } from 'react-hotkeys-hook';

const RunControl = ({ store }) => {
  useHotkeys('shift+r', () => {
    onClick();
  });

  const [id, title, icon] = [
    'run',
    'Run story',
    'fas fa-play',
  ];

  const onClick = () => {
    store.clearResults();
		store.setRunning();

    store.metadata.client
      .run(store.diagram.engine.model)
      .then((result) => {
				const diagram = store.diagram.engine.model
				const serverDiagram = result.data.diagram
				diagram.syncFeatures(serverDiagram);
				store.setNotRunning();
				store.showRunSuccessful();
        store.refreshDiagram();
			})
      .catch((error) => {
        store.setNotRunning();
        store.showRunFail(error);
				throw error
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
