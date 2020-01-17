import app from '../views/app.html';

import * as view from './view';

import editorInit from '../editor/index';

export const appView = context => {
  const itemId = parseInt(context.params.id, 10);
  console.log(itemId);

  view.load(app).then(() => {
    editorInit(itemId);
  });
};

export const notFound = () => {};
