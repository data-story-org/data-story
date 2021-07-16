import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { Store } from '../../store/main';

interface Props {
  store: Store;
  defaultStory: string;
  closeModal: () => void;
}

const SaveModal: FC<Props> = observer(
  ({ store, defaultStory, closeModal }) => {
    const [storyName, setStoryName] =
      useState(defaultStory);

    const handleChange = (e) => {
      setStoryName(e.target.value);
    };

    const handleCancel = (_e) => {
      closeModal();
    };

    const handleSave = (_e) => {
      store.clearLinkLabels();

      store.metadata.client
        .save(storyName, store.diagram.engine.model)
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          alert('Save error');
        });
    };

    const renderHeading = () => {
      return (
        <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-900 text-bold">
              <span className="text-indigo-500">Story</span>
              <span className="">::save()</span>
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
              <span className="my-2">Name</span>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                className="px-2 py-1 rounded"
                placeholder="descriptive-name.story"
              />
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
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="m-4 px-4 py-2 hover:text-malibu-700 border border-gray-500 hover:bg-gray-200 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    /* storyName = storyName ? storyName : defaultStory; */
    setStoryName(storyName ? storyName : defaultStory);

    return (
      <div>
        {renderHeading()}
        {renderBody()}
        {renderActions()}
      </div>
    );
  },
);

export default SaveModal;
