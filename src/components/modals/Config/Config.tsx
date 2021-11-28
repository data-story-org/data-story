import React, { useState, FC } from 'react';
import { observer } from 'mobx-react-lite';
/* import Cookie from '../../utils/Cookie';
 * import DiagramModel from '../../DiagramModel'; */
import { Store } from '../../../lib/store';
import { ConfigModalBody } from './ConfigBody';
import { ConfigModalActions } from './ConfigActions';
import { BaseModalHeader } from '../BaseModalHeader';
import { BaseVoidEventHandler } from '../../../lib/types';

interface Props {
  store: Store;
  closeModal: BaseVoidEventHandler;
}

export const ConfigModal: FC<Props> = observer(
  ({ store, closeModal }) => {
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
        <BaseModalHeader action="config" />
        <ConfigModalBody />
        <ConfigModalActions handleCancel={handleCancel} />
        v0.026
      </div>
    );
  },
);
