import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import Cookie from '../../utils/Cookie';
import DiagramModel from '../../DiagramModel';
import { Store } from '../../store';

interface Props {
  store: Store;
  closeModal: () => void;
}

const OpenModal: FC<Props> = observer(({ store, closeModal }) => {
  // Never used
  /* const [storyName, setStoryName] = useState(''); */

  /* const handleChange = (e) => {
   *   setStoryName(e.target.value);
   * }; */

  const handleCancel = (_e) => {
    closeModal();
  };

  const handleClear = (_e) => {
    Cookie.clear();
    store.setStories(Cookie.keys());
  };

  /* const handleSave = (e) => {
   *   //
   * }; */

  const renderHeading = () => {
    return (
      <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-900 text-bold">
            <span className="text-indigo-500">Story</span>
            <span className="">::open()</span>
          </p>
        </div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <div>
        <div className="w-full bg-gray-100 px-6 py-2">
          <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
            <ul>
              {store.metadata.stories.map((story) => {
                return (
                  <li
                    className="my-1 hover:text-malibu-500 hover:underline cursor-pointer"
                    key={story}
                    onClick={() => {
                      clickStory(story);
                    }}
                  >
                    {story}
                  </li>
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
                onClick={handleClear}
                className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline"
              >
                Clear
              </button>
            </div>
            <div className="flex">
              <button
                onClick={handleCancel}
                className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const clickStory = (name) => {
    try {
      const engine = store.diagram.engine;
      const model = new DiagramModel();
      model.deserializeModel(
        Cookie.getObject(name),
        engine,
      );
      engine.setModel(model);
      closeModal();
    } catch (e) {
      alert(
        `Could not create engine for story ${name}. See console for details.`,
      );
      console.error(e);
    }
  };

    // Never used
    /* const showSuccessToast = () => {
     *   toast.info('Successfully saved story!', {
     *     position: 'bottom-right',
     *     transition: Slide,
     *     autoClose: 3500,
     *     hideProgressBar: true,
     *     closeOnClick: true,
     *     pauseOnHover: true,
     *     draggable: true,
     *   });
     * }; */

  return (
    <div>
      {renderHeading()}
      {renderBody()}
      {renderActions()}
    </div>
  );
});

export default OpenModal;
