import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import BaseControl from './BaseControl';
import { toast, Slide } from 'react-toastify';
import Mousetrap from 'mousetrap';

const RunControl= observer(({store}) => {
  const [id, title, icon] = [
    'run',
    'Run story',
    'fas fa-play',
  ];

  useEffect(() => {
    Mousetrap.bind(
      '?', // shift+plus
      (e) => {
        e.preventDefault();
        onClick();
      },
    );

    Mousetrap.bind('shift+r', (_e) => {
      onClick();
    });
  }, []);

  const onClick = () => {
    store.setRunning();

    store.metadata.client
      .run(store.diagram.engine.model)
      .then((response) => {
        // TRANSFER FEATURE AT NODES (INSPECTABLES)
        console.info('Diagram ran', response.data.diagram);

        response.data.diagram.nodes
          .filter((phpNode) => {
            return phpNode.features;
          })
          .forEach((phpNode) => {
            let reactNode =
              store.diagram.engine.model.getNode(
                phpNode.id,
              );
            reactNode.features = phpNode.features;
          });

        // SET FEATURE COUNT ON LINKS
        store.clearLinkLabels(); // Clear old labels
        response.data.diagram.nodes
          .map((node) => {
            return node.ports;
          })
          .flat()
          .filter((port) => {
            return port.features;
          })
          .forEach((port) => {
            let allLinks = Object.values(
              store.diagram.engine.model.layers[0].models,
            );

            allLinks
              .filter((link) => {
                return (
                  link.sourcePort.options.id == port.id
                );
              })
              .forEach((link) => {
                store.diagram.engine.model
                  .getLink(link.options.id)
                  .addLabel(port.features.length);
              });
          });
        showSuccessToast();

        store.setNotRunning();
        store.refreshDiagram();
      })
      .catch((error) => {
        store.setNotRunning();
        showFailureToast();

        throw error;
      });
  };

  return (
    <BaseControl
      id={id}
      title={title}
      icon={icon}
      onClick={onClick}
    />
  );
});

// TODO Separate creating of the notifications into reusable component
const showFailureToast = () => {
  toast.info('Crap! Could not run story! Check console.', {
    position: 'bottom-right',
    transition: Slide,
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const showSuccessToast = () => {
  toast.info('Successfully ran story!', {
    position: 'bottom-right',
    transition: Slide,
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default RunControl;
