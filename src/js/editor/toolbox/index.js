// import page from 'page';
import DOM from '../../dom';
import * as toolbox from './function';
import { normalize } from '../../tools';

const generateTodoHTML = (item, currentId) => `
  <a href="/appView/${item.id}" data-id="${
  item.id
}" class="list_item--link" id="todo-text ${
  item.id === currentId ? 'active' : ''
}">
  <div class="list_item "><h4 class="item_headline">${item.title}</h4>
  </div>
  </a>
      `;
const generateTodoList = (items, currentId) => {
  const html = items
    .filter(item =>
      normalize(item.title).includes(normalize(toolbox.getSearch()))
    )
    .map(item => generateTodoHTML(item, currentId))
    .join('');

  DOM().todoListBox.innerHTML = html;
};

const init = (items, currentId) => {
  generateTodoList(items, currentId);

  toolbox.initSearch(() => generateTodoList(items, currentId));

  toolbox.initAdd(newNote => {
    items = [...items, newNote];

    generateTodoList(items, currentId);
  });
};
export default init;
