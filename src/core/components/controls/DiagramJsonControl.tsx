import React, { FC } from 'react';
import { observer } from 'mobx-react';
import BaseControl, {
  BaseControlStyle,
} from './BaseControl';
import { Store } from '../../store';

interface Props {
  store: Store;
}

const DiagramJsonControl: FC<Props> = ({ store }) => {
  const [title, id, icon, page] = [
    'Diagram JSON',
    'diagram-json',
    'fas fa-code',
    'DiagramJson',
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

export default observer(DiagramJsonControl);
