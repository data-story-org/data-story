import Inspector from './Inspector';
import Log from './Log';
import Tokens from './Tokens';
import Workbench from './Workbench';
import { withStore } from '../../store';

export const pages = {
  Inspector,
  Log,
  Tokens,
  Workbench,
};

export default (pageName: string) => {
  const page = pages[pageName];

  return withStore(page);
};
