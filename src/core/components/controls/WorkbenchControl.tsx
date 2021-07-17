import React, { FC } from 'react';
import { observer } from 'mobx-react';
import BaseControl, {
  BaseControlStyle,
} from './BaseControl';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const WorkbenchControl: FC<Props> = ({ store }) => {
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
};

export default observer(WorkbenchControl);
