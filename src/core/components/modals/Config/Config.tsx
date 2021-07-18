import React, { useState, FC } from 'react';
import { observer } from 'mobx-react';
/* import Cookie from '../../utils/Cookie';
 * import DiagramModel from '../../DiagramModel'; */
import { Store } from '../../../store';
import ConfigModalHeader from './ConfigHeader';
import ConfigModalBody from './ConfigBody';
import ConfigModalActions from './ConfigActions';

interface Props {
  store: Store;
  closeModal: () => void;
}

const ConfigModal: FC<Props> = ({ _store, closeModal }) => {
  // not used anywhere
  /* const [storyName, setStoryName] = useState(''); */

  // Implemented but not used anywhere
  /* const handleChange = (e) => {
   *   setStoryName(e.target.value);
   * }; */

  // Implemented but not used anywhere
  /* const handleClear = (e) => {
   *   Cookie.clear();
   *   store.setStories(Cookie.keys());
   * }; */

  const handleCancel = (_e) => {
    closeModal();
  };

  // Not implemented
  // handleSave(e) {
  //   //
  // }

  return (
    <div>
      <ConfigModalHeader />
      <ConfigModalBody />
      <ConfigModalActions handleCancel={handleCancel} />
    </div>
  );
};

export default observer(ConfigModal);
