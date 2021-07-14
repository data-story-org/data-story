import * as React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import { nonCircularJsonStringify } from '@data-story-org/core/src/utils/nonCircularJsonStringify';
import { toast, Slide } from 'react-toastify';
import Cookie from '../../utils/Cookie';
import EngineFactory from '../../EngineFactory';
import DiagramModel from '../../DiagramModel';
import String_ from '../fields/String_';

export default observer(
  class ConfigModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        storyName: '',
      };
    }

    handleChange(event) {
      this.setState({
        storyName: event.target.value,
      });
    }

    handleCancel(event) {
      this.props.closeModal();
    }

    handleClear(event) {
      Cookie.clear();
      this.props.store.setStories(Cookie.keys());
    }

    handleSave(event) {
      //
    }

    render() {
      return (
        <div>
          {this.renderHeading()}
          {this.renderBody()}
          {this.renderActions()}
        </div>
      );
    }

    renderHeading() {
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
    }

    renderBody() {
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
                        window.location =
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
    }

    renderActions() {
      return (
        <div>
          <div className="w-full bg-gray-100 mt-6 px-6 py-2 border-t border-gray-300">
            <div className="flex justify-end my-4 justify-end align-bottom text-gray-500 text-xs font-mono">
              <div className="flex">
                <button
                  onClick={this.handleCancel.bind(this)}
                  className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    clickStory(name) {
      try {
        let engine = this.props.store.diagram.engine;
        let model = new DiagramModel();
        model.deserializeModel(
          Cookie.getObject(name),
          engine,
        );
        engine.setModel(model);
        this.props.closeModal();
      } catch (e) {
        alert(
          `Could not create engine for story ${name}. See console for details.`,
        );
        console.error(e);
      }
    }

    showSuccessToast() {
      toast.info('Successfully saved story!', {
        position: 'bottom-right',
        transition: Slide,
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  },
);
