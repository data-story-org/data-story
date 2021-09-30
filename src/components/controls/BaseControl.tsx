import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

/* export default class BaseControl extends React.Component {
 *   id: number;
 *   title: string;
 *   icon: string;
 *   page: string;
 *
 *   render() {
 *     return (
 *       <span
 *         id={this.id ?? this.title}
 *         title={this.title}
 *         className={this.style()}
 *         onClick={this.onClick.bind(this)}
 *       >
 *         <i className={this.icon}></i>
 *       </span>
 *     );
 *   }
 *
 *   onClick() {
 *     alert('Not implemented');
 *   }
 *
 *   style() {
 *     return 'ml-4 text-gray-200 hover:text-malibu-500';
 *   }
 * } */

interface Props {
  id?: string;
  title: string;
  icon: string;
  page?: string;
  onClick?: () => void;
  style?: string;
}

export const BaseControlStyle =
  'ml-4 text-gray-200 hover:text-malibu-500';

const BaseOnClick = () => {
  alert('Not implemented');
};

export const BaseControl: FC<Props> = ({
  id = null,
  title,
  icon,
  page,
  onClick = BaseOnClick,
  style = BaseControlStyle,
}) => {
  return (
    <span
      id={id ?? title}
      title={title}
      className={style}
      onClick={onClick}
    >
      <i className={icon}></i>
    </span>
  );
};
