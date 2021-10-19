import { Inspector } from './Inspector';
import { DiagramJson } from './DiagramJson';
import { Log } from './Log';
import { Splash } from './Splash';
import { Tokens } from './Tokens';
import { Workbench } from './Workbench';
import { Page } from '../../lib/types';

const pages = {
  Inspector,
  DiagramJson,
  Log,
  Splash,
  Tokens,
  Workbench,
};

export const pagesFactory = (pageName: Page) => {
  return pages[pageName];
};
