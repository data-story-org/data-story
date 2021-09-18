import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Cookie from '../../../utils/Cookie';
import { DiagramModel } from '../../../diagram/models';
import { Store } from '../../../store';
import HelpModalBody from './HelpBody';
import HelpModalActions from './HelpActions';
import BaseModalHeader from '../BaseModalHeader';

interface Props {
  store: Store;
  closeModal: () => void;
}

const HelpModal: FC<Props> = ({ store, closeModal }) => {
  const handleCancel = (_e) => {
    closeModal();
  };

  const clickDemo = (name) => {
    try {
      const engine = store.diagram.engine;
      const model = new DiagramModel();
			engine.setModel(model);
			store.importHeadless(name)
      closeModal();
    } catch (e) {
      alert(
        `Could not create engine for demo ${name}. See console for details.`,
      );
      console.error(e);
    }
  };

  return (
    <div>
      <BaseModalHeader action="help" />
      <HelpModalBody
        store={store}
        clickDemo={clickDemo}
      />
      <HelpModalActions
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default observer(HelpModal);
