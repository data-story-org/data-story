import React, { useState, FC } from 'react';
import { observer } from 'mobx-react';
/* import Cookie from '../../utils/Cookie';
 * import DiagramModel from '../../DiagramModel'; */
import { Store } from '../../store/main';

interface Props {
  store: Store;
  closeModal: () => void;
}

const ConfigModal: FC<Props> = observer(
  ({ store, closeModal }) => {
    // not used anywhere
    /* const [storyName, setStoryName] = useState(''); */

    // Implemented but not used anywhere
    /* const handleChange = (e) => {
     *   setStoryName(e.target.value);
     * }; */

    const handleCancel = (_e) => {
      closeModal();
    };

    // Implemented but not used anywhere
    /* const handleClear = (e) => {
     *   Cookie.clear();
     *   store.setStories(Cookie.keys());
     * }; */

    // Not implemented
    // handleSave(e) {
    //   //
    // }

    const renderHeading = () => {
      return (
        <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-900 text-bold">
              <span className="text-indigo-500">
                DataStory
              </span>
              <span className="">::config()</span>
            </p>
          </div>
        </div>
      );
    };

    const renderBody = () => {
      const servers = [
        '/data-story/api',
        'http://localhost:3000',
        'https://data-story-server.herokuapp.com',
      ];

      return (
        <div>
          <div className="w-full bg-gray-100 px-6 py-2">
            <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
              {/* <String_
							key={'server'}
							handleChange={() => {}}
							options={{
								name: 'Server URL',
								description: 'leave blank for local server',
							}}
						/> */}
              <div className="mb-2">
                Reboot to connect to a API server
              </div>
              <ul className="text-indigo-500">
                {servers.map((server) => {
                  return (
                    <div
                      className="cursor-pointer hover:text-indigo-600"
                      href={server}
                      key={server}
                      onClick={() => {
                        window.location.href =
                          window.location.hostname +
                          '?client=APIClient&server=' +
                          server;
                      }}
                    >
                      <li>{server}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    };

    const renderActions = () => {
      return (
        <div>
          <div className="w-full bg-gray-100 mt-6 px-6 py-2 border-t border-gray-300">
            <div className="flex justify-end my-4 justify-end align-bottom text-gray-500 text-xs font-mono">
              <div className="flex">
                <button
                  onClick={handleCancel}
                  className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Not used anywhere
    /* const clickStory = (name) => {
     *   try {
     *     const engine = store.diagram.engine;
     *     const model = new DiagramModel();
     *     model.deserializeModel(
     *       Cookie.getObject(name),
     *       engine,
     *     );
     *     engine.setModel(model);
     *     closeModal();
     *   } catch (e) {
     *     alert(
     *       `Could not create engine for story ${name}. See console for details.`,
     *     );
     *     console.error(e);
     *   }
     * }; */

    return (
      <div>
        {renderHeading()}
        {renderBody()}
        {renderActions()}
      </div>
    );
  },
);

export default ConfigModal;
