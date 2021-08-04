import Inspector from './Inspector';
import DiagramJson from './DiagramJson';
import Log from './Log';
import Tokens from './Tokens';
import Workbench from './Workbench';

export const pages = {
  Inspector,
  DiagramJson,
  Log,
  Tokens,
  Workbench,
};

export default (pageName: string) => {
  const page = pages[pageName];

  return page;
};
