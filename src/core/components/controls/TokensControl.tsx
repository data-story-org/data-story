import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../store/StoreProvider';
import BaseControl, {
  BaseControlStyle,
} from './BaseControl';

const TokensControl = () => {
  const store = useStore();
  const [title, icon, page] = [
    'Tokens',
    'fas fa-key',
    'Tokens',
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
      page={page}
      onClick={onClick}
      style={style}
    />
  );
}

export default observer(TokensControl);
