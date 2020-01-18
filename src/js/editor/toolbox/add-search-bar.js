import DOM from '../../dom';
import page from 'page';
import * as client from '../../api-client';
import * as failHandler from '../error';

// add section
export function initAdd() {
  DOM().formTasks.addEventListener('submit', e => {
    e.preventDefault();

    const addInput = DOM().formAddInput.value.trim();
    if (addInput && addInput.length < 12) {
      client
        .add(addInput)
        .then(item => item)
        .then(() => page('/appView/'))
        .catch(e => addInput(e));
    } else {
      failHandler.addItemFailHandler();
    }
  });
}

// search section

let search = '';

export function getSearch() {
  return search;
}

export function initSearch(cb) {
  DOM().searchInput.addEventListener('input', function() {
    search = this.value;
    cb();
  });
}
