import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Cookie from '../../../utils/Cookie';
import { DiagramModel } from '../../../diagram/models';
import { Store } from '../../../store';
import OpenModalBody from './OpenBody';
import OpenModalActions from './OpenActions';
import BaseModalHeader from '../BaseModalHeader';
import { loadStory } from '../../../utils';

interface Props {
  store: Store;
  closeModal: () => void;
}

const OpenModal: FC<Props> = ({ store, closeModal }) => {
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

  const clickStory = (name) => {
    loadStory(store, name);

    closeModal();
  };

  return (
    <div>
      <BaseModalHeader action="open" />
      <OpenModalBody
        store={store}
        clickStory={clickStory}
      />
      <OpenModalActions
        handleClear={handleClear}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default observer(OpenModal);
