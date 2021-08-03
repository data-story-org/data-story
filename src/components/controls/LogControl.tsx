import React, {FC} from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from '../../store/';
import BaseControl, {
  BaseControlStyle,
} from './BaseControl';

/* export default observer(
 *   class LogControl extends BaseControl {
 *     constructor(props) {
 *       super(props);
 *       this.title = 'Log';
 *       this.icon = 'fas fa-file-alt';
 *       this.page = 'Log';
 *     }
 *
 *     onClick() {
 *       this.props.store.setPage(this.page);
 *     }
 *
 *     style() {
 *       let style = super.style();
 *       if (this.page == this.props.store.metadata.page) {
 *         style += ' text-malibu-600';
 *       }
 *
 *       return style;
 *     }
 *   },
 * ); */

interface Props {
  store: Store;
}

const LogControl: FC<Props> = ({store}) => {
  const [title, icon, page] = [
    'Log',
    'fas fa-file-alt',
    'Log',
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

export default observer(LogControl);
