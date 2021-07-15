import React from 'react';
import { observer } from 'mobx-react';
import BaseControl, {
  BaseControlStyle,
} from './BaseControl';
import { useStore } from '../../store/StoreProvider';

const WorkbenchControl = observer(() => {
  const store = useStore();
  const [title, icon, page] = [
    'Story workbench',
    'fas fa-project-diagram',
    'Workbench',
  ];

  const style =
    page == store.metadata.page
      ? BaseControlStyle + ' text-malibu-600'
      : BaseControlStyle;

  const onClick = () => {
    store.setPage(page);
  };

  return (
    <BaseControl
      title={title}
      icon={icon}
      onClick={onClick}
      style={style}
    />
  );
});

export default WorkbenchControl;
