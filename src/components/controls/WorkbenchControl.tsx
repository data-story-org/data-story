import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  BaseControl,
  BaseControlStyle,
} from './BaseControl';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const WorkbenchControl: FC<Props> = ({ store }) => {
  const [title, id, icon, page] = [
    'Story workbench',
    'story-workbench',
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
      id={id}
      icon={icon}
      onClick={onClick}
      style={style}
    />
  );
};

export default observer(WorkbenchControl);
