import { useHotkeys } from 'react-hotkeys-hook';
import NodeModel from '../diagram/models/NodeModel';

export const registerHotkeys = (store): void => {
  useHotkeys('shift+d', () => {
    store.setPage('Workbench');
  });

  useHotkeys('shift+t', () => {
    store.setPage('Inspector');
  });

  useHotkeys('shift+j', () => {
    store.setPage('DiagramJson');
  });

  useHotkeys('shift+l', () => {
    store.setPage('Log');
  });

  useHotkeys(
    'enter',
    () => {
      const selection =
        store.diagram.engine.model.getSelectedEntities();

      // Must be an unambiguous selection of a single NodeModel entity
      if (
        selection.length === 1 &&
        selection[0] instanceof NodeModel
      ) {
        const node = selection[0];
        store.openNodeModal(node.id);
      }
    },
    {
      filter: () =>
        store.diagram.engine.model.options.locked === false,
    },
  );

  useHotkeys('left', () => {
		const direction = {x: -1, y: 0}
    store.navigateDiagram(direction)
  });

  useHotkeys('right', () => {
		const direction = {x: 1, y: 0}
    store.navigateDiagram(direction)
  });	
}