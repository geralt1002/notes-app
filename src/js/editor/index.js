import getAllItems from './toolbox/index';
import getItemBody from './single_item/index';
import * as todoEvents from '../api-client';

const init = itemId => {
  todoEvents.getAll().then(items => {
    getAllItems(items, itemId);

    const itemToShow = !itemId
      ? items[0]
      : items.find(item => item.id === itemId);

    getItemBody(itemToShow);
  });
};

export default init;
