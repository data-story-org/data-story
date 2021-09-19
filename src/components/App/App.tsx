import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Header from '../Header';
import Toolbar from '../Toolbar';
import pages from '../pages/factory';
import { observer } from 'mobx-react-lite';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EngineFactory } from '../../diagram/factories';
import Cookie from '../../utils/Cookie';
import { useStore } from '../../store/StoreProvider';
import { Store } from '../../store';
import { showNotification } from '../../utils/Notifications';
import {
  withLoading,
  withLoadingProps,
} from '../../utils/isLoadingHOC';
import AppHotkeys from './AppHotkeys';
import { Demo, demos } from '@data-story-org/core'

const App: FC<withLoadingProps> = ({ setLoading }) => {
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
            response.data.serializedModel ?? null,
          ),
        );

        store.addDemos(demos)

        store.setAvailableNodes(
          response.data.availableNodes,
        );
        store.setStories(Cookie.keys());

        setBooted(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error('Boot error', error);
        showNotification({
          message: 'Could not Boot! Check console.',
          type: 'success',
        });
      });
  };

  const Page = useCallback(pages(store.metadata.page), [
    store.metadata.page,
  ]);

  return (
    <div>
      <Header store={store} />
      <Toolbar store={store} setLoading={setLoading} />
      {booted && <Page store={store} />}
      <ToastContainer style={{ paddingTop: '0px' }} />
      <AppHotkeys store={store} />
    </div>
  );
};

const registerExitConfirmation = () => {
  window.onbeforeunload = function (e) {
    return 'Do you want to exit this page?';
  };
};

export default withLoading(observer(App));
