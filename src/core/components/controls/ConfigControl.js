import React from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import Modal from 'react-modal';
import modalStyle from '../../../core/utils/modalStyle';
import ConfigModal from '../modals/ConfigModal';
import store from '../../store/main';

export default observer(
  class ConfigControl extends BaseControl {
    constructor(props) {
      super(props);
      this.title = 'Configuration';
      this.icon = 'fas fa-cog';
      this.state = {
        isOpen: false,
      };
    }

    onClick() {
      this.setState({
        isOpen: true,
      });
    }

    render() {
      return (
        <span>
          {super.render()}
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal.bind(this)}
            style={modalStyle}
          >
            <ConfigModal
              store={store}
              closeModal={this.closeModal.bind(this)}
            />
          </Modal>
        </span>
      );
    }

    closeModal() {
      //this.props.store.diagram.engine.model.setLocked(false);

      this.setState({
        isOpen: false,
      });
    }
  },
);
