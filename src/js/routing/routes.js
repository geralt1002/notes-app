import app from '../views/app.html';
import { DOMInit } from '../dom';

import * as view from './view';

import editorInit from '../editor/index';

DOMInit();

export const appView = (context) => {
  const itemId = parseInt(context.params.id, 10);
  console.log(itemId);

  view.load(app).then(() => {
    DOMInit();
    editorInit(itemId);
  });
};

export const notFound = () => {};
