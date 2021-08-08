import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import pages from './pages/factory';
import { observer } from 'mobx-react-lite';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EngineFactory from '../diagram/factories/EngineFactory';
import Cookie from '../utils/Cookie';
import { useStore } from '../store/StoreProvider';
import { Store } from '../store';
import { showNotification } from '../utils/Notifications';
import { useHotkeys } from 'react-hotkeys-hook';
import NodeModel from '../diagram/models/NodeModel';
import {
  withLoading,
  withLoadingProps,
} from '../utils/isLoadingHOC';

const App: FC<withLoadingProps> = ({ setLoading }) => {
  const store = useStore();
  const [booted, setBooted] = useState(false);

  useHotkeys('shift+d', () => {
    store.setPage('Workbench');
  });

  useHotkeys('shift+t', () => {
    store.setPage('Inspector');
  });

  useHotkeys('shift+j', () => {
    store.setPage('DiagramJson');
  });

  useHotkeys('shift+l', () => {
    store.setPage('Log');
  });

  useHotkeys(
    'enter',
    () => {
      const selection =
        store.diagram.engine.model.getSelectedEntities();

      // Must be an unambiguous selection of a single NodeModel entity
      if (
        selection.length === 1 &&
        selection[0] instanceof NodeModel
      ) {
        const node = selection[0];
        store.openNodeModal(node.id);
      }
    },
    {
      filter: () =>
        store.diagram.engine.model.options.locked === false,
    },
  );

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

        bootDemos(store);

        store.setAvailableNodes(
          response.data.availableNodes,
        );
        store.setStories(Cookie.keys());

        setBooted(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
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
      <Header />
      <Toolbar store={store} />
      {booted && <Page store={store} />}
      <ToastContainer style={{ paddingTop: '0px' }} />
    </div>
  );
};

const bootDemos = (store: Store) => {
  // for (const name of Object.keys(demos)) {
  //   //store.metadata.client.save(name, demos[name])
  // }
  // // store.metadata.client.save('With parameters', demos.WithParameters)
  // // store.metadata.client.save('Working with json', demos.WorkingWithJSON)
  // // store.metadata.client.save('Scraping a map service', demos.ScrapingAMapService)
  // // store.metadata.client.save('Cleanup old github repos', demos.CleanupOldGithubRepos)
};

const registerExitConfirmation = () => {
  window.onbeforeunload = function (e) {
    return 'Do you want to exit this page?';
  };
};

export default withLoading(observer(App));
