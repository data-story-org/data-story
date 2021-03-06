import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { demos } from '@data-story-org/core';
import { parse } from 'flatted';

import { Header } from '../Header';
import { Toolbar } from '../Toolbar';
import { pagesFactory } from '../../components/pages';
import { AppHotkeys } from './AppHotkeys';
import { EngineFactory } from '../../lib/diagram';
import { useStore } from '../../lib/store';
import { SerializedReactDiagram } from '../../lib/types';
import {
  Cookie,
  showNotification,
  withLoading,
  withLoadingProps,
} from '../../lib/utils';

export const App: FC<withLoadingProps> = withLoading(
  observer(({ setLoading }) => {
    const store = useStore();
    const [booted, setBooted] = useState(false);

    useEffect(() => {
      boot();
      registerExitConfirmation();
    }, []);

    const boot = () => {
      store.metadata.client
        .boot({
          story: window.location.href
            .split('/datastory')
            .pop()
            .replace('/', ''),
        })
        .then((response) => {
          store.setEngine(
            EngineFactory.loadOrCreate(
              response.data
                .serializedModel as SerializedReactDiagram,
            ),
          );

          store.addDemos(demos);

          store.setAvailableNodes(
            response.data.availableNodes,
          );

          store.setStories(
            Cookie.keys().map((storyName) => {
              return parse(localStorage.getItem(storyName));
            }),
          );

          setBooted(true);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          console.error('Boot error', error);
          showNotification({
            message: 'Could not Boot! Check console.',
            type: 'error',
          });
        });
    };

    const Page = useCallback(
      pagesFactory(store.metadata.page),
      [store.metadata.page],
    );

    return (
      <div id="data-story-gui" className="bg-gray-700">
        <Header store={store} />
        <Toolbar store={store} setLoading={setLoading} />
        {booted && <Page store={store} />}
        <ToastContainer
          style={{
            position: 'absolute',
            bottom: '2%',
            right: '2%',
            overflow: 'hidden',
            zIndex: 0,
            padding: '1em',
          }}
        />
        <AppHotkeys store={store} />
      </div>
    );
  }),
);

const registerExitConfirmation = () => {
  window.onbeforeunload = function (e) {
    return 'Do you want to exit this page?';
  };
};
