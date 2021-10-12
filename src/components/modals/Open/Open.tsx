import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Cookie } from '../../../lib/utils';
import { Store } from '../../../lib/store';
import { OpenModalBody } from './OpenBody';
import { OpenModalActions } from './OpenActions';
import { BaseModalHeader } from '../BaseModalHeader';
import { BaseVoidEventHandler } from '../../../lib/types';

interface Props {
  store: Store;
  closeModal: BaseVoidEventHandler;
}

export const OpenModal: FC<Props> = observer(
  ({ store, closeModal }) => {
    const handleCancel = (_e) => {
      closeModal();
    };

    const handleClear = (_e) => {
      Cookie.clear();
      store.setStories(Cookie.keys());
    };

    const afterStoryClick = () => {
      closeModal();
    };

    return (
      <div>
        <BaseModalHeader action="open" />
        <OpenModalBody
          store={store}
          afterStoryClick={afterStoryClick}
        />
        <OpenModalActions
          handleClear={handleClear}
          handleCancel={handleCancel}
        />
      </div>
    );
  },
);
