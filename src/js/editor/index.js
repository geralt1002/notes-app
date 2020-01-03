import toolbox from './toolbox/index';
import singleEvents from './single_item/index';
import * as todoEvents from './todo_events';

const init = (itemId) => {
  todoEvents.getAll().then((items) => {
    toolbox(items, itemId);

    const itemToShow = !itemId ? items[0] : items.find((item) => item.id === itemId);

    singleEvents(itemToShow);
  });
};

export default init;
