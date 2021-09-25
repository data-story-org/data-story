import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../store/';
import BaseControl, {
  BaseControlStyle,
} from './BaseControl';

interface Props {
  store: Store;
}

const TokensControl: FC<Props> = ({ store }) => {
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
};

export default observer(TokensControl);
